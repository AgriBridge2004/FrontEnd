import { StatusBadge } from "@/components/shared/StatusBadge";
import type { QualityGrade } from "@/types";

type QualityGradeBadgeProps = {
  grade?: QualityGrade;
};

export function QualityGradeBadge({ grade }: QualityGradeBadgeProps) {
  if (!grade) {
    return <StatusBadge label="Not graded" tone="slate" />;
  }

  const toneByGrade: Record<QualityGrade, "emerald" | "amber" | "rose" | "sky"> = {
    A: "emerald",
    B: "sky",
    C: "amber",
    Rejected: "rose",
  };

  return <StatusBadge label={`Grade ${grade}`} tone={toneByGrade[grade]} />;
}
