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
    <div className="min-h-screen bg-background text-charcoal">
      <Header />

      <main className="pt-40 pb-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl lg:text-5xl font-bold text-charcoal mb-8">
            Terms &amp; Conditions
          </h1>

          <p className="font-paragraph text-base lg:text-lg text-charcoal/80 leading-relaxed border-l-2 border-primary/40 pl-6 mb-14">
            By creating an account, booking a class, or making a purchase with
            Alva Pilates, clients agree to comply with the following Terms &amp;
            Conditions, as well as all studio policies including our
            Cancellation Policy, Purchase Policy, Return/Refund Policy, Privacy
            Policy, and Liability Waiver.
          </p>

          <div className="space-y-14 font-paragraph text-charcoal/85 leading-relaxed">
            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                1. Account &amp; Booking Policies
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">1.1</span>{" "}
                  Clients must create an account with accurate contact and
                  billing information.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">1.2</span> Login
                  credentials must be kept secure.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">1.3</span>{" "}
                  Bookings are confirmed only once processed in the system.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">1.4</span> Alva
                  Pilates may adjust schedules, substitute instructors, or
                  modify classes at any time.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">1.5</span> Class
                  spots are limited and offered on a first-come, first-served
                  basis.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                2. Payment Authorization
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">2.1</span>{" "}
                  Clients authorize Alva Pilates to charge their card on file
                  for:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-charcoal/85">
                  <li>Classes, memberships, packages</li>
                  <li>Late Cancel fees</li>
                  <li>No-Show fees</li>
                  <li>Retail purchases</li>
                  <li>Any outstanding balances</li>
                </ul>
                <p>
                  <span className="font-semibold text-charcoal">2.2</span>{" "}
                  Declined payments must be resolved immediately to retain
                  booking privileges.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">2.3</span> A
                  valid payment method must remain on file at all times.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                3. Membership Terms
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">3.1</span>{" "}
                  Memberships auto-renew on the selected billing cycle.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">3.2</span>{" "}
                  Clients must submit a written cancellation request at least 30
                  days before the next billing date.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">3.3</span>{" "}
                  Cancellation requests submitted after payment has been processed
                  will apply to the next billing cycle; refunds are not provided
                  for unused time.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">3.4</span>{" "}
                  Memberships may not be shared or transferred.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">3.5</span> Any
                  outstanding balances or fees must be resolved prior to
                  cancellation taking effect.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">3.6</span>{" "}
                  Membership freezes or holds must be requested in writing and
                  may be approved at the studio&apos;s discretion.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                4. Class Attendance &amp; Conduct
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">4.1</span>{" "}
                  Clients must arrive on time; arriving 10+ minutes late may
                  result in a No-Show.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">4.2</span> Grip
                  socks may be required for safety and hygiene.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">4.3</span>{" "}
                  Clients agree to follow instructor guidance and use equipment
                  safely.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">4.4</span>{" "}
                  Disrespectful, unsafe, or disruptive behavior may result in loss
                  of service privileges.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                5. Health &amp; Safety
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">5.1</span>{" "}
                  Clients must inform instructors of injuries, medical
                  considerations, or limitations prior to class.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">5.2</span>{" "}
                  Clients agree not to attend class when unwell or posing a
                  health risk.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">5.3</span> Alva
                  Pilates may update safety protocols as needed.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                6. Lost or Stolen Property
              </h2>
              <p className="text-base">
                Clients understand and agree that Alva Pilates is not responsible
                for any personal property that is lost, stolen, or damaged while
                on or around the studio premises.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                7. Policy Modifications
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">7.1</span> Alva
                  Pilates may update policies, pricing, membership terms, or
                  offerings at any time.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">7.2</span>{" "}
                  Clients will be notified of any material changes through the
                  contact information provided.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">7.3</span>{" "}
                  Continued use of the studio, website, or booking platform
                  confirms acceptance of updated Terms &amp; Conditions.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                8. Service Refusal
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">8.1</span> Alva
                  Pilates may deny access or service to any client who violates
                  studio policies or engages in unsafe, disruptive, or
                  inappropriate behavior.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">8.2</span>{" "}
                  Service may also be suspended if a valid payment method is not
                  maintained.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                9. Use of Studio &amp; Digital Platforms
              </h2>
              <p className="text-base">
                By using our studio, website, or booking system, clients agree to
                all Terms &amp; Conditions and related policies.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                10. Changes to Terms &amp; Conditions
              </h2>
              <div className="space-y-3 text-base">
                <p>
                  <span className="font-semibold text-charcoal">10.1</span> Alva
                  Pilates reserves the right to update or revise these Terms
                  &amp; Conditions at any time.
                </p>
                <p>
                  <span className="font-semibold text-charcoal">10.2</span>{" "}
                  Clients will be notified of changes using the contact
                  information provided.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-heading text-2xl font-bold text-charcoal mb-4">
                11. Governing Law
              </h2>
              <p className="text-base">
                <span className="font-semibold text-charcoal">11.1</span> These
                Terms &amp; Conditions are governed by the laws of the State of
                California.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
