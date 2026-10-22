/**
 * Local landing pages for neighborhoods near the studio. Each area needs its own
 * copy: near-duplicate pages hurt search rankings, so write something specific.
 * Only state facts about the studio and general geography — no drive times.
 */
export type LocalArea = {
  slug: string;
  /** Place name used in headings and copy, e.g. "Stevenson Ranch" */
  name: string;
  title: string;
  description: string;
  heroSubtitle: string;
  intro: string[];
  gettingHere: string;
  fit: { title: string; description: string }[];
};

export const localAreas: LocalArea[] = [
  {
    slug: "pilates-valencia",
    name: "Valencia",
    title: "Reformer Pilates in Valencia, CA",
    description:
      "Alva Pilates is a boutique reformer studio in Tesoro Village, Valencia. Small-group classes for every level and a 15-day unlimited intro for new clients.",
    heroSubtitle: "Our home is Tesoro Village, on Copper Hill Drive.",
    intro: [
      "Alva Pilates is a boutique reformer Pilates studio at 23840 Copper Hill Drive in Valencia, in the Tesoro Village plaza. If you live or work in Valencia, we're your neighborhood studio.",
      "Classes are small, so your instructor sees your form and adjusts the work to you. Whether you're brand new to the reformer or building on years of practice, there's a class to match.",
    ],
    gettingHere:
      "We're in the Tesoro Village plaza on Copper Hill Drive, with ample parking steps from the studio entrance. Open the map below for turn-by-turn directions from anywhere in Valencia.",
    fit: [
      {
        title: "Before or after work",
        description:
          "Weekday classes run in the morning and again in the late afternoon, so you can fit a class around your day.",
      },
      {
        title: "Weekend classes",
        description:
          "Saturday and Sunday classes at 9, 10 and 11 AM make it easy to start the weekend with movement.",
      },
      {
        title: "Beginner-friendly",
        description:
          "No experience needed. Alva Foundation teaches the reformer from the ground up.",
      },
    ],
  },
  {
    slug: "pilates-stevenson-ranch",
    name: "Stevenson Ranch",
    title: "Reformer Pilates near Stevenson Ranch, CA",
    description:
      "Looking for reformer Pilates near Stevenson Ranch? Alva Pilates is a boutique small-group studio in nearby Valencia with a 15-day unlimited intro for new clients.",
    heroSubtitle: "A boutique reformer studio just up the road in Valencia.",
    intro: [
      "Alva Pilates is a boutique reformer studio in Valencia, a short trip from Stevenson Ranch. We welcome clients from Stevenson Ranch and across the Santa Clarita Valley.",
      "Our classes are small and personal. Your instructor guides each exercise and offers modifications, so you can work at your own pace, whether it's your first class or your five-hundredth.",
    ],
    gettingHere:
      "The studio is at 23840 Copper Hill Drive in Valencia, in the Tesoro Village plaza. Ample parking is available steps from the entrance. Open the map for directions from Stevenson Ranch.",
    fit: [
      {
        title: "A boutique alternative nearby",
        description:
          "Small-group reformer classes with real attention, without a big-box gym feel.",
      },
      {
        title: "Easy to start",
        description:
          "New clients can begin with a 15-day unlimited intro, one class per day for 15 consecutive days.",
      },
      {
        title: "All levels",
        description:
          "Every class has options for your level, from first-timers to advanced clients.",
      },
    ],
  },
  {
    slug: "pilates-newhall",
    name: "Newhall",
    title: "Reformer Pilates near Newhall, CA",
    description:
      "Reformer Pilates near Newhall: Alva Pilates is a boutique small-group studio in Valencia, with classes for every level and a 15-day unlimited intro for new clients.",
    heroSubtitle: "Small-group reformer classes, a short trip from Newhall.",
    intro: [
      "If you live in Newhall and want a reformer studio where instructors know your name, Alva Pilates in Valencia is a short trip away. We welcome clients from every part of the Santa Clarita Valley.",
      "Classes are intimate, with careful instruction and modifications offered throughout. Many clients come to us after time away from exercise, after an injury, or looking for a more focused practice.",
    ],
    gettingHere:
      "Find us at 23840 Copper Hill Drive in Valencia, in the Tesoro Village plaza, with ample parking steps from the door. Open the map for directions from Newhall.",
    fit: [
      {
        title: "Personal attention",
        description:
          "Small classes mean your instructor sees your form and adjusts the work for your body.",
      },
      {
        title: "Private sessions",
        description:
          "Prefer one-on-one guidance first, or working around an injury? A private session is tailored to you.",
      },
      {
        title: "Flexible schedule",
        description:
          "Morning and late-afternoon classes on weekdays, plus weekend mornings.",
      },
    ],
  },
  {
    slug: "pilates-saugus",
    name: "Saugus",
    title: "Reformer Pilates near Saugus, CA",
    description:
      "Reformer Pilates near Saugus: Alva Pilates is a boutique small-group studio in Valencia, with classes for every level and a 15-day unlimited intro for new clients.",
    heroSubtitle: "A boutique reformer studio serving the whole Santa Clarita Valley.",
    intro: [
      "Alva Pilates is a boutique reformer studio in Valencia that welcomes clients from Saugus and across the Santa Clarita Valley. If you've been looking for small classes and real instruction, we'd love to meet you.",
      "Every class lasts 50 minutes and is led by an instructor trained in comprehensive reformer instruction. We'll help you set up your reformer and explain the springs and straps before your first class begins.",
    ],
    gettingHere:
      "We're at 23840 Copper Hill Drive in Valencia, in the Tesoro Village plaza. Ample parking is steps from the studio entrance. Open the map for directions from Saugus.",
    fit: [
      {
        title: "No experience needed",
        description:
          "New to the reformer? Start with Alva Foundation, our Level 1 class.",
      },
      {
        title: "Try before you commit",
        description:
          "The 15-day unlimited intro lets new clients try every class: one class per day for 15 consecutive days.",
      },
      {
        title: "Community feel",
        description:
          "A welcoming studio where clients and instructors get to know one another.",
      },
    ],
  },
  {
    slug: "pilates-castaic",
    name: "Castaic",
    title: "Reformer Pilates near Castaic, CA",
    description:
      "Reformer Pilates near Castaic: Alva Pilates is a boutique small-group studio in Valencia, with classes for every level and a 15-day unlimited intro for new clients.",
    heroSubtitle: "Worth the trip: small-group reformer classes in Valencia.",
    intro: [
      "Alva Pilates is a boutique reformer studio in Valencia, and we welcome clients from Castaic and the northern end of the Santa Clarita Valley.",
      "If you're making the trip, we'd like it to be worth it: small classes, careful instruction, and a calm, welcoming studio. Book ahead on the schedule so your spot is saved.",
    ],
    gettingHere:
      "The studio is at 23840 Copper Hill Drive in Valencia, in the Tesoro Village plaza, with ample parking steps from the entrance. Open the map for directions from Castaic.",
    fit: [
      {
        title: "Plan your visit",
        description:
          "Reserve your class online ahead of time. For your first class, arrive 10–15 minutes early.",
      },
      {
        title: "Make the trip count",
        description:
          "With the 15-day unlimited intro, new clients can take one class per day for 15 consecutive days.",
      },
      {
        title: "All levels welcome",
        description:
          "Beginners through advanced clients, with modifications offered in every class.",
      },
    ],
  },
];

export function getLocalArea(slug: string): LocalArea {
  const area = localAreas.find((a) => a.slug === slug);
  if (!area) throw new Error(`Unknown local area: ${slug}`);
  return area;
}
