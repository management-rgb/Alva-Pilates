/**
 * Single source of truth for the staff membership guide.
 * Update prices, perks, scripts, FAQs and policies HERE — the page, the
 * recommendation tool and the calculator all read from this file.
 *
 * PRIVACY: this module is imported only by the server page and handed to the
 * client tools as props, so it is never shipped in a public JS bundle.
 */
import type { Plan, PlanId } from "./types";

/* ------------------------------------------------------------------ */
/* Pricing & plans                                                     */
/* ------------------------------------------------------------------ */

export const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    classesPerMonth: 4,
    prices: { 3: 119 },
    comparisonOnly: true,
    positioning: "The Starter Rhythm",
    weeklyLabel: "About once a week",
    guestPassesPerMonth: 0,
    privatesDiscount: 0,
    packsRetailDiscount: 5,
    booking: "standard",
    waitlistPriority: false,
  },
  {
    id: "core",
    name: "Core",
    classesPerMonth: 8,
    prices: { 3: 219, 6: 209, 12: 199 },
    positioning: "The Consistency Membership",
    weeklyLabel: "About twice a week",
    guestPassesPerMonth: 1,
    privatesDiscount: 10,
    packsRetailDiscount: 10,
    booking: "priority",
    waitlistPriority: false,
  },
  {
    id: "elite",
    name: "Elite",
    classesPerMonth: 12,
    prices: { 6: 269, 12: 249 },
    positioning: "The Progression Membership",
    weeklyLabel: "About three times a week",
    guestPassesPerMonth: 1,
    privatesDiscount: 15,
    packsRetailDiscount: 15,
    booking: "early",
    waitlistPriority: true,
  },
  {
    id: "unlimited",
    name: "Unlimited",
    classesPerMonth: null,
    prices: { 6: 349, 12: 329 },
    positioning: "The Lifestyle Membership",
    weeklyLabel: "Four or more times a week",
    guestPassesPerMonth: 1,
    privatesDiscount: 20,
    packsRetailDiscount: 20,
    booking: "early",
    waitlistPriority: true,
  },
];

/** Non-member rates, for the "membership vs. class packs" talking point. */
export const classPacks = [
  { label: "Single class", price: 39, classes: 1 },
  { label: "5-class pack", price: 179, classes: 5 },
  { label: "10-class pack", price: 339, classes: 10 },
  { label: "20-class pack", price: 629, classes: 20 },
];

export const introOffers = {
  threeClass: { name: "3-Class Intro", price: 69, detail: "3 classes over 30 days" },
  unlimited15: { name: "15-Day Unlimited Intro", price: 99, detail: "1 class a day for 15 days" },
  creditWindowDays: 15,
  creditNote:
    "Join Core, Elite or Unlimited within 14 days after the intro expires and 100% of the intro purchase is credited toward the first membership payment (credit can't exceed the first payment, has no cash value and can't be combined with another membership promotion).",
};

export const tierContent: Record<
  Exclude<PlanId, "essential">,
  {
    pitch: string;
    frequencyChip: string;
    headline: string;
    idealFor: string[];
    benefits: string[];
    note?: string;
    script: { label: string; text: string };
    whyUpgrade: string[];
  }
> = {
  core: {
    frequencyChip: "2× / week",
    headline: "Consistency",
    pitch:
      "Core gives you two classes a week — the rhythm where technique starts to stick and Pilates becomes a habit.",
    idealFor: [
      "Beginners ready to develop a routine",
      "Clients upgrading from Essential",
      "Busy professionals",
      "Clients who want to attend twice weekly",
    ],
    benefits: [
      "Eight classes monthly — approximately two a week",
      "More consistent practice than once-weekly attendance",
      "More opportunities to improve technique and strength",
      "Ability to explore different Pilates class formats",
      "One complimentary guest pass per month",
      "Lower effective cost per class than Essential when fully utilized",
    ],
    script: {
      label: "Why Core is a great starting point",
      text:
        "Many clients find twice a week is where things really start to click. Once a week is a lovely start, but twice gives you another chance to practice while the last class is still fresh, so your technique has more room to build. Core gives you eight classes a month — about two a week — and it's actually a lower cost per class than Essential when you use them. Would two classes a week fit your schedule?",
    },
    whyUpgrade: [
      "Twice-weekly practice gives more chances to build technique than once a week",
      "Four more classes every month",
      "Lower cost per class than Essential when fully used",
      "One complimentary guest pass per month",
    ],
  },
  elite: {
    frequencyChip: "3× / week",
    headline: "Progression",
    pitch:
      "Elite is for when Pilates becomes part of your routine — three classes a week to build strength, endurance and technique.",
    idealFor: [
      "Clients attending approximately three times weekly",
      "Clients who enjoy Pilates as a regular fitness activity",
      "Core members who want additional sessions",
    ],
    benefits: [
      "Twelve classes monthly — approximately three a week",
      "More opportunities to improve strength, endurance and technique",
      "Greater flexibility to combine different class formats",
      "Lower effective cost per class than Core when fully utilized",
      "One complimentary guest pass per month",
    ],
    script: {
      label: "Upgrading from Core to Elite",
      text:
        "I love that you're coming so consistently — it really shows in your technique. I've noticed you're using all eight of your Core classes, and it sounds like you'd come more if you had the room. Elite gives you twelve classes a month, about three a week, and your cost per class drops. It also gives you room to mix a strength-focused class with a mobility class. Would you like me to show you the numbers side by side?",
    },
    whyUpgrade: [
      "Four more classes every month (about one more a week)",
      "Lower cost per class than Core when fully used",
      "More room to mix strength, mobility and recovery-minded classes",
      "Higher member discounts and earlier booking access (see perks table)",
    ],
  },
  unlimited: {
    frequencyChip: "4+ / week",
    headline: "Flexibility",
    pitch:
      "Unlimited gives you the freedom to come as often as your schedule and body allow — up to a class a day — and mix strength with gentler classes.",
    idealFor: [
      "Dedicated Pilates clients",
      "Clients attending four or more times weekly",
      "Clients who value scheduling flexibility",
      "Clients who enjoy mixing class formats",
    ],
    benefits: [
      "Up to one class per day",
      "Maximum flexibility within booking availability",
      "Ability to mix strength-focused and gentler classes",
      "No fixed monthly class-credit allowance",
      "One complimentary guest pass per month",
      "Lower effective cost per class with higher attendance",
    ],
    note:
      "Unlimited does not mean intense classes every day. The value is flexibility: choose a strength-focused class when you feel strong and a gentler, mobility- or recovery-minded class when your body needs it. Maximum one class per day.",
    script: {
      label: "For a client considering Unlimited",
      text:
        "Unlimited is really about flexibility. You're already coming about four times a week, so you'd stop counting classes and just book what fits your day. It doesn't mean pushing hard every day — you can mix stronger classes with gentler, mobility-focused ones. And if you're attending more than about sixteen classes a month, your cost per class is actually lower than Elite. Want me to show you the comparison?",
    },
    whyUpgrade: [
      "No fixed monthly class allowance (up to 1 class per day)",
      "Lower cost per class than Elite once attendance is high enough",
      "Freedom to mix strength-focused and gentler classes",
      "Highest member discounts and early booking access (see perks table)",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Quick sales reference (top of page)                                 */
/* ------------------------------------------------------------------ */

export const quickPitches: Record<"core" | "elite" | "unlimited", string> = {
  core: "Two classes a week is where technique sticks and a habit forms — Core makes that easy.",
  elite: "Three a week lets you build strength and progress your technique — Elite gives you the room.",
  unlimited: "Come as often as your life and body allow, and mix strong and gentle classes — Unlimited is freedom.",
};

/* ------------------------------------------------------------------ */
/* Why frequency matters                                               */
/* ------------------------------------------------------------------ */

export const benefitsOfConsistency = [
  { title: "Core strength & stability", body: "Reformer work asks the deep core to stabilize through every movement. Regular practice gives that work repeated, progressive exposure." },
  { title: "Muscle strength & endurance", body: "Spring resistance challenges muscles through a full range of motion. Consistent sessions let the work build gradually." },
  { title: "Posture & body awareness", body: "Cues about alignment, breath and control help clients notice how they sit, stand and move — more practice makes those cues more familiar." },
  { title: "Flexibility & mobility", body: "Controlled, supported stretching and joint-friendly movement can improve how freely the body moves, especially with regular practice." },
  { title: "Balance & coordination", body: "Moving the carriage while stabilizing trains coordination. Skills like this are practiced best when sessions are close enough together to carry over." },
  { title: "Movement confidence & technique", body: "The first classes teach the fundamentals; repeated classes let clients stop thinking about the setup and start refining the movement." },
  { title: "Stress management & well-being", body: "A scheduled, focused hour away from screens helps many clients feel calmer and more grounded. Routine makes that dependable." },
  { title: "Long-term fitness habits", body: "A fixed rhythm is easier to keep than an occasional visit. Habit is often the biggest factor in whether someone is still practicing six months from now." },
];

export const frequencyLevels = [
  {
    id: "once",
    label: "Once per week",
    sessions: 4,
    sessionsLabel: "≈ 4 / month",
    gap: "~7 days between sessions",
    summary: "A good starting point for building a habit and learning Pilates fundamentals.",
    plan: "Build toward Core",
  },
  {
    id: "twice",
    label: "Twice per week",
    sessions: 8,
    sessionsLabel: "≈ 8 / month",
    gap: "~3–4 days between sessions",
    summary: "More opportunities to reinforce technique, develop consistency, and progressively build strength.",
    plan: "Core",
  },
  {
    id: "three",
    label: "Three times per week",
    sessions: 12,
    sessionsLabel: "≈ 12 / month",
    gap: "~2–3 days between sessions",
    summary: "More regular training exposure and opportunities to work on different fitness goals.",
    plan: "Elite",
  },
  {
    id: "four",
    label: "Four or more times per week",
    sessions: 16,
    sessionsLabel: "16+ / month",
    gap: "Most days of the week",
    summary:
      "Greater flexibility to combine strength-focused, mobility and recovery-oriented classes, provided intensity and recovery are managed appropriately.",
    plan: "Unlimited",
  },
];

export const frequencyDisclaimer =
  "Say this, not that: describe what more practice makes possible, never what it guarantees. Avoid promising weight loss, a specific look, or a timeline. Individual results vary, and anyone with an injury or medical concern should check with their healthcare provider.";

/* ------------------------------------------------------------------ */
/* Recommendation tool                                                 */
/* ------------------------------------------------------------------ */

export type FrequencyChoice = "once" | "twice" | "three" | "four";

export const recommendations: Record<
  FrequencyChoice,
  { label: string; planId: PlanId; alsoPlanId?: PlanId; reason: string; script: string }
> = {
  once: {
    label: "Once weekly",
    planId: "core",
    alsoPlanId: "essential",
    reason:
      "Once a week is a great way to learn the fundamentals, but it gives the fewest chances to reinforce technique. Lead with Core and the benefit of a second class; keep Essential only as a fallback if twice a week truly isn't realistic yet.",
    script:
      "Once a week is a wonderful start. Many clients find that when they add a second class, things start to click because the last session is still fresh. Core gives you eight classes a month — about twice a week — and brings your cost per class down. Could you picture two days that would work in your schedule?",
  },
  twice: {
    label: "Twice weekly",
    planId: "core",
    alsoPlanId: "elite",
    reason:
      "Two classes a week is the sweet spot for building a routine and reinforcing technique — exactly what Core is designed for.",
    script:
      "Twice a week is a really strong rhythm — it's where many clients start feeling more confident and consistent. Core gives you eight classes a month, which lines up perfectly. Let me show you the monthly options, and we can get you set up right here and book your next few classes before you go.",
  },
  three: {
    label: "Three times weekly",
    planId: "elite",
    alsoPlanId: "unlimited",
    reason:
      "Three classes a week matches Elite's twelve monthly classes — more regular exposure and room to mix class formats.",
    script:
      "Three times a week is fantastic — that's a real commitment to your practice. Elite gives you twelve classes a month, so you're covered every week, and your cost per class is lower than Core. It also gives you room to mix strength classes with mobility-focused ones. Want me to walk you through the monthly rates?",
  },
  four: {
    label: "Four or more weekly",
    planId: "unlimited",
    alsoPlanId: "elite",
    reason:
      "At four or more classes a week, Unlimited removes the monthly cap (up to one class a day) and usually gives the lowest cost per class.",
    script:
      "If you're coming four or more times a week, Unlimited makes the most sense — you can book up to a class a day without counting. It doesn't mean going hard every day; you can mix stronger classes with gentler ones. At that attendance, your cost per class is the lowest we offer. Shall I show you the options?",
  },
};

export type ConsiderationGroup = {
  id: "goals" | "budget" | "schedule" | "recovery";
  label: string;
  options: { id: string; label: string; note: string }[];
};

export const considerations: ConsiderationGroup[] = [
  {
    id: "goals",
    label: "Goals",
    options: [
      { id: "strength", label: "Build strength", note: "Strength and endurance build with repeated exposure — two to three well-planned classes a week gives that work room to progress." },
      { id: "mobility", label: "Flexibility & mobility", note: "Mix formats: pair a strength-focused class with a mobility- or stretch-focused one." },
      { id: "routine", label: "Build a routine", note: "A fixed weekly rhythm matters most. Help them pick specific days and book the next few classes now." },
      { id: "stress", label: "Stress relief", note: "Regularity is the key — any plan works if it's a dependable appointment on their calendar." },
    ],
  },
  {
    id: "budget",
    label: "Budget",
    options: [
      { id: "tight", label: "Watching the monthly budget", note: "Don't upsell past their realistic frequency. Show the longer-commitment rate (it lowers the monthly payment) and that every plan is billed monthly, not upfront." },
      { id: "flexible", label: "Comfortable with budget", note: "Lead with the plan that matches their ideal frequency; mention the next tier up only if their attendance warrants it." },
    ],
  },
  {
    id: "schedule",
    label: "Schedule",
    options: [
      { id: "fixed", label: "Predictable weekly schedule", note: "A capped plan fits well — help them pick standing days and times." },
      { id: "varies", label: "Schedule varies week to week", note: "Elite or Unlimited give more room for busy weeks. Verify current credit-use rules before describing what happens to unused classes." },
    ],
  },
  {
    id: "recovery",
    label: "Recovery needs",
    options: [
      { id: "gentle", label: "Needs gentler days", note: "Highlight that they can mix strength-focused and gentler classes. More classes does not mean more intensity." },
      { id: "injury", label: "Injury or medical concern", note: "Don't give medical advice. Suggest they check with their healthcare provider and tell their instructor before class." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Sales playbook                                                      */
/* ------------------------------------------------------------------ */

export const playbookSteps = [
  { title: "Start a conversation", say: "How was your class today? How are you liking Pilates so far?", tip: "Be curious and genuinely listen. Do this before mentioning memberships." },
  { title: "Understand the client's goals", say: "Are you mainly looking to build strength, improve flexibility, or establish a consistent fitness routine?", tip: "Repeat their goal back to them in their own words — you'll use it in step 4." },
  { title: "Understand attendance frequency", say: "How many times a week would you realistically like to come?", tip: "Ask for realistic, not aspirational. A plan they fully use is the best plan." },
  { title: "Recommend the right membership", say: "Based on what you've told me, I'd recommend ___ because ___.", tip: "Recommend one plan. Explain the benefits before the price." },
  { title: "Explain pricing and commitment", say: "It's $___ a month, billed monthly, with a ___-month minimum commitment. The longer commitment lowers your monthly rate.", tip: "Make clear it's billed monthly — not one upfront payment. Offer the available terms, then let them choose." },
  { title: "Close the sale in person", say: "We can take care of your membership right here and help you reserve your next few classes.", tip: "Complete it at the desk while the experience is fresh, and book their next classes before they leave." },
];

export type SalesScript = { id: string; title: string; when: string; text: string };

export const scripts: SalesScript[] = [
  {
    id: "new-after-first",
    title: "New client after their first class",
    when: "Right after their first class, at the desk.",
    text: "How was your class today? I'm so glad you came in. A lot of people tell me the first class is the hardest, and the second is when it starts to click. What would you most like to get out of Pilates — strength, flexibility, or a steady routine? ... That's helpful. How many days a week do you think you could realistically come? ... Then I'd recommend our ___ membership. It gives you ___ classes a month, which is perfect for that. We can set it up right here and book your next few classes before you leave.",
  },
  {
    id: "intro",
    title: "Client currently on an intro offer",
    when: "Mid-way through or toward the end of their intro.",
    text: "How are you finding your intro so far? You're making great progress. Since you're enjoying it, I want to make sure you don't lose momentum when your intro ends. If you join Core, Elite or Unlimited within 14 days after your intro expires, we'll credit what you paid for your intro toward your first membership payment. Which of those fits how often you've been coming?",
  },
  {
    id: "essential-core",
    title: "Upgrading from Essential",
    when: "Essential member who is booking all four classes early or wants more.",
    text: "I've noticed you're using all four of your classes — that's great consistency. Core gives you eight classes a month, which is about twice a week. It's four additional classes for $100 more a month on the 3-month rate, and your cost per class drops from $29.75 to about $27.38 when you use them. Many clients find twice a week is where things start to click. Would you like me to show you the options?",
  },
  {
    id: "core-elite",
    title: "Core member considering Elite",
    when: "Core member who uses every class or says they'd come more.",
    text: "You've been using every one of your Core classes, which tells me you love it. Elite adds four classes a month for $60 more on the 6-month rate — that's $15 per additional class — and it brings your overall cost per class down. It also gives you room to mix a strength class with a mobility class. Want me to put the two side by side?",
  },
  {
    id: "elite-unlimited",
    title: "Elite member considering Unlimited",
    when: "Elite member who attends 14+ classes a month or wants flexibility.",
    text: "You're really making Pilates a lifestyle. Unlimited is $80 more a month than Elite on the 6-month rate and removes the monthly class cap — up to a class a day. If you're attending around sixteen classes or more a month, your cost per class is lower than Elite. And you can mix stronger classes with gentler ones as your body needs. Does that feel like how you'd use it?",
  },
  {
    id: "hesitant",
    title: "Interested but hesitant",
    when: "They like it but something is holding them back.",
    text: "It sounds like you really enjoy it, and I want to make sure the plan feels right. What's the biggest thing on your mind — the schedule, the price, or whether you'll use it? ... That makes sense. Let's find the option that fits. If we start with the plan that matches the number of classes you're confident you'll attend, you'll get the routine without feeling stretched.",
  },
  {
    id: "pricing",
    title: "Client asking about pricing",
    when: "They ask 'How much is it?' before you've talked about their goals.",
    text: "Happy to go through it. Memberships are billed monthly — not one upfront payment — and the monthly rate depends on how many classes you'd like and the commitment length. To point you to the right one: how many times a week would you like to come? ... Then Core/Elite/Unlimited would be ideal. That's $___ a month on a ___-month commitment, and the longer commitment brings the monthly rate down.",
  },
  {
    id: "think",
    title: "Client who says they need to think about it",
    when: "They aren't saying no, but want time.",
    text: "Of course — it's a real decision. Can I ask what you'd like to think through? If it's the schedule, I can help you map out the days. If it's the price, I can show you the monthly options and how each term compares. And if you'd like, I can book your next class now so you keep your momentum while you decide.",
  },
];

/* ------------------------------------------------------------------ */
/* Objections / FAQ                                                    */
/* ------------------------------------------------------------------ */

export type FaqItem = {
  q: string;
  a: string;
  /** Show a "Verify with studio policy" badge — policy not confirmed in this guide. */
  verify?: string;
};

export const faqs: FaqItem[] = [
  {
    q: "Is once a week enough?",
    a: "It's a great start. Once a week builds the habit and teaches the fundamentals. Many clients find things start to click at twice a week because there are more chances to reinforce technique before it fades. If you can only come once a week right now, that's absolutely fine — we can build up from there. Core's eight classes a month fit the twice-weekly rhythm.",
  },
  {
    q: "Why should I come twice a week?",
    a: "Two sessions give you more chances to practice the same movements while they're fresh. That helps technique settle, makes the habit stick, and lets strength build progressively. Core is designed for exactly this rhythm.",
  },
  {
    q: "What's the difference between Core and Elite?",
    a: "Core is eight classes a month (about two a week) and Elite is twelve (about three a week). Elite gives you more regular exposure, more room to mix class formats, and a lower cost per class. Core is the consistency plan; Elite is the progression plan.",
  },
  {
    q: "Is Unlimited worth the extra money?",
    a: "It depends on how often you come. On the 6-month rate, Unlimited is $80 more per month than Elite, and it pays off in cost-per-class terms at roughly sixteen classes a month or more. If you come fewer than that, Elite is likely the better value. Be honest — recommend the plan they'll genuinely use.",
  },
  {
    q: "What if I don't use all my classes?",
    a: "I'd rather you pick a plan that you will use. If you're not sure you'll reach eight classes a month, let's choose the number you can realistically attend. Choose the number you can realistically attend most months.",
    verify: "Confirm whether unused classes roll over or expire before describing what happens to them. Don't promise rollover.",
  },
  {
    q: "What if I get sore?",
    a: "A little muscle soreness is common when starting a new kind of movement, and it usually eases as your body adapts. You can choose gentler or mobility-focused classes on days you feel tender, and tell your instructor before class so they can adjust. If you have pain or a medical concern, check with your healthcare provider.",
  },
  {
    q: "What if I travel?",
    a: "Memberships can be paused for up to 30 days per commitment period with at least 14 days' written notice. Payments continue during a pause, and the paused time is added to the end of your commitment.",
    verify: "Confirm current hold process and how it applies to short trips before promising anything specific.",
  },
  {
    q: "Why is there a membership commitment?",
    a: "The commitment is what lets us offer a lower monthly price, and it also supports your results — consistency is what makes Pilates work. It's billed monthly, not upfront, and a longer commitment gives you a lower monthly rate.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes, many clients start with Core and move up when they're ready for more classes.",
    verify: "Verify current studio policy on upgrade timing and billing changes before promising an effective date or price.",
  },
  {
    q: "Can I bring a friend?",
    a: "Core, Elite and Unlimited members each get one complimentary guest pass per month — a great way to share Pilates with someone.",
    verify: "Confirm guest-pass rules (who qualifies, booking, availability) before explaining details.",
  },
  {
    q: "Why should I choose a membership instead of class packs?",
    a: "Memberships give the lowest cost per class and make the routine easier to keep. Packs are flexible for variable schedules but cost more per class — for example, a 10-class pack is $33.90 a class, versus about $26.13 on Core's 6-month rate. Members also get discounts on additional packs, privates and retail.",
  },
];

/* ------------------------------------------------------------------ */
/* Policies                                                            */
/* ------------------------------------------------------------------ */

export type PolicyItem = { title: string; detail: string; verify?: boolean };

export const policies: PolicyItem[] = [
  { title: "Cancellation window", detail: "Cancel at least 12 hours before class for no charge." },
  { title: "Late cancellation", detail: "$15 fee when cancelling within 12 hours of class start." },
  { title: "No-show", detail: "$25 fee on a membership (class-pack credits are forfeited instead)." },
  { title: "Guest pass", detail: "One complimentary guest pass per month for Core, Elite and Unlimited." },
  { title: "Membership hold", detail: "Up to 30 days per commitment, with at least 14 days' written notice. Payments continue during a hold; the held time is added to the end of the commitment." },
  { title: "Unlimited limit", detail: "Maximum one class per day." },
  { title: "Commitment & billing", detail: "Memberships have a minimum commitment (3, 6 or 12 months, depending on plan) and are billed monthly on a recurring basis — not as a single upfront payment." },
  { title: "Cancelling a membership", detail: "At least 14 days' written notice. Ending before the commitment is complete requires paying the remaining balance of the membership agreement." },
  { title: "Upgrades & billing changes", detail: "Verify current studio policy before promising an effective date or prorated amount.", verify: true },
  { title: "Purchases are final", detail: "Memberships, packs and private sessions are non-refundable and non-transferable." },
];

/* ------------------------------------------------------------------ */
/* Items to confirm (shown at the bottom of the page)                  */
/* ------------------------------------------------------------------ */

export const openItems = [
  "Public pricing page lists a guest pass for Elite and Unlimited only; this guide follows the brief and lists one for Core too. Confirm which is correct.",
  "Public pricing page shows Essential on a 6-month commitment and Core on 6 or 12 months only. This guide follows the brief (Essential and Core with a 3-month option). Confirm the 3-month options are live in Mindbody.",
  "Member discounts (privates, packs & retail), priority/early booking and waitlist priority are taken from the public pricing page — confirm they still apply as written.",
  "Whether unused monthly classes roll over or expire.",
  "Upgrade timing and billing effective dates.",
  "Guest-pass restrictions (who qualifies, booking and availability).",
];
