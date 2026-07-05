import type { QualityOfficerSettings } from "@/components/dashboard/quality-officer/settings/quality-officer-settings.types";

export const qualityOfficerSettings: QualityOfficerSettings = {
  profile: {
    fullName: "Hamza Khalil",
    id: "QO-78432-B",
    professionalTitle: "Agricultural Quality Inspector",
    bio: "Specialized in citrus and stone fruit inspections with 8+ years of experience in supply chain quality assurance. Certified Lead Auditor for GlobalGAP and HACCP standards. Dedicated to ensuring Palestinian agricultural exports meet international market requirements.",
    email: "hamza.khalil@agribridge-insp.ps",
    phone: "+970 59 123 4567",
    language: "en",
    payoutMethod: "Bank of Palestine •••• 9842",
    coverageAreas: ["Ramallah", "Nablus", "Jericho"],
  },
  twoFactorEnabled: true,
  automaticWithdrawal: true,
  activeSessions: [
    {
      id: "macbook",
      device: "MacBook Pro 14",
      location: "Ramallah, PS",
      app: "Chrome",
      current: true,
    },
    {
      id: "iphone",
      device: "iPhone 15 Pro",
      location: "Nablus, PS",
      app: "AgriBridge App",
    },
  ],
  connectedDevices: [
    {
      id: "ipad",
      name: "iPad Pro (Field Inspection Kit)",
      status: "Last synced: 2 hours ago",
      icon: "tablet",
    },
    {
      id: "thermal-probe",
      name: "Bluetooth Thermal Probe",
      status: "Disconnected",
      icon: "thermometer",
    },
  ],
};
