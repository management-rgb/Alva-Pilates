"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Reveal } from "../../components/sections/Reveal";
import { getClassById } from "../../lib/data";
import NotFound from "./not-found";

export default function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const classItem = getClassById(id);

  if (!classItem) {
    return <NotFound />;
  }

  const getDifficultyColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <section className="pt-32 pb-8 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Link
            href="/classes"
            className="font-paragraph text-sm text-charcoal/70 hover:text-charcoal inline-flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Classes
          </Link>
        </div>
      </section>

      {/* Class Hero */}
      <section className="pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <Reveal>
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-heading text-4xl lg:text-6xl font-bold text-charcoal">
                    {classItem.className}
                  </h1>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(
                      classItem.difficultyLevel
                    )}`}
                  >
                    {classItem.difficultyLevel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <Users size={20} />
                    <span className="font-paragraph text-base">
                      {classItem.classType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal/70">
                    <Clock size={20} />
                    <span className="font-paragraph text-base">
                      {classItem.durationMinutes} minutes
                    </span>
                  </div>
                </div>

                <p className="font-paragraph text-lg text-charcoal/80 leading-relaxed">
                  {classItem.description}
                </p>

                <Link
                  href="/book"
                  className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
                >
                  Book This Class
                  <ArrowRight size={18} />
                </Link>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px] relative">
                <Image
                  src={classItem.classImage}
                  alt={classItem.className}
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal text-center">
                What to Expect
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">
                    Before Class
                  </h3>
                  <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                    Arrive 10 minutes early to check in and get settled. Wear
                    comfortable, form-fitting clothing that allows you to move
                    freely. Grip socks are recommended.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">
                    During Class
                  </h3>
                  <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                    Your instructor will guide you through each exercise,
                    providing modifications and corrections as needed. Focus on
                    your breath, form, and the quality of each movement.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl">
                  <h3 className="font-heading text-xl font-semibold text-charcoal mb-3">
                    After Class
                  </h3>
                  <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                    Take a moment to stretch and hydrate. Feel free to ask your
                    instructor any questions about the exercises or your
                    practice.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="bg-charcoal text-white rounded-2xl p-8 lg:p-16 text-center">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
                Ready to Join Us?
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Explore our membership options and secure your spot in class.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/pricing"
                  className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center justify-center gap-2"
                >
                  View Memberships
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/classes"
                  className="font-paragraph text-base bg-transparent text-white border border-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all inline-flex items-center justify-center"
                >
                  View All Classes
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

