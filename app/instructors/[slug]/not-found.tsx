import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="surface-paper px-8 pb-16 pt-40 text-center">
        <h1 className="mb-4 font-heading text-4xl font-semibold tracking-tight text-foreground lg:text-6xl">
          Instructor Not Found
        </h1>
        <p className="mb-8 font-paragraph text-lg text-muted">
          The instructor you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/instructors"
          className="mt-4 inline-block font-paragraph text-base text-charcoal hover:underline"
        >
          Back to Instructors
        </Link>
      </div>
      <Footer />
    </div>
  );
}
