/**
 * Entity types for Alva Pilates
 */

export interface Classes {
  _id: string;
  className: string;
  description: string;
  classType: string;
  durationMinutes: number;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  classImage: string;
  bookingUrl?: string;
}

export interface Instructors {
  _id: string;
  fullName: string;
  profilePicture: string;
  shortBio: string;
  fullBio: string;
  specialties: string;
  instagramUrl?: string;
}

export interface PricingMemberships {
  _id: string;
  tierName: string;
  price: number;
  billingCycle: string;
  keyBenefits: string;
  isFoundingOffer: boolean;
  foundingOfferDescription?: string;
  callToActionText: string;
  callToActionLink: string;
}

export interface FrequentlyAskedQuestions {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isFeatured?: boolean;
  displayOrder?: number;
}

