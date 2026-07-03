import { Navbar } from "@/components/landing/Navbar";
import { MarketplacePage as MarketplacePageContent } from "@/components/marketplace/MarketplacePage";

export default function MarketplacePage() {
  return (
    <>
      <Navbar authenticatedFarmerOnly />
      <MarketplacePageContent />
    </>
  );
}
