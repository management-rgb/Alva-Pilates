/**
 * Content for the staff Lead Conversion Playbook.
 * Prices come from ../membership-guide/guideData.ts (single source of truth) — edit words here, prices there.
 */

export const stageList = [
  { id: "lead", label: "New Lead", goal: "Contact & Book" },
  { id: "first", label: "First Visit", goal: "Connect & Build Trust" },
  { id: "second", label: "Second Visit", goal: "Recommend & Offer" },
  { id: "third", label: "Third Visit", goal: "Convert & Enroll" },
] as const;

export const quickRef = [
  ["New Lead", "Contact and book"],
  ["First Visit", "Connect and rebook"],
  ["Second Visit", "Recommend a membership"],
  ["Third Visit", "Ask for the sale"],
  ["Not Ready", "Understand the concern, then follow up"],
  ["Converted", "Enroll and book upcoming classes"],
];

export type Stage = {
  id: "lead" | "first" | "second" | "third";
  title: string;
  goal: string;
  groups: { heading: string; steps: string[] }[];
  scriptIds: string[];
  checklist: string[];
  done: string;
};

export const stages: Stage[] = [
  {
    id: "lead",
    title: "New Lead",
    goal: "Turn an inquiry into a booked first class.",
    groups: [
      {
        heading: "What to do",
        steps: [
          "Check Lead Management in Mindbody (Marketing → Lead Management) for new leads who registered but haven't purchased. See if they already have a booking or purchase.",
          "Do not contact ClassPass leads for now.",
          "Contact them within 15–30 minutes during staffed hours. Introduce yourself personally.",
          "Ask if they've tried reformer Pilates and what they're looking for. For complete beginners, suggest Alva Foundation.",
          "Recommend an intro offer, then offer to buy and book it for them right there. Don't just send them to the website.",
          "Confirm the first class and log the next step in Mindbody.",
        ],
      },
      {
        heading: "If they don't reply",
        steps: [
          "Next business day: one friendly follow-up.",
          "A few days later: one final helpful check-in, if appropriate.",
          "Never send the same message twice. Honor opt-outs and contact preferences.",
        ],
      },
    ],
    scriptIds: ["lead-welcome", "lead-followup"],
    checklist: [
      "Checked Mindbody for existing booking or purchase",
      "Contacted the lead personally",
      "Asked about experience and goals",
      "Recommended an intro offer",
      "Offered to purchase and book for them",
      "Logged the next step in Mindbody",
    ],
    done: "Intro purchased and first class booked. If they booked without an intro, still follow the first-visit steps.",
  },
  {
    id: "first",
    title: "First Visit",
    goal: "Create a great first impression and secure the second visit.",
    groups: [
      {
        heading: "Before class",
        steps: [
          "Spot first-timers on the roster. Check upcoming classes ahead of time and reach out the day before to ask about goals. If it's their first time on a reformer, offer help. (Skip ClassPass clients.)",
          "Greet them by name. Confirm waiver and check-in, show them where to put belongings, and introduce them to the instructor.",
        ],
      },
      {
        heading: "After class",
        steps: [
          "Ask how it went and what made them curious about Pilates.",
          "Ask how many times a week they'd ideally like to come.",
          "Mention naturally that twice a week gives more chances to build technique and strength. No guaranteed results or timelines.",
          "Offer to book their second class before they leave. This is the goal. Keep the membership talk light.",
        ],
      },
    ],
    scriptIds: ["first-greeting", "first-after"],
    checklist: [
      "Greeted by name",
      "Waiver and check-in confirmed",
      "Introduced the instructor",
      "Asked about their first class",
      "Learned their goals",
      "Discussed ideal weekly attendance",
      "Offered to book class two",
      "Updated Mindbody notes",
    ],
    done: "They had a positive visit, you know their goals, and class two is booked or offered.",
  },
  {
    id: "second",
    title: "Second Visit",
    goal: "Recommend and present the right membership. Start this conversation yourself.",
    groups: [
      {
        heading: "Before class",
        steps: [
          "Review their name, attendance, intro offer, goals and any earlier membership talk.",
          "Check when their intro expires and whether they may qualify for the intro credit.",
          "Ask the instructor to give them a short, positive note on their progress (no prices).",
        ],
      },
      {
        heading: "After class",
        steps: [
          "Start personal: ask how they feel after two classes.",
          "Ask how often they'd realistically come, then recommend ONE plan: explain why it fits their goals, then price and commitment.",
          "Check the intro credit before mentioning it. Never imply everyone qualifies.",
          "Ask for the sale. If they're not ready, find the real concern, log it, and book or offer the third visit.",
        ],
      },
    ],
    scriptIds: ["second-recommend", "second-core", "second-elite", "second-unlimited", "ready"],
    checklist: [
      "Reviewed their goals and notes",
      "Asked about their experience",
      "Recommended one specific membership",
      "Explained benefits, price and commitment",
      "Checked intro credit eligibility",
      "Asked for the sale",
      "Recorded the outcome in Mindbody",
      "Offered the third visit if not converted",
    ],
    done: "They bought a membership, or got a clear, personal recommendation.",
  },
  {
    id: "third",
    title: "Third Visit",
    goal: "Follow up and help them decide. This is our target conversion point.",
    groups: [
      {
        heading: "Before class",
        steps: [
          "Read the notes from last time: recommended plan, price discussed, concerns, intro expiration, any promises.",
        ],
      },
      {
        heading: "After class",
        steps: [
          "Follow up personally on the membership you discussed.",
          "Restate the recommendation and ask if they'd like to get set up today.",
          "If they hesitate, ask what's holding them back, answer that, and agree on a next step. No pressure.",
        ],
      },
      {
        heading: "To enroll",
        steps: [
          "Confirm the plan, monthly price and minimum commitment.",
          "Explain the cancellation and hold policies, and confirm the billing date and any credit.",
          "Process it in Mindbody, then help them book upcoming classes and welcome them as a member.",
        ],
      },
    ],
    scriptIds: ["third-close", "intro-expiring"],
    checklist: [
      "Reviewed last conversation",
      "Followed up personally",
      "Confirmed the recommended plan",
      "Explained price and benefits",
      "Asked for the sale",
      "Enrolled in Mindbody if accepted",
      "Booked upcoming classes",
      "Updated Mindbody",
    ],
    done: "Membership purchased, or their decision and next step are documented.",
  },
];

export type LeadScript = { id: string; title: string; text: string };

export const scripts: LeadScript[] = [
  { id: "lead-welcome", title: "1. New lead welcome", text: "Hi [Name]! This is [Your name] from Alva Pilates. Welcome! I wanted to personally reach out and see if you've tried reformer Pilates before. I'd love to help you find the right class and get your first visit scheduled." },
  { id: "lead-nopurchase", title: "2. Lead who hasn't purchased", text: "Hi [Name], it's [Your name] at Alva. I saw you signed up and wanted to help you get started. We have a 3-class intro and a 15-day unlimited intro. Which sounds more like you? I can set up your first class right now." },
  { id: "lead-followup", title: "3. No-response follow-up", text: "Hi [Name]! Just checking in to see if you had any questions about getting started at Alva. We'd be happy to help you choose your first class." },
  { id: "first-greeting", title: "4. First-visit greeting", text: "Welcome, [Name]! I'm [Your name]. We're so glad you're here. Let me show you where to put your things, and I'll introduce you to your instructor so you feel comfortable before class." },
  { id: "first-after", title: "5. First visit, after class", text: "How was your first class? What made you want to try Pilates? ... And how many times a week would you ideally like to come? ... Would you like me to help you reserve your next class?" },
  { id: "second-recommend", title: "6. Second visit, recommendation", text: "It's so nice to see you back! How are you feeling after your first two classes? Since you're enjoying it, I'd love to tell you about our memberships and find something that fits your routine. How many times a week would you realistically like to come?" },
  { id: "second-core", title: "Core (about twice a week)", text: "Based on what you've told me, Core would be a great fit. It's eight classes a month, so about twice a week. That's a great rhythm for building consistency and confidence." },
  { id: "second-elite", title: "Elite (about three times a week)", text: "If you'd like to come three times a week, Elite is a great option. You'd have more chances to work on strength, mobility and endurance while keeping Pilates part of your weekly routine." },
  { id: "second-unlimited", title: "Unlimited (four or more times a week)", text: "If you're planning four or more classes a week, Unlimited gives you the most flexibility. You can mix class types and build a routine around your schedule." },
  { id: "third-close", title: "7. Third visit, membership close", text: "We're so happy you've been enjoying your classes! I wanted to follow up on the membership we talked about. Based on your goals, I still think [Membership] is a great fit. Would you like us to get you set up today?" },
  { id: "price", title: "8. Concerned about price", text: "That's fair, it's a real decision. Let's look at how often you'd actually come, and I'll show you the option that fits that, not more than you need. The longer commitments lower the monthly rate, and it's always billed monthly." },
  { id: "commitment", title: "9. Concerned about commitment", text: "I understand. Let me explain exactly how it works: [Plan] is $[price] a month, billed monthly, with a [X]-month minimum. You can pause for up to 30 days with 14 days' notice. Does that feel clearer?" },
  { id: "not-ready", title: "10. Interested but not ready", text: "Of course! Is there anything specific you'd like to know before deciding? ... Thank you for telling me. Can I check in with you on [day]? And let's make sure your next class is booked so you keep your momentum." },
  { id: "ready", title: "11. Ready to enroll", text: "Wonderful, welcome to the Alva membership! We can take care of everything right here, and then let's reserve your next few classes before you go." },
  { id: "intro-expiring", title: "12. Intro expiring soon", text: "Your intro ends on [date]. If you join a membership within 14 days after it expires, you may qualify to have your intro credited toward your first payment. Let me check your eligibility, and if you'd like we can get it started today." },
];

export type Objection = {
  q: string;
  understand: string;
  say: string;
  avoid: string;
  next: string;
};

export const objections: Objection[] = [
  {
    q: "“It's too expensive.”",
    understand: "They may be comparing against how often they'd really come.",
    say: "I understand. Let's look at how often you'd come, and I'll show the plan that fits that. The longer commitments lower your monthly rate, and it's billed monthly, not upfront.",
    avoid: "Pushing a bigger plan, or suggesting they should just afford it.",
    next: "Offer the plan that fits their real attendance, or agree on a follow-up date.",
  },
  {
    q: "“I need to think about it.”",
    understand: "It's a normal, reasonable pause, not a no.",
    say: "Of course. Is there anything specific I can answer? And can I check in with you on [day]? Let's also book your next class so you keep your momentum.",
    avoid: "Pressure, fake deadlines, or letting them leave with no next step.",
    next: "Agree a follow-up time and book their next class.",
  },
  {
    q: "“I don't have time.”",
    understand: "They may be imagining more classes than they need.",
    say: "That makes sense. What's a realistic number of days you could come? Even starting with a plan around twice a week keeps it manageable.",
    avoid: "Recommending more classes than their schedule allows.",
    next: "Help them pick standing days and times.",
  },
  {
    q: "“I'm worried about the commitment.”",
    understand: "They want to know exactly what they're agreeing to.",
    say: "Totally fair. It's billed monthly with a minimum commitment of [X] months. You can pause up to 30 days with 14 days' notice. Cancelling needs 14 days' written notice, and ending early means paying the remaining balance.",
    avoid: "Skipping or softening the terms.",
    next: "Offer the term that feels comfortable and confirm they understand.",
  },
  {
    q: "“Can I just keep buying class packs?”",
    understand: "They value flexibility and no commitment.",
    say: "You can. Packs are flexible but cost more per class. A 10-class pack is $33.90 a class, while Core is about $26 a class on the 6-month rate. If you come at least twice a week, a membership usually costs less per class.",
    avoid: "Putting packs down. They are a valid choice.",
    next: "Let them compare the numbers, then choose.",
  },
  {
    q: "“I'm not sure Pilates is working.”",
    understand: "Progress feels slow, or they're early in their practice.",
    say: "That's a common feeling early on. Strength, movement skills and confidence tend to build with consistent practice over time. How often have you been able to come?",
    avoid: "Guaranteeing results or giving timelines.",
    next: "Talk about consistency and help schedule a regular rhythm.",
  },
  {
    q: "“Can I upgrade later?”",
    understand: "They want room to grow.",
    say: "Many clients do. Let me confirm exactly how upgrades and billing work in Mindbody so I give you the right answer.",
    avoid: "Promising an effective date or price before confirming policy.",
    next: "Check the current upgrade policy, then tell them.",
  },
];

export const dailyChecklist = {
  start: [
    "Check Lead Management in Mindbody (Marketing → Lead Management)",
    "Find leads with no first booking",
    "Find first-time clients attending today",
    "Find clients on their second class",
    "Find clients on their third class",
    "Review pending membership conversations",
    "Review intros that are close to expiring",
  ],
  during: [
    "Check Lead Management again, several times during your shift",
    "Contact new leads (not ClassPass leads for now)",
    "Welcome first-time clients and learn their goals",
    "Recommend memberships to second-visit clients",
    "Follow up and ask for the sale with third-visit clients",
    "Help with purchases and class reservations",
  ],
  end: [
    "Check Lead Management one last time before you leave",
    "Update Mindbody notes",
    "Record membership conversations and next steps",
    "Finish or hand off pending follow-ups",
    "Tell the next person about interested clients coming in",
  ],
};

export const scenarios = [
  {
    title: "A. Lead registered online, didn't purchase",
    situation: "Someone signed up through the registration widget yesterday but hasn't bought anything.",
    action: "Contact them personally, ask about experience and goals, recommend an intro, and offer to buy and book for them.",
    example: "“Hi [Name], it's [Your name] at Alva. Have you tried reformer Pilates before? I'd love to help you pick the right first class and get you booked.”",
    outcome: "Intro purchased and first class booked.",
    mistakes: "Sending only a link to the website. Sending the same message again and again.",
  },
  {
    title: "B. Client just finished their first Foundation class",
    situation: "A brand-new client is at the desk after class.",
    action: "Ask how it felt, learn their goals and ideal frequency, and book class two.",
    example: "“How was your first class? How many times a week would you like to come? Let me help you reserve your next one.”",
    outcome: "Second class booked.",
    mistakes: "Launching into a long membership pitch. Leaving without rebooking.",
  },
  {
    title: "C. Second visit, wants to come twice a week",
    situation: "A client on their second class says twice a week is realistic.",
    action: "Recommend Core, explain why it fits, then price and commitment, then ask for the sale.",
    example: "“Core is eight classes a month, about twice a week, which matches what you want. Would you like me to take care of it today?”",
    outcome: "Core membership purchased, or a clear recommendation with the third visit booked.",
    mistakes: "Listing every plan. Quoting price before benefits.",
  },
  {
    title: "D. Third visit, worried about commitment",
    situation: "A client attending their third class likes Core but hesitates over the commitment.",
    action: "Ask what's holding them back, explain the exact terms and policies, and offer the term that feels comfortable.",
    example: "“It's billed monthly with a [X]-month minimum, and you can pause up to 30 days with notice. Which term feels right to you?”",
    outcome: "They enroll, or you agree a next step and log it.",
    mistakes: "Hiding or rushing through terms. Pressuring them.",
  },
  {
    title: "E. Expiring intro, may qualify for credit",
    situation: "A client's intro is about to end and they're interested in membership.",
    action: "Check their purchase history and eligibility first, then explain the credit and offer to get started.",
    example: "“Let me check your eligibility. If you join within 14 days after your intro expires, your intro may be credited toward your first payment.”",
    outcome: "Membership started with the correct credit, or a clear next step.",
    mistakes: "Promising the credit before verifying. Implying everyone qualifies.",
  },
];

export const expectations = [
  "Every new lead gets timely, personal attention.",
  "First-time clients feel welcomed and supported.",
  "First-visit clients are offered help booking their second class.",
  "Second-visit clients get a suitable membership recommendation.",
  "Third-visit clients get a clear follow-up and enrollment offer.",
  "Every interested client has a documented next step in Mindbody.",
  "No client is pressured or misled.",
];
