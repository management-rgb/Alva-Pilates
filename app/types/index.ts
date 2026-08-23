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
  /** Short, scannable focus of the class (e.g. "Full body · Strength") */
  bodyFocus?: string;
  /** Level line shown above the class description (e.g. "All Levels · Glutes & Core Focus") */
  levelText?: string;
  /** Duration line shown above the class description (e.g. "50 minutes · Reformer Class") */
  durationText?: string;
  /** Optional intensity line shown above the class description (e.g. "High") */
  intensityText?: string;
}

export interface InstructorScheduleEntry {
  day: string;
  classes: string;
}

export interface Instructor {
  name: string;
  slug: string;
  role: string;
  image: string;
  shortBio: string;
  /** Optional quiet editorial line under the short bio (listing cards) */
  signatureLine?: string;
  /** Class names shown on listing cards under "Teaches" */
  teaches?: string[];
  fullBio: string;
  teachingStyle: string;
  certifications: string[];
  specialties: string[];
  schedule: InstructorScheduleEntry[];
}

/** @deprecated Use Instructor */
export type Instructors = Instructor;

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
