"use client";

import { useState } from "react";

import type { FarmerReview } from "@/components/farmer/reviews/reviews.mock";

type RespondToReviewModalProps = {
  review: FarmerReview | null;
  onClose: () => void;
  onSubmit: (reviewId: string, response: string) => void;
};

export function RespondToReviewModal({ review, onClose, onSubmit }: RespondToReviewModalProps) {
  const [response, setResponse] = useState("");

  if (!review) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-black text-slate-950">Respond to Review</h2>
        <p className="mt-1 text-sm font-medium text-slate-500">{review.buyerName}</p>
        <textarea
          className="mt-5 min-h-36 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-400"
          onChange={(event) => setResponse(event.target.value)}
          placeholder="Write your response..."
          value={response}
        />
        <div className="mt-5 flex justify-end gap-3">
          <button className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700" onClick={onClose} type="button">
            Cancel
          </button>
          <button
            className="h-10 rounded-lg bg-emerald-800 px-4 text-sm font-black text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!response.trim()}
            onClick={() => {
              onSubmit(review.id, response.trim());
              setResponse("");
            }}
            type="button"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
}
