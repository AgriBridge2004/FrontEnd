import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

type StarRatingProps = {
  rating: number;
  size?: "sm" | "md";
};

const sizeStyles = {
  sm: "size-4",
  md: "size-5",
};

export function StarRating({ rating, size = "sm" }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercent = Math.max(0, Math.min(1, rating - (star - 1))) * 100;

        return (
          <span className={cn("relative inline-grid transition-transform hover:scale-105", sizeStyles[size])} key={star}>
            <Star className={cn("absolute inset-0 text-slate-300", sizeStyles[size])} strokeWidth={2} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
              <Star className={cn("fill-yellow-400 text-yellow-400", sizeStyles[size])} strokeWidth={2} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
