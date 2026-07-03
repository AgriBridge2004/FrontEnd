"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FarmerDashboardLayout } from "@/components/dashboard/farmer/FarmerDashboardLayout";
import { PaymentInfoCards } from "@/components/dashboard/farmer/payments/PaymentInfoCards";
import { PaymentStats } from "@/components/dashboard/farmer/payments/PaymentStats";
import { PaymentTabsActions } from "@/components/dashboard/farmer/payments/PaymentTabsActions";
import { PaymentsHeader } from "@/components/dashboard/farmer/payments/PaymentsHeader";
import { PaymentsTable } from "@/components/dashboard/farmer/payments/PaymentsTable";
import {
  paymentTransactions,
  type PaymentStatusFilter,
  type PaymentTransaction,
} from "@/components/dashboard/farmer/payments/payments.mock";

const pageSize = 5;

export function FarmerPaymentsPage() {
  const [selectedStatus, setSelectedStatus] = useState<PaymentStatusFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<"date" | "amount">("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [notice, setNotice] = useState("");
  const noticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return paymentTransactions
      .filter((transaction) => {
        const matchesStatus = selectedStatus === "All" || transaction.status === selectedStatus;
        const matchesSearch =
          transaction.transactionId.toLowerCase().includes(normalizedSearch) ||
          transaction.contractId.toLowerCase().includes(normalizedSearch) ||
          transaction.buyer.toLowerCase().includes(normalizedSearch) ||
          transaction.type.toLowerCase().includes(normalizedSearch) ||
          transaction.status.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesSearch;
      })
      .sort((first, second) => {
        if (sortMode === "amount") {
          return Math.abs(second.amount) - Math.abs(first.amount);
        }

        return new Date(second.dateValue).getTime() - new Date(first.dateValue).getTime();
      });
  }, [searchQuery, selectedStatus, sortMode]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const paginatedTransactions = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    return () => {
      if (noticeTimeoutRef.current) {
        clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  function showTemporaryNotice(message: string) {
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }

    setNotice(message);
    noticeTimeoutRef.current = setTimeout(() => {
      setNotice("");
      noticeTimeoutRef.current = null;
    }, 3000);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleStatusChange(status: PaymentStatusFilter) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  function handleSortToggle() {
    setSortMode((mode) => (mode === "date" ? "amount" : "date"));
    setCurrentPage(1);
  }

  function handleExport() {
    const csvRows = [
      ["Transaction ID", "Contract", "Buyer", "Type", "Amount", "Status", "Date"],
      ...filteredTransactions.map((transaction) => [
        transaction.transactionId,
        transaction.contractId,
        transaction.buyer,
        transaction.type,
        formatCsvAmount(transaction),
        transaction.status,
        transaction.date,
      ]),
    ];
    const csv = csvRows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "agribridge-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);
    showTemporaryNotice("CSV export downloaded for the current filtered transactions.");
  }

  // TODO: Connect payment stats, filters, exports, and transaction history to backend payment APIs.
  return (
    <FarmerDashboardLayout
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by transaction ID, contract, or buyer name"
      searchValue={searchQuery}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-5 lg:px-7">
        <PaymentsHeader />
        <PaymentStats />
        <PaymentTabsActions
          notice={notice}
          onExport={handleExport}
          onFilterClick={() => showTemporaryNotice("Advanced filters are not connected yet.")}
          onSortToggle={handleSortToggle}
          onStatusChange={handleStatusChange}
          selectedStatus={selectedStatus}
          sortMode={sortMode}
        />
        <PaymentsTable
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          totalItems={filteredTransactions.length}
          totalPages={totalPages}
          transactions={paginatedTransactions}
        />
        <PaymentInfoCards />
        <p className="py-7 text-center text-xs font-semibold tracking-wide text-slate-500">
          © 2025 AgriBridge Financial Services. Secure Agricultural Trading.
        </p>
      </div>
    </FarmerDashboardLayout>
  );
}

function formatCsvAmount(transaction: PaymentTransaction) {
  const amount = Math.abs(transaction.amount).toFixed(2);
  if (transaction.amountDirection === "positive") {
    return `+ SAR ${amount}`;
  }
  if (transaction.amountDirection === "negative") {
    return `- SAR ${amount}`;
  }
  return `SAR ${amount}`;
}
