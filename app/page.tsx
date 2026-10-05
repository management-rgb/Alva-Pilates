import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import SummerResetStructuredData from "./components/SummerResetStructuredData";
import { summerResetEnabled, summerResetSeo } from "./lib/summerResetCopy";

const defaultMetadata: Metadata = {
  title: { absolute: "Alva Pilates | Reformer Pilates Studio in Valencia, CA" },
  description:
    "Boutique reformer Pilates in Valencia, Santa Clarita. Small-group classes, private training, and a 15-day unlimited intro for new clients.",
  alternates: { canonical: "/" },
};

export const metadata: Metadata = summerResetEnabled
  ? {
      title: { absolute: summerResetSeo.title },
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
