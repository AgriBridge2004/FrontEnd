import { Star } from "lucide-react";

import { cn } from "@/lib/cn";

type StarsProps = {
  rating: number;
  size?: "sm" | "md";
};

export function Stars({ rating, size = "sm" }: StarsProps) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          className={cn(size === "md" ? "size-5" : "size-4", star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-amber-300")}
          key={star}
        />
      ))}
    </div>
  );
}
