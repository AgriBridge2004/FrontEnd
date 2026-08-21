"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { adminSidebarItems } from "@/components/dashboard/admin/AdminSidebarConfig";
import { adminTopbarLinks } from "@/components/dashboard/admin/AdminTopbarConfig";
import { AdminListingDetailDrawer } from "@/components/dashboard/admin/listings/AdminListingDetailDrawer";
import { AdminListingsBulkActions } from "@/components/dashboard/admin/listings/AdminListingsBulkActions";
import { AdminListingsFilters } from "@/components/dashboard/admin/listings/AdminListingsFilters";
import { AdminListingsHeader } from "@/components/dashboard/admin/listings/AdminListingsHeader";
import { AdminListingsTable } from "@/components/dashboard/admin/listings/AdminListingsTable";
import { adminFlaggedListingsCount, adminListings } from "@/components/dashboard/admin/listings/admin-listings.mock";
import type {
  AdminListing,
  AdminListingCategoryFilter,
  AdminListingFarmerFilter,
  AdminListingStatusFilter,
} from "@/components/dashboard/admin/listings/admin-listings.types";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const defaultStartDate = "2024-06-01";
const defaultEndDate = "2024-06-30";
const pageNumbers = [1, 2, 3, 42];

export function AdminListingsManagementPage() {
  const [listings, setListings] = useState<AdminListing[]>(adminListings);
  const [statusFilter, setStatusFilter] = useState<AdminListingStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<AdminListingCategoryFilter>("all");
  const [farmerFilter, setFarmerFilter] = useState<AdminListingFarmerFilter>("all");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedListingIds, setSelectedListingIds] = useState<string[]>([]);
  const [selectedListing, setSelectedListing] = useState<AdminListing | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const filteredListings = useMemo(() => {
    // TODO: Connect listings table to Admin Listings API.
    // TODO: Connect pagination/filter query params.
    const hasInvalidDateRange = Boolean(startDate && endDate && startDate > endDate);
    if (hasInvalidDateRange) {
      return [];
    }

    return listings.filter((listing) => {
      const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || listing.category === categoryFilter;
      const matchesFarmer = farmerFilter === "all" || listing.farmer.name === farmerFilter;
      const matchesStartDate = !startDate || listing.publishedDateISO >= startDate;
      const matchesEndDate = !endDate || listing.publishedDateISO <= endDate;

      return matchesStatus && matchesCategory && matchesFarmer && matchesStartDate && matchesEndDate;
    });
  }, [categoryFilter, endDate, farmerFilter, listings, startDate, statusFilter]);

  const paginatedListings = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredListings.slice(startIndex, startIndex + rowsPerPage);
  }, [currentPage, filteredListings, rowsPerPage]);

  const visibleListingIds = paginatedListings.map((listing) => listing.id);
  const selectedVisibleCount = visibleListingIds.filter((listingId) => selectedListingIds.includes(listingId)).length;
  const allVisibleSelected = paginatedListings.length > 0 && selectedVisibleCount === paginatedListings.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;
  const selectedListingIndex = selectedListing ? filteredListings.findIndex((listing) => listing.id === selectedListing.id) : -1;

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToast(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToast("");
      toastTimeoutRef.current = null;
    }, 2400);
  }

  function toggleAllVisible() {
    if (allVisibleSelected) {
      setSelectedListingIds((currentIds) => currentIds.filter((listingId) => !visibleListingIds.includes(listingId)));
      return;
    }

    setSelectedListingIds((currentIds) => Array.from(new Set([...currentIds, ...visibleListingIds])));
  }

  function openDrawer(listing: AdminListing) {
    setSelectedListing(listing);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }

  function resetFilters() {
    setStatusFilter("all");
    setCategoryFilter("all");
    setFarmerFilter("all");
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
    setCurrentPage(1);
    setListings(adminListings);
    setSelectedListingIds([]);
    showToast("Filters reset.");
  }

  function applyFilters() {
    if (startDate && endDate && startDate > endDate) {
      showToast("Start date cannot be after end date.");
      return;
    }

    setCurrentPage(1);
    showToast("Filters applied.");
  }

  function handleStatusUpdate(listing: AdminListing, status: AdminListing["status"], toastMessage: string, historyTitle: string) {
    const historyItem = {
      date: "Today",
      title: historyTitle,
      value: "by Admin",
    };

    setListings((currentListings) =>
      currentListings.map((currentListing) =>
        currentListing.id === listing.id
          ? {
              ...currentListing,
              history: [historyItem, ...(currentListing.history ?? [])],
              status,
            }
          : currentListing,
      ),
    );
    setSelectedListing((currentListing) =>
      currentListing?.id === listing.id
        ? {
            ...currentListing,
            history: [historyItem, ...(currentListing.history ?? [])],
            status,
          }
        : currentListing,
    );
    showToast(toastMessage);
  }

  function handleBulkStatusUpdate(status: AdminListing["status"], toastMessage: string, historyTitle: string) {
    const selectedIds = new Set(selectedListingIds);
    const historyItem = {
      date: "Today",
      title: historyTitle,
      value: "by Admin",
    };

    setListings((currentListings) =>
      currentListings.map((listing) =>
        selectedIds.has(listing.id)
          ? {
              ...listing,
              history: [historyItem, ...(listing.history ?? [])],
              status,
            }
          : listing,
      ),
    );
    setSelectedListing((currentListing) =>
      currentListing && selectedIds.has(currentListing.id)
        ? {
            ...currentListing,
            history: [historyItem, ...(currentListing.history ?? [])],
            status,
          }
        : currentListing,
    );
    setSelectedListingIds([]);
    showToast(toastMessage);
  }

  function openAdjacentListing(direction: "previous" | "next") {
    if (selectedListingIndex < 0) {
      return;
    }

    const nextIndex = direction === "previous" ? selectedListingIndex - 1 : selectedListingIndex + 1;
    const nextListing = filteredListings[nextIndex];
    if (nextListing) {
      setSelectedListing(nextListing);
    }
  }

  return (
    <DashboardLayout
      hideSearch
      navLinks={adminTopbarLinks}
      notificationCount={6}
      profileHref="/admin/profile"
      role="admin"
      searchPlaceholder=""
      sidebarItems={adminSidebarItems}
      userName="Admin"
      userSubLabel=""
    >
      <div className="mx-auto w-full max-w-[1240px] overflow-x-hidden px-4 py-6 sm:px-5 lg:px-6">
        <AdminListingsHeader flaggedCount={adminFlaggedListingsCount} />
        <AdminListingsFilters
          category={categoryFilter}
          endDate={endDate}
          farmer={farmerFilter}
          onApplyFilters={applyFilters}
          onCategoryChange={(value) => {
            setCategoryFilter(value);
            setCurrentPage(1);
          }}
          onEndDateChange={(value) => {
            setEndDate(value);
            setCurrentPage(1);
          }}
          onFarmerChange={(value) => {
            setFarmerFilter(value);
            setCurrentPage(1);
          }}
          onReset={resetFilters}
          onStartDateChange={(value) => {
            setStartDate(value);
            setCurrentPage(1);
          }}
          onStatusChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
          startDate={startDate}
          status={statusFilter}
        />
        <AdminListingsBulkActions
          allSelected={allVisibleSelected}
          currentPage={currentPage}
          onApprove={() => {
            // TODO: Connect approve listing endpoint.
            handleBulkStatusUpdate("active", "Selected listings approved successfully.", "Listing approved");
          }}
          onMoreActions={() => showToast("More listing actions will be connected later.")}
          onPageChange={setCurrentPage}
          onRemove={() => {
            // TODO: Connect remove listing endpoint.
            handleBulkStatusUpdate("removed", "Selected listings removed locally.", "Listing removed");
          }}
          onToggleAll={toggleAllVisible}
          pageNumbers={pageNumbers}
          selectedCount={selectedListingIds.length}
          someSelected={someVisibleSelected}
          totalCount={filteredListings.length}
        />
        <AdminListingsTable
          currentPage={currentPage}
          listings={paginatedListings}
          onActionClick={(listing) => {
            // TODO: Connect flagged listing review workflow.
            openDrawer(listing);
          }}
          onFarmerProfileClick={() => {
            // TODO: Connect farmer profile preview.
            showToast("Farmer profile preview will be connected later.");
          }}
          onSelectedListingsChange={setSelectedListingIds}
          onRowsPerPageChange={(value) => {
            setRowsPerPage(value);
            setCurrentPage(1);
          }}
          rowsPerPage={rowsPerPage}
          selectedDetailListingId={isDrawerOpen ? selectedListing?.id : undefined}
          selectedListingIds={selectedListingIds}
          totalCount={filteredListings.length}
        />
      </div>

      <AdminListingDetailDrawer
        listing={selectedListing}
        canGoNext={selectedListingIndex >= 0 && selectedListingIndex < filteredListings.length - 1}
        canGoPrevious={selectedListingIndex > 0}
        onApprove={() => {
          // TODO: Connect approve listing endpoint.
          if (selectedListing) {
            handleStatusUpdate(selectedListing, "active", "Listing approved successfully.", "Listing approved");
          }
        }}
        onClose={closeDrawer}
        onFarmerProfile={() => {
          // TODO: Connect farmer profile preview.
          showToast("Farmer profile preview will be connected later.");
        }}
        onFlag={() => {
          // TODO: Connect flag listing endpoint.
          if (selectedListing) {
            handleStatusUpdate(selectedListing, "flagged", "Listing flagged for review.", "Listing flagged for review");
          }
        }}
        onMoreImages={() => {
          // TODO: Connect listing image gallery from API.
          showToast("More listing images will be connected later.");
        }}
        onNext={() => openAdjacentListing("next")}
        onPrevious={() => openAdjacentListing("previous")}
        onRemove={() => {
          // TODO: Connect remove listing endpoint.
          if (selectedListing) {
            handleStatusUpdate(selectedListing, "removed", "Listing removed locally.", "Listing removed");
          }
        }}
        open={isDrawerOpen}
      />

      {toast ? (
        <div className="fixed bottom-5 right-5 z-[80] rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
