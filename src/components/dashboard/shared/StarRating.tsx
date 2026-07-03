import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

type StarRatingProps = {
  max?: number;
  rating: number;
  showValue?: boolean;
  size?: "sm" | "md";
};

const sizeStyles = {
  sm: "size-4",
  md: "size-5",
};

export function StarRating({ max = 5, rating, showValue = false, size = "sm" }: StarRatingProps) {
  const normalizedRating = Math.max(0, Math.min(max, rating));

  return (
    <div className="inline-flex items-center gap-2" aria-label={`${normalizedRating} out of ${max} stars`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const star = index + 1;
          const fillPercent = Math.max(0, Math.min(1, normalizedRating - index)) * 100;

          return (
            <span className={cn("relative inline-grid", sizeStyles[size])} key={star}>
              <Star className={cn("absolute inset-0 text-slate-300", sizeStyles[size])} strokeWidth={2} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                <Star className={cn("fill-amber-400 text-amber-400", sizeStyles[size])} strokeWidth={2} />
              </span>
            </span>
          );
        })}
      </div>
      {showValue ? <span className="text-sm font-black text-slate-900">{normalizedRating.toFixed(1)}</span> : null}
    </div>
  );
}
