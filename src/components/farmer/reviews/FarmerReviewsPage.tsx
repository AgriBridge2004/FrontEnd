"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { FarmerDashboardLayout } from "@/components/farmer/FarmerDashboardLayout";
import { RatingAnalytics } from "@/components/farmer/reviews/RatingAnalytics";
import { RespondToReviewModal } from "@/components/farmer/reviews/RespondToReviewModal";
import { ReviewFilters } from "@/components/farmer/reviews/ReviewFilters";
import { ReviewStats } from "@/components/farmer/reviews/ReviewStats";
import { ReviewsHeader } from "@/components/farmer/reviews/ReviewsHeader";
import { ReviewsList } from "@/components/farmer/reviews/ReviewsList";
import { Toast } from "@/components/farmer/reviews/Toast";
import {
  farmerReviews,
  type FarmerReview,
  type ReviewFilter,
} from "@/components/farmer/reviews/reviews.mock";

const pageSize = 10;

export function FarmerReviewsPage() {
  const [reviews, setReviews] = useState<FarmerReview[]>(farmerReviews);
  const [selectedFilter, setSelectedFilter] = useState<ReviewFilter>("All Reviews");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [respondingReview, setRespondingReview] = useState<FarmerReview | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredReviews = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesSearch =
        review.buyerName.toLowerCase().includes(normalizedSearch) ||
        review.reviewText.toLowerCase().includes(normalizedSearch) ||
        review.contractId.toLowerCase().includes(normalizedSearch) ||
        review.product.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        selectedFilter === "All Reviews" ||
        (selectedFilter === "5 Star" && review.rating >= 5) ||
        (selectedFilter === "4 Star" && review.rating >= 4 && review.rating < 5) ||
        (selectedFilter === "Needs Response" && !review.response && review.status === "Needs Response") ||
        (selectedFilter === "Flagged" && (review.status === "Flagged" || review.status === "Under Investigation"));

      return matchesSearch && matchesFilter;
    });
  }, [reviews, searchQuery, selectedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const paginatedReviews = filteredReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string) {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage("");
      toastTimeoutRef.current = null;
    }, 3000);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setCurrentPage(1);
  }

  function handleFilterChange(filter: ReviewFilter) {
    setSelectedFilter(filter);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  }

  async function handleCopyProfile() {
    try {
      await navigator.clipboard.writeText("https://agribridge.com/farmers/ramesh-kumar");
      showToast("Profile link copied to clipboard.");
    } catch {
      showToast("Unable to copy profile link.");
    }
  }

  function handleSubmitResponse(reviewId: string, response: string) {
    setReviews((currentReviews) =>
      currentReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              response: { text: response, respondedAt: "Just now" },
              status: "Published",
            }
          : review,
      ),
    );
    setRespondingReview(null);
    showToast("Response submitted.");
  }

  // TODO: Connect review filters, responses, moderation status, and profile sharing to backend APIs.
  return (
    <FarmerDashboardLayout
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search reviews by buyer name or product"
      searchValue={searchQuery}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-5 lg:px-7">
        <ReviewsHeader onCopyProfile={handleCopyProfile} />
        <ReviewStats />
        <div className="mt-8 grid gap-8 xl:grid-cols-[304px_minmax(0,1fr)]">
          <RatingAnalytics />
          <div className="min-w-0">
            <ReviewFilters onFilterChange={handleFilterChange} selectedFilter={selectedFilter} />
            <div className="mt-6">
              <ReviewsList
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onRespond={setRespondingReview}
                reviews={paginatedReviews}
                totalItems={filteredReviews.length}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      </div>
      <RespondToReviewModal onClose={() => setRespondingReview(null)} onSubmit={handleSubmitResponse} review={respondingReview} />
      <Toast message={toastMessage} />
    </FarmerDashboardLayout>
  );
}
