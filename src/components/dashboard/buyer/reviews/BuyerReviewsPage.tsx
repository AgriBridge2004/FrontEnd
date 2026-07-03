"use client";

import { useMemo, useState } from "react";

import { buyerSidebarItems } from "@/components/dashboard/buyer/BuyerSidebarConfig";
import { buyerReviews, buyerReviewsStats } from "@/components/dashboard/buyer/reviews/buyer-reviews.mock";
import type {
  BuyerReview,
  BuyerReviewCategoryFilter,
  BuyerReviewRatingFilter,
} from "@/components/dashboard/buyer/reviews/buyer-reviews.types";
import { BuyerReviewsFilters } from "@/components/dashboard/buyer/reviews/BuyerReviewsFilters";
import { BuyerReviewsHeader } from "@/components/dashboard/buyer/reviews/BuyerReviewsHeader";
import { BuyerReviewsInfoCards } from "@/components/dashboard/buyer/reviews/BuyerReviewsInfoCards";
import { BuyerReviewsStats } from "@/components/dashboard/buyer/reviews/BuyerReviewsStats";
import { BuyerReviewsTable } from "@/components/dashboard/buyer/reviews/BuyerReviewsTable";
import { DashboardLayout } from "@/components/dashboard/shared/DashboardLayout";

const buyerTopbarLinks = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/buyer/rfqs", label: "RFQ" },
];

const pageSize = 10;

function matchesCategory(review: BuyerReview, categoryFilter: BuyerReviewCategoryFilter) {
  if (categoryFilter === "Category: All") {
    return true;
  }

  const categoryText = `${review.productCategory} ${review.productSubcategory ?? ""} ${review.supplierName}`.toLowerCase();

  if (categoryFilter === "Fertilizer") {
    return categoryText.includes("fertilizer") || categoryText.includes("npk");
  }

  if (categoryFilter === "Irrigation") {
    return categoryText.includes("irrigation");
  }

  return categoryText.includes(categoryFilter.toLowerCase());
}

function matchesRating(review: BuyerReview, ratingFilter: BuyerReviewRatingFilter) {
  if (ratingFilter === "All Ratings") {
    return true;
  }

  const targetRating = Number.parseInt(ratingFilter, 10);
  return Math.round(review.rating ?? 0) === targetRating;
}

export function BuyerReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<BuyerReviewRatingFilter>("All Ratings");
  const [categoryFilter, setCategoryFilter] = useState<BuyerReviewCategoryFilter>("Category: All");
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2400);
  }

  function resetPage() {
    setCurrentPage(1);
  }

  const filteredReviews = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const normalizedDate = dateFilter.trim().toLowerCase();

    return buyerReviews.filter((review) => {
      const searchableText = `${review.supplierName} ${review.supplierSubtitle} ${review.productCategory} ${review.productSubcategory ?? ""} ${
        review.reviewDate ?? "pending"
      } ${review.status}`.toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesDate = !normalizedDate || (review.reviewDate ?? "pending").toLowerCase().includes(normalizedDate);

      return matchesSearch && matchesDate && matchesRating(review, ratingFilter) && matchesCategory(review, categoryFilter);
    });
  }, [categoryFilter, dateFilter, ratingFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const startItem = filteredReviews.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, filteredReviews.length);

  function handlePageChange(nextPage: number) {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  // TODO: Connect buyer reviews, filters, pagination, and review actions to backend APIs.
  return (
    <DashboardLayout
      navLinks={buyerTopbarLinks}
      notificationCount={3}
      onSearchChange={(value) => {
        setSearchQuery(value);
        resetPage();
      }}
      profileHref="/buyer/profile"
      role="buyer"
      searchPlaceholder="Search reviews, suppliers..."
      searchValue={searchQuery}
      sidebarItems={buyerSidebarItems}
      userName="Ramesh Kumar"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-5 lg:px-7">
        <BuyerReviewsHeader onWriteReview={() => showToast("Write review flow will be connected later.")} />
        <BuyerReviewsStats stats={buyerReviewsStats} />

        <section className="mt-6 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md">
          <BuyerReviewsFilters
            categoryFilter={categoryFilter}
            currentPage={currentPage}
            dateFilter={dateFilter}
            endItem={endItem}
            onCategoryFilterChange={(value) => {
              setCategoryFilter(value);
              resetPage();
            }}
            onDateFilterChange={(value) => {
              setDateFilter(value);
              resetPage();
            }}
            onNextPage={() => handlePageChange(currentPage + 1)}
            onPreviousPage={() => handlePageChange(currentPage - 1)}
            onRatingFilterChange={(value) => {
              setRatingFilter(value);
              resetPage();
            }}
            ratingFilter={ratingFilter}
            startItem={startItem}
            totalItems={filteredReviews.length}
            totalPages={totalPages}
          />
          <BuyerReviewsTable
            onCompleteReview={() => showToast("Complete review flow will be connected later.")}
            onViewReview={() => showToast("Review details will be connected later.")}
            reviews={paginatedReviews}
          />
        </section>

        <BuyerReviewsInfoCards onDisputeLearnMore={() => showToast("Dispute resolution details will be connected later.")} />
      </div>

      {toast ? (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-black text-slate-800 shadow-xl">
          {toast}
        </div>
      ) : null}
    </DashboardLayout>
  );
}
