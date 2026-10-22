import type { Metadata } from "next";
import LocalAreaPage from "../components/LocalAreaPage";
import { getLocalArea } from "../lib/localAreas";

const area = getLocalArea("pilates-newhall");

export const metadata: Metadata = {
  title: area.title,
  description: area.description,
  alternates: { canonical: "/pilates-newhall" },
};

export default function Page() {
  return <LocalAreaPage area={area} />;
}
