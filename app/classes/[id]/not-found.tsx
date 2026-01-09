import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-16 px-8 text-center">
        <h1 className="font-heading text-4xl lg:text-6xl font-bold text-charcoal mb-4">
          Class Not Found
        </h1>
        <p className="font-paragraph text-lg text-charcoal/70 mb-8">
          The class you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/classes"
          className="font-paragraph text-base text-primary hover:underline mt-4 inline-block"
        >
          Back to Classes
        </Link>
      </div>
      <Footer />
    </div>
  );
}

