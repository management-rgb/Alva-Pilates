"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Users, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";
import { getAllClasses } from "../lib/data";

export default function ClassesPage() {
  const classes = getAllClasses();

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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Our Classes
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                From reformer Pilates to private sessions, we offer a range of
                classes designed to meet you where you are and help you reach
                your goals.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {classes.map((classItem, index) => (
              <Reveal key={classItem._id} delay={index * 0.1}>
                <Link
                  href={`/classes/${classItem._id}`}
                  className="block bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <Image
                      src={classItem.classImage}
                      alt={classItem.className}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-2xl font-semibold text-charcoal">
                        {classItem.className}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                          classItem.difficultyLevel
                        )}`}
                      >
                        {classItem.difficultyLevel}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Users size={16} />
                      <span className="font-paragraph text-sm">
                        {classItem.classType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-charcoal/70">
                      <Clock size={16} />
                      <span className="font-paragraph text-sm">
                        {classItem.durationMinutes} minutes
                      </span>
                    </div>

                    <p className="font-paragraph text-base text-charcoal/70 leading-relaxed line-clamp-3">
                      {classItem.description}
                    </p>

                    <div className="pt-4 flex items-center gap-2 text-primary font-paragraph text-sm font-medium">
                      Learn More
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                Why Choose Alva Pilates
              </h2>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-2xl mx-auto">
                Every class is designed to deliver results in a supportive,
                premium environment.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Reveal>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-charcoal">
                  Small Class Sizes
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  Limited capacity ensures personalized attention and proper
                  form corrections.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Clock size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-charcoal">
                  Flexible Scheduling
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  Multiple class times throughout the week to fit your busy
                  lifestyle.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="text-center space-y-4">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <ArrowRight size={28} className="text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-charcoal">
                  Progressive Programming
                </h3>
                <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                  Classes are designed to build on each other, helping you
                  advance safely.
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
                Ready to Get Started?
              </h2>
              <p className="font-paragraph text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                Book your first class today and experience the Alva Pilates
                difference.
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

