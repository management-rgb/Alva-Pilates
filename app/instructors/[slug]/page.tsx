import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InstructorProfile from "../../components/instructors/InstructorProfile";
import {
  getAllInstructors,
  getInstructorBySlug,
} from "../../lib/data";

export function generateStaticParams() {
  return getAllInstructors().map((instructor) => ({
    slug: instructor.slug,
  }));
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);

  if (!instructor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <InstructorProfile instructor={instructor} />
      <Footer />
    </div>
  );
}
