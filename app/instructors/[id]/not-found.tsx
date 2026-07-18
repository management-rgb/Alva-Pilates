import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="surface-paper pt-40 pb-16 px-8 text-center">
        <h1 className="font-heading text-4xl lg:text-6xl font-semibold tracking-tight text-foreground mb-4">
          Instructor Not Found
        </h1>
        <p className="font-paragraph text-lg text-muted mb-8">
          The instructor you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/instructors"
          className="font-paragraph text-base text-charcoal hover:underline mt-4 inline-block"
        >
          Back to Instructors
        </Link>
      </div>
      <Footer />
    </div>
  );
}
