export type QualityOfficerLanguage = "en" | "ar";

export type QualityOfficerSettingsProfile = {
  fullName: string;
  id: string;
  professionalTitle: string;
  bio: string;
  email: string;
  phone: string;
  language: QualityOfficerLanguage;
  payoutMethod: string;
  coverageAreas: string[];
};

export type QualityOfficerSession = {
  id: string;
  device: string;
  location: string;
  app: string;
  current?: boolean;
};

export type QualityOfficerConnectedDevice = {
  id: string;
  name: string;
  status: string;
  icon: "tablet" | "thermometer";
};

export type QualityOfficerSettings = {
  profile: QualityOfficerSettingsProfile;
  twoFactorEnabled: boolean;
  automaticWithdrawal: boolean;
  activeSessions: QualityOfficerSession[];
  connectedDevices: QualityOfficerConnectedDevice[];
};
