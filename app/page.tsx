import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import SummerResetStructuredData from "./components/SummerResetStructuredData";
import { summerResetEnabled, summerResetSeo } from "./lib/summerResetCopy";

const defaultMetadata: Metadata = {
  title: "Alva Pilates | Movement & Wellness Studio",
  description:
    "Discover mindful movement at Alva Pilates in Valencia, Santa Clarita. Expert-led reformer classes, personalized sessions, and a welcoming community dedicated to your wellness journey.",
};

export const metadata: Metadata = summerResetEnabled
  ? {
      title: summerResetSeo.title,
      description: summerResetSeo.description,
    }
  : defaultMetadata;

export default function HomePage() {
  return (
    <>
      <SummerResetStructuredData />
      <HomePageClient />
    </>
  );
}
