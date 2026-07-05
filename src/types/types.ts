/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductSpecs {
  productTypeEn: string;
  productTypeAr: string;
  varietyEn: string;
  varietyAr: string;
  gradeEn: string;
  gradeAr: string;
  farmingMethodEn: string;
  farmingMethodAr: string;
  packagingEn: string;
  packagingAr: string;
  shelfLifeEn: string;
  shelfLifeAr: string;
  storageEn: string;
  storageAr: string;
  certificationsEn: string;
  certificationsAr: string;
}

export interface Review {
  id: string;
  userNameEn: string;
  userNameAr: string;
  rating: number;
  date: string;
  dateAr: string;
  commentEn: string;
  commentAr: string;
}

export interface Product {
  id: string;
  titleEn: string;
  titleAr: string;
  farmEn: string;
  farmAr: string;
  farmRating: number;
  farmReviewsCount: number;
  priceUsd: number;
  quantityAvailable: number;
  harvestDate: string;
  harvestDateAr: string;
  locationEn: string;
  locationAr: string;
  gradeEn: string;
  gradeAr: string;
  isSpotAvailable: boolean;
  descriptionEn: string;
  descriptionAr: string;
  images: string[];
  specs: ProductSpecs;
  verifiedFarmer: boolean;
  reviews: Review[];
}

export type Language = 'en' | 'ar';
