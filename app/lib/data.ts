import classesData from "@/app/data/classes.json";
import instructorsData from "@/app/data/instructors.json";
import pricingData from "@/app/data/pricing.json";
import faqData from "@/app/data/faq.json";
import type {
  Classes,
  Instructors,
  PricingMemberships,
  FrequentlyAskedQuestions,
} from "@/app/types";

/**
 * Data fetching utilities for static JSON data
 * These functions simulate the BaseCrudService pattern from Wix
 */

// Classes
export function getAllClasses(): Classes[] {
  return classesData as Classes[];
}

export function getClassById(id: string): Classes | null {
  const classes = getAllClasses();
  return classes.find((c) => c._id === id) || null;
}

// Instructors
export function getAllInstructors(): Instructors[] {
  return instructorsData as Instructors[];
}

export function getInstructorById(id: string): Instructors | null {
  const instructors = getAllInstructors();
  return instructors.find((i) => i._id === id) || null;
}

// Pricing
export function getAllPricing(): PricingMemberships[] {
  return pricingData as PricingMemberships[];
}

// FAQ
export function getAllFAQs(): FrequentlyAskedQuestions[] {
  const faqs = faqData as FrequentlyAskedQuestions[];
  // Sort by displayOrder, then by featured status
  return faqs.sort((a, b) => {
    if (a.displayOrder !== undefined && b.displayOrder !== undefined) {
      return a.displayOrder - b.displayOrder;
    }
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0;
  });
}

// Group FAQs by category
export function getFAQsByCategory(): Record<string, FrequentlyAskedQuestions[]> {
  const faqs = getAllFAQs();
  return faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FrequentlyAskedQuestions[]>);
}

