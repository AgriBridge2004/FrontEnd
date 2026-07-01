export async function downloadContractPdf(element: HTMLElement | null, fileName: string): Promise<void> {
  if (!element) {
    throw new Error("Missing contract PDF element");
  }

  if (element.offsetWidth === 0 || element.offsetHeight === 0) {
    throw new Error("Contract PDF element has no size");
  }

  if (!element.textContent?.toUpperCase().includes("AGRICULTURAL SALES AGREEMENT")) {
    throw new Error("Contract PDF element does not contain contract content");
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });

  const html2pdf = (await import("html2pdf.js")).default;
  const options = {
    margin: 10,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      backgroundColor: "#ffffff",
      logging: false,
      scale: 2,
      useCORS: true,
      windowWidth: 794,
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] },
  };

  await html2pdf()
    .set(options as never)
    .from(element)
    .save();
}
