import {
  adminStats,
  buyerProfiles,
  buyers,
  deals,
  disputes,
  farmerProfiles,
  farmers,
  inspections,
  listings,
  qualityOfficers,
  reviews,
  rfqs,
  users,
} from "@/lib/mock-data";

const wait = async () => {
  await new Promise((resolve) => setTimeout(resolve, 20));
};

export const api = {
  users: {
    async list() {
      await wait();
      return users;
    },
    async listFarmers() {
      await wait();
      return farmers;
    },
    async listBuyers() {
      await wait();
      return buyers;
    },
    async listQualityOfficers() {
      await wait();
      return qualityOfficers;
    },
  },
  profiles: {
    async listFarmerProfiles() {
      await wait();
      return farmerProfiles;
    },
    async listBuyerProfiles() {
      await wait();
      return buyerProfiles;
    },
  },
  listings: {
    async list() {
      await wait();
      return listings;
    },
    async getById(id: string) {
      await wait();
      return listings.find((listing) => listing.id === id) ?? null;
    },
    async listByFarmer(farmerId: string) {
      await wait();
      return listings.filter((listing) => listing.farmerId === farmerId);
    },
  },
  rfqs: {
    async list() {
      await wait();
      return rfqs;
    },
    async listByBuyer(buyerId: string) {
      await wait();
      return rfqs.filter((rfq) => rfq.buyerId === buyerId);
    },
  },
  deals: {
    async list() {
      await wait();
      return deals;
    },
    async listByFarmer(farmerId: string) {
      await wait();
      return deals.filter((deal) => deal.farmerId === farmerId);
    },
    async listByBuyer(buyerId: string) {
      await wait();
      return deals.filter((deal) => deal.buyerId === buyerId);
    },
  },
  inspections: {
    async list() {
      await wait();
      return inspections;
    },
    async getById(id: string) {
      await wait();
      return inspections.find((inspection) => inspection.id === id) ?? null;
    },
    async listByOfficer(officerId: string) {
      await wait();
      return inspections.filter((inspection) => inspection.officerId === officerId);
    },
  },
  disputes: {
    async list() {
      await wait();
      return disputes;
    },
  },
  reviews: {
    async list() {
      await wait();
      return reviews;
    },
  },
  admin: {
    async getDashboardStats() {
      await wait();
      return adminStats;
    },
  },
};
