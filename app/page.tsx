"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Clock, Instagram } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Reveal } from "./components/sections/Reveal";

export default function HomePage() {
  const benefits = [
    {
      title: "Build Strength",
      description:
        "Develop lean muscle and core stability through controlled, intentional movement.",
    },
    {
      title: "Improve Posture",
      description:
        "Align your body and strengthen the muscles that support proper posture.",
    },
    {
      title: "Enhance Flexibility",
      description:
        "Increase range of motion and mobility through dynamic stretching and lengthening.",
    },
    {
      title: "Reduce Stress",
      description:
        "Find calm and focus through mindful movement in a serene environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-charcoal font-paragraph overflow-clip selection:bg-primary/30">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554306294-0e54b58a6f51?w=1920&q=80"
            alt="Bright pilates studio with reformers and natural light"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-charcoal/50" />
        </div>

        <div className="container max-w-[120rem] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10 pt-12 lg:pt-0">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-white/40"></span>
                <span className="text-sm uppercase tracking-[0.2em] text-white/70 font-medium">
                  Valencia, CA
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] text-white tracking-tight">
                Elevate <br />
                <span className="italic font-normal text-primary">Your</span>{" "}
                <br />
                Movement
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-md border-l-2 border-primary/50 pl-6">
                Experience intentional movement, expert instruction, and a
                serene studio environment designed to transform your practice.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Link
                  href="/book"
                  className="group relative px-8 py-4 bg-white text-charcoal overflow-hidden rounded-full transition-all hover:shadow-lg hover:shadow-white/20 font-medium inline-flex items-center gap-2"
                >
                  Book a Class{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/pricing"
                  className="group px-8 py-4 border border-white/30 rounded-full hover:border-white transition-colors flex items-center gap-2 text-white"
                >
                  View Memberships
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro / Philosophy Section */}
      <section className="py-24 lg:py-32 px-6 relative">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <Reveal direction="right">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0">
                  <div className="absolute inset-0 border border-charcoal/10 translate-x-4 translate-y-4 rounded-2xl" />
                  <Image
                    src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&q=80"
                    alt="Pilates reformer"
                    fill
                    className="object-cover rounded-2xl relative z-10"
                  />
                </div>
              </Reveal>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <Reveal>
                <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-charcoal">
                  Welcome to <span className="text-primary italic">Alva</span>
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="space-y-6 text-base lg:text-lg text-charcoal/80 leading-relaxed">
                  <p>
                    Located in Valencia, Santa Clarita, Alva Pilates is a
                    boutique studio dedicated to providing a premium Pilates
                    experience. We focus on quality coaching, precise form, and
                    measurable results in a calm, elevated environment.
                  </p>
                  <p>
                    Whether you&apos;re new to Pilates or a seasoned
                    practitioner, our expert instructors will guide you through
                    intentional movement that strengthens, lengthens, and
                    restores.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="pt-4 flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="font-heading text-4xl text-charcoal">
                      15+
                    </span>
                    <span className="text-sm uppercase tracking-wider text-charcoal/60">
                      Weekly Classes
                    </span>
                  </div>
                  <div className="w-px h-12 bg-charcoal/20" />
                  <div className="flex flex-col">
                    <span className="font-heading text-4xl text-charcoal">
                      Expert
                    </span>
                    <span className="text-sm uppercase tracking-wider text-charcoal/60">
                      Instruction
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Breather */}
      <section className="relative h-[60vh] lg:h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1920&q=80"
            alt="Woman performing pilates"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <Reveal direction="up">
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl font-light tracking-wide mb-6">
              Intentional <br /> Movement
            </h2>
            <p className="text-lg lg:text-xl font-light tracking-widest uppercase opacity-90">
              Strength • Posture • Balance
            </p>
          </Reveal>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 lg:py-32 px-6 bg-secondary/30">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-20 gap-8">
            <Reveal>
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl text-charcoal max-w-xl">
                The Benefits of <br />
                <span className="italic text-primary">Mindful Practice</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-charcoal/70 max-w-md text-base lg:text-lg pb-2">
                Transform your body and mind through mindful, controlled
                movement designed for longevity.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Reveal key={`benefit-${benefit.title.toLowerCase().replace(/\s+/g, '-')}`} delay={index * 0.1} className="h-full">
                <div className="group bg-white p-8 rounded-2xl h-full border border-transparent hover:border-primary/20 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 flex flex-col">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Check size={20} />
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl text-charcoal mb-4 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal/70 leading-relaxed text-sm lg:text-base">
                    {benefit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Member Feature */}
      <section className="py-24 lg:py-32 px-6 bg-charcoal text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute right-0 top-0 w-[600px] h-[600px] border-[100px] border-white rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute left-0 bottom-0 w-[400px] h-[400px] border-[60px] border-white rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-[100rem] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-8 lg:space-y-10">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary mb-4">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    Limited Time Offer
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-heading text-4xl lg:text-5xl xl:text-7xl text-white leading-none">
                  Become a <br />
                  <span className="text-primary italic">Founding Member</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-lg lg:text-xl text-white/70 max-w-xl leading-relaxed">
                  Join us as a founding member and secure exclusive pricing for
                  life. Experience premium Pilates instruction at an exceptional
                  value before our grand opening rates expire.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
                  <Link
                    href="/pricing"
                    className="bg-primary text-white px-8 lg:px-10 py-4 lg:py-5 rounded-lg hover:bg-white hover:text-charcoal transition-all duration-300 font-medium text-base lg:text-lg inline-flex items-center justify-center gap-3"
                  >
                    Claim Founding Rate <ArrowRight size={18} />
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 relative">
              <Reveal direction="left" delay={0.2}>
                <div className="relative aspect-[3/4] rounded-t-full overflow-hidden border-4 border-white/5">
                  <Image
                    src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80"
                    alt="Peaceful studio"
                    fill
                    className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 bg-gradient-to-t from-charcoal to-transparent">
                    <p className="font-heading text-2xl lg:text-3xl text-white">
                      &quot;The best investment you can make is in
                      yourself.&quot;
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Info Grid */}
      <section className="py-20 lg:py-24 px-6 bg-background">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Map / Location */}
            <Reveal className="lg:col-span-1">
              <div className="bg-secondary/30 p-8 lg:p-10 rounded-3xl h-full flex flex-col justify-between min-h-[300px]">
                <div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 text-charcoal shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl text-charcoal mb-4">
                    Visit Us
                  </h3>
                  <p className="text-charcoal/70 text-base lg:text-lg">
                    23840 Copper Hill Drive
                    <br />
                    Valencia, CA 91354
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=23840+Copper+Hill+Drive,+Valencia,+CA+91354"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:text-charcoal transition-colors inline-flex items-center gap-2 mt-8"
                >
                  Get Directions <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            {/* Hours */}
            <Reveal className="lg:col-span-1" delay={0.1}>
              <div className="bg-charcoal p-8 lg:p-10 rounded-3xl h-full flex flex-col justify-between min-h-[300px] text-white">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-white shadow-sm">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-heading text-2xl lg:text-3xl mb-4">
                    Studio Hours
                  </h3>
                  <ul className="space-y-2 text-white/70 text-base lg:text-lg">
                    <li className="flex justify-between">
                      <span>Mon - Fri</span> <span>6am - 8pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span> <span>7am - 2pm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span> <span>8am - 1pm</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="/classes"
                  className="text-primary font-medium hover:text-white transition-colors inline-flex items-center gap-2 mt-8"
                >
                  View Schedule <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>

            {/* Social / Community */}
            <Reveal className="lg:col-span-1" delay={0.2}>
              <div className="relative group overflow-hidden rounded-3xl h-full min-h-[300px]">
                <Image
                  src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80"
                  alt="Community class"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/50 transition-colors" />
                <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-between text-white">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6">
                    <Instagram size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl lg:text-3xl mb-2">
                      Join the Community
                    </h3>
                    <p className="text-white/80">Follow us @AlvaPilates</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Reveal direction="up">
            <h2 className="font-heading text-5xl sm:text-6xl lg:text-8xl text-charcoal mb-8">
              Ready to Begin?
            </h2>
            <p className="text-lg lg:text-xl text-charcoal/60 mb-12 max-w-2xl mx-auto">
              Experience the Alva Pilates difference. Book your first class
              today and discover what intentional movement can do for you.
            </p>
            <Link
              href="/pricing"
              className="bg-primary text-white px-10 lg:px-12 py-4 lg:py-5 rounded-full text-base lg:text-lg hover:bg-charcoal transition-colors duration-300 shadow-xl shadow-primary/20 inline-block"
            >
              Book Your First Class
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
