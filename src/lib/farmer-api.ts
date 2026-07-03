import { getFarmerListings } from "@/lib/farmer-listings-api";
import type { FarmerDashboardStats } from "@/types/farmer";

export async function getFarmerStats(): Promise<FarmerDashboardStats> {
  const listings = await getFarmerListings();

  return {
    activeListings: listings.filter((listing) => listing.status === "active").length,
    // TODO: Replace with farmer RFQ endpoint when Swagger documents one.
    openRfqs: 0,
    // TODO: Replace with farmer deals endpoint when Swagger documents one.
    activeDeals: 0,
    // TODO: Replace with farmer revenue/dashboard endpoint when Swagger documents one.
    totalRevenue: 0,
  };
}

export async function getFarmerDashboard() {
  const stats = await getFarmerStats();

  return { stats };
}

// Swagger does not currently document farmer recent deals, upcoming tasks, recent RFQs,
// dashboard chart, or dashboard stats endpoints. Those dashboard sections stay mocked.

