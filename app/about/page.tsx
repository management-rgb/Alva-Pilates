"use client";

import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Reveal } from "../components/sections/Reveal";

export default function AboutPage() {
  const values = [
    {
      title: "Expert Instruction",
      description:
        "Our certified instructors bring years of experience and a deep understanding of movement, anatomy, and form.",
    },
    {
      title: "Intentional Movement",
      description:
        "Every exercise is purposeful, focusing on quality over quantity to deliver real, lasting results.",
    },
    {
      title: "Premium Experience",
      description:
        "From our state-of-the-art equipment to our serene studio environment, every detail is designed for your comfort.",
    },
    {
      title: "Personalized Attention",
      description:
        "Small class sizes ensure you receive the individual guidance and corrections you need to progress safely.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center space-y-6 mb-16">
              <h1 className="font-heading text-5xl lg:text-7xl font-bold text-charcoal">
                Our Story
              </h1>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
                Alva Pilates was born from a vision to create a space where
                movement meets mindfulness, and quality instruction meets serene
                design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px] mb-16 relative">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80"
                alt="Alva Pilates studio interior"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-secondary">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal direction="right">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal">
                  Our Philosophy
                </h2>
                <p className="font-paragraph text-lg text-charcoal/80 leading-relaxed">
                  At Alva Pilates, we believe that true transformation comes
                  from intentional practice. Every movement is an opportunity to
                  connect with your body, build strength, and cultivate
                  awareness.
                </p>
                <p className="font-paragraph text-lg text-charcoal/80 leading-relaxed">
                  We&apos;re not about quick fixes or trendy workouts. We&apos;re
                  about sustainable, long-term results achieved through expert
                  guidance, proper form, and a commitment to excellence.
                </p>
                <p className="font-paragraph text-lg text-charcoal/80 leading-relaxed">
                  Our studio is designed to be a sanctuary—a place where you can
                  escape the noise of daily life and focus entirely on your
                  practice. From the moment you step through our doors,
                  you&apos;ll experience the difference that attention to detail
                  makes.
                </p>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="rounded-2xl overflow-hidden h-[400px] lg:h-[500px] relative">
                <Image
                  src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80"
                  alt="Pilates equipment detail"
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal mb-4">
                What Sets Us Apart
              </h2>
              <p className="font-paragraph text-lg text-charcoal/70 max-w-2xl mx-auto">
                We&apos;re committed to providing an unparalleled Pilates
                experience.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.1}>
                <div className="bg-white p-8 rounded-2xl">
                  <h3 className="font-heading text-2xl font-semibold text-charcoal mb-4">
                    {value.title}
                  </h3>
                  <p className="font-paragraph text-base text-charcoal/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 lg:py-24 px-6 lg:px-8 bg-charcoal text-white">
        <div className="max-w-[100rem] mx-auto text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="font-heading text-4xl lg:text-5xl font-bold">
                Our Commitment to You
              </h2>
              <p className="font-paragraph text-lg text-white/80 leading-relaxed">
                We&apos;re dedicated to helping you achieve your goals, whether
                that&apos;s building strength, improving posture, recovering
                from injury, or simply finding a mindful movement practice that
                fits your lifestyle.
              </p>
              <p className="font-paragraph text-lg text-white/80 leading-relaxed">
                Every class at Alva Pilates is an investment in your well-being.
                We&apos;re here to support you every step of the way.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

