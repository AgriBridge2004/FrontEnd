"use client";

import { forwardRef } from "react";

import { ContractDocument } from "@/components/dashboard/farmer/deals/contract/ContractDocument";
import type { DigitalContract } from "@/components/dashboard/farmer/deals/contract/contract.types";

type ContractPdfRenderHostProps = {
  contract: DigitalContract;
};

export const ContractPdfRenderHost = forwardRef<HTMLDivElement, ContractPdfRenderHostProps>(
  function ContractPdfRenderHost({ contract }, ref) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 w-[794px] bg-white"
        ref={ref}
        style={{ zIndex: -9999 }}
      >
        <ContractDocument contract={contract} />
      </div>
    );
  },
);
