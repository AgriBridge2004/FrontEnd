export function ContractPrintStyles() {
  return (
    <style jsx global>{`
      @media print {
        @page {
          size: A4;
          margin: 14mm;
        }

        body * {
          visibility: hidden;
        }

        #digital-contract-print-area,
        #digital-contract-print-area * {
          visibility: visible;
        }

        #digital-contract-print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          background: white !important;
          box-shadow: none !important;
          border: none !important;
        }

        .print-hidden {
          display: none !important;
        }
      }
    `}</style>
  );
}
