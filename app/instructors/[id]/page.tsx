"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Instagram, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Reveal } from "../../components/sections/Reveal";
import { getInstructorById } from "../../lib/data";
import NotFound from "./not-found";

export default function InstructorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const instructor = getInstructorById(id);

  if (!instructor) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Link
            href="/instructors"
            className="font-paragraph text-sm text-charcoal/70 hover:text-charcoal inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Instructors
          </Link>
        </div>
      </section>

      {/* Instructor Hero */}
      <section className="pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <Reveal direction="right">
              <div className="rounded-2xl overflow-hidden h-[500px] lg:h-[600px] lg:sticky lg:top-32 relative">
                <Image
                  src={instructor.profilePicture}
                  alt={instructor.fullName}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-4xl lg:text-6xl font-bold text-charcoal mb-2">
                    {instructor.fullName}
                  </h1>
                  <p className="font-paragraph text-lg text-primary font-medium">
                    {instructor.specialties}
                  </p>
                </div>

                {instructor.instagramUrl && (
                  <a
                    href={instructor.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    <Instagram size={20} />
                    <span className="font-paragraph text-sm">
                      Follow on Instagram
                    </span>
                  </a>
                )}

                <div className="bg-secondary p-6 rounded-2xl">
                  <p className="font-paragraph text-lg text-charcoal/80 leading-relaxed">
                    {instructor.shortBio}
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-heading text-3xl font-bold text-charcoal">
                    About {instructor.fullName.split(" ")[0]}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    {instructor.fullBio.split("\n\n").map((paragraph, idx) => (
                      <p
                        key={`bio-${id}-${idx}-${paragraph.slice(0, 20).replace(/\s/g, '-')}`}
                        className="font-paragraph text-base text-charcoal/80 leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="bg-charcoal text-white rounded-2xl p-8 lg:p-16 text-center">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
                Take a Class with {instructor.fullName.split(" ")[0]}
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Experience expert instruction and personalized attention. Book
                your class today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/book"
                  className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
                >
                  Book a Class
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/instructors"
                  className="font-paragraph text-base bg-transparent text-white border border-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all inline-flex items-center justify-center"
                >
                  View All Instructors
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

