import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Alva Pilates",
  description:
    "Terms and conditions for Alva Pilates accounts, bookings, memberships, and studio policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="surface-stone border-b border-[var(--border)] px-6 pb-12 pt-40 text-charcoal lg:px-10 lg:pb-16 lg:pt-48">
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-taupe">
            Policies
          </p>
          <h1 className="mt-6 font-heading text-4xl font-medium tracking-tight text-charcoal lg:text-5xl">
            Terms &amp; Conditions
          </h1>
        </div>
      </section>

      <main className="surface-paper border-b border-border px-6 pb-24 pt-12 lg:px-10 lg:pb-32">
        <div className="max-w-3xl mx-auto">
          <p className="font-paragraph text-base lg:text-lg text-muted leading-relaxed border-l-2 border-primary/40 pl-6 mb-14">
            By creating an account, booking a class, making a purchase, or using
            the Alva Pilates website or studio, clients agree to comply with
            these Terms &amp; Conditions, as well as all studio policies,
            including our Cancellation Policy, Purchase Policy, Return/Refund
            Policy, Privacy Policy, and Liability Waiver.
          </p>

          <div className="space-y-14 font-paragraph text-muted leading-relaxed">
            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                1. Account &amp; Booking Policies
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">1.1</span>{" "}
                  Clients must create an account with accurate contact and
                  billing information.
                </p>
                <p>
                  <span className="font-medium text-foreground">1.2</span> Login
                  credentials must be kept secure.
                </p>
                <p>
                  <span className="font-medium text-foreground">1.3</span>{" "}
                  Bookings are confirmed only once processed in the system.
                </p>
                <p>
                  <span className="font-medium text-foreground">1.4</span> Alva
                  Pilates may adjust schedules, substitute instructors, modify
                  classes, or cancel classes at any time.
                </p>
                <p>
                  <span className="font-medium text-foreground">1.5</span> Class
                  spots are limited and offered on a first-come, first-served
                  basis.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                2. Payment Authorization
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">2.1</span>{" "}
                  Clients authorize Alva Pilates to charge their card on file
                  for:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted">
                  <li>Classes, memberships, and packages</li>
                  <li>Late Cancel fees</li>
                  <li>No-Show fees</li>
                  <li>Retail purchases</li>
                  <li>Any outstanding balances</li>
                </ul>
                <p>
                  <span className="font-medium text-foreground">2.2</span>{" "}
                  Declined payments must be resolved promptly to retain booking
                  privileges.
                </p>
                <p>
                  <span className="font-medium text-foreground">2.3</span> A
                  valid payment method must remain on file at all times.
                </p>
                <p>
                  <span className="font-medium text-foreground">2.4</span> Alva
                  Pilates reserves the right to suspend booking privileges,
                  memberships, or access to services until all outstanding
                  balances have been paid in full.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                3. Membership Terms
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">3.1</span>{" "}
                  Memberships automatically renew on the selected billing cycle
                  until canceled in accordance with the Membership Cancellation
                  Policy.
                </p>
                <p>
                  <span className="font-medium text-foreground">3.2</span>{" "}
                  Clients must submit a written cancellation request at least 30
                  days before the next billing date.
                </p>
                <p>
                  <span className="font-medium text-foreground">3.3</span>{" "}
                  Cancellation requests submitted after payment has been
                  processed will apply to the next billing cycle. Refunds are
                  not provided for unused time.
                </p>
                <p>
                  <span className="font-medium text-foreground">3.4</span>{" "}
                  Memberships may not be shared or transferred.
                </p>
                <p>
                  <span className="font-medium text-foreground">3.5</span> Any
                  outstanding balances or fees must be resolved before
                  cancellation takes effect.
                </p>
                <p>
                  <span className="font-medium text-foreground">3.6</span>{" "}
                  Membership freezes or holds must be requested in writing and
                  may be approved at the studio&apos;s discretion.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                4. Class Attendance &amp; Conduct
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">4.1</span>{" "}
                  Clients must arrive on time. Arriving 10 or more minutes late
                  may result in a No-Show and forfeiture of the reservation.
                </p>
                <p>
                  <span className="font-medium text-foreground">4.2</span> Grip
                  socks may be required for safety and hygiene.
                </p>
                <p>
                  <span className="font-medium text-foreground">4.3</span>{" "}
                  Clients agree to follow instructor guidance and use equipment
                  safely.
                </p>
                <p>
                  <span className="font-medium text-foreground">4.4</span>{" "}
                  Disrespectful, unsafe, abusive, or disruptive behavior may
                  result in suspension or termination of booking privileges or
                  studio access.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                5. Health &amp; Safety
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">5.1</span>{" "}
                  Clients must inform instructors of any injuries, medical
                  considerations, or physical limitations before class.
                </p>
                <p>
                  <span className="font-medium text-foreground">5.2</span>{" "}
                  Clients agree not to attend class if experiencing symptoms of
                  a contagious illness or any condition that could pose a health
                  or safety risk to others.
                </p>
                <p>
                  <span className="font-medium text-foreground">5.3</span> Alva
                  Pilates may update health and safety protocols as needed.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                6. Lost or Stolen Property
              </h2>
              <p className="text-base">
                Clients understand and agree that Alva Pilates is not responsible
                for personal property that is lost, stolen, or damaged while on
                or around the studio premises. Personal belongings are brought
                onto the premises at the client&apos;s own risk.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                7. Service Refusal
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">7.1</span> Alva
                  Pilates reserves the right to deny, suspend, or terminate
                  access to classes, memberships, or studio services for
                  violations of studio policies or for unsafe, disruptive,
                  abusive, or inappropriate behavior.
                </p>
                <p>
                  <span className="font-medium text-foreground">7.2</span>{" "}
                  Service may also be suspended if a valid payment method is not
                  maintained or outstanding balances remain unpaid.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                8. Use of Studio &amp; Digital Platforms
              </h2>
              <p className="text-base">
                By using our studio, website, mobile app, or booking system,
                clients agree to these Terms &amp; Conditions and all related
                studio policies.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                9. Changes to Terms &amp; Conditions
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-medium text-foreground">9.1</span> Alva
                  Pilates reserves the right to update or revise these Terms
                  &amp; Conditions, pricing, memberships, policies, services, or
                  studio offerings at any time.
                </p>
                <p>
                  <span className="font-medium text-foreground">9.2</span>{" "}
                  Clients will be notified of any material changes using the
                  contact information provided.
                </p>
                <p>
                  <span className="font-medium text-foreground">9.3</span>{" "}
                  Continued use of the studio, website, mobile app, or booking
                  platform constitutes acceptance of the updated Terms &amp;
                  Conditions.
                </p>
              </div>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                10. Governing Law
              </h2>
              <p className="text-base">
                <span className="font-medium text-foreground">10.1</span> These
                Terms &amp; Conditions are governed by the laws of the State of
                California.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                11. Intellectual Property
              </h2>
              <p className="text-base">
                All content on the Alva Pilates website, including logos,
                branding, photographs, graphics, videos, written materials, and
                other content, is the property of Alva Pilates unless otherwise
                noted and may not be copied, reproduced, distributed, or used
                without prior written permission.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <h2 className="font-heading text-2xl font-medium tracking-tight text-foreground mb-4">
                12. Website Information
              </h2>
              <p className="text-base">
                Information provided on the Alva Pilates website, social media
                channels, and marketing materials is for general informational
                purposes only and is not intended as medical or healthcare
                advice.
              </p>
            </section>

            <section className="border-t border-border pt-10">
              <p className="text-base">
                By creating an account, booking a class, purchasing services, or
                using the Alva Pilates website or facilities, clients acknowledge
                that they have read, understood, and agree to be bound by these
                Terms &amp; Conditions and all referenced studio policies.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
