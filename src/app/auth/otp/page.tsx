import { Suspense } from "react";

import { OtpPage } from "@/components/auth/OtpPage";

export default function OtpRoute() {
  return (
    <Suspense>
      <OtpPage />
    </Suspense>
  );
}
