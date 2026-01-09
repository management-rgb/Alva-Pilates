"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllInstructors } from "../lib/data";

export default function InstructorsPage() {
  const instructors = getAllInstructors();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Meet Our Instructors
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                Our team of certified Pilates instructors brings expertise,
                passion, and personalized attention to every class.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {instructors.map((instructor, index) => (
              <Reveal key={instructor._id} delay={index * 0.1}>
                <Link
                  href={`/instructors/${instructor._id}`}
                  className="block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-80 overflow-hidden relative">
                    <Image
                      src={instructor.profilePicture}
                      alt={instructor.fullName}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading text-2xl font-semibold text-charcoal mb-1">
                          {instructor.fullName}
                        </h3>
                        <p className="font-paragraph text-sm text-primary font-medium">
                          {instructor.specialties}
                        </p>
                      </div>
                      {instructor.instagramUrl && (
                        <span className="text-charcoal/70 hover:text-charcoal transition-colors">
                          <Instagram size={20} />
                        </span>
                      )}
                    </div>

                    <p className="font-paragraph text-base text-charcoal/70 leading-relaxed line-clamp-3">
                      {instructor.shortBio}
                    </p>

                    <div className="pt-4 flex items-center gap-2 text-primary font-paragraph text-sm font-medium">
                      Read Full Bio
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Instructors */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                Expert Guidance, Every Class
              </h2>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-2xl mx-auto">
                Our instructors are committed to helping you achieve your goals
                through personalized attention and expert coaching.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Reveal>
              <div className="bg-white p-8 rounded-2xl text-center">
                <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                  Certified Professionals
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  All instructors hold comprehensive Pilates certifications and
                  continue their education regularly.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl text-center">
                <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                  Personalized Approach
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  Each instructor tailors their teaching to meet individual
                  needs and fitness levels.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-white p-8 rounded-2xl text-center">
                <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                  Passionate Teachers
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  Our team is dedicated to sharing their love of Pilates and
                  helping you discover yours.
                </p>
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
                Experience Expert Instruction
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Book a class today and discover the difference that quality
                coaching makes.
              </p>
              <Link
                href="/book"
                className="font-paragraph text-base bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-all inline-flex items-center gap-2"
              >
                Book a Class
                <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

