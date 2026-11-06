import assert from "node:assert/strict";
import { plans } from "../app/staff/membership-guide/guideData.ts";
import { compare, money, planOptions, termSavings, perClass } from "../app/staff/membership-guide/pricingMath.ts";

const o = (k: string) => planOptions(plans).find((x) => x.key === k)!;

// Exact price table from the brief
const table = { essential: { 3: 119 }, core: { 3: 219, 6: 209, 12: 199 }, elite: { 6: 269, 12: 249 }, unlimited: { 6: 349, 12: 329 } };
for (const p of plans) assert.deepEqual(p.prices, table[p.id as keyof typeof table], p.id);

let c = compare(o("essential-3"), o("core-3"));
assert.equal(c.priceDiff, 100); assert.equal(c.classDiff, 4); assert.equal(c.perAdditionalClass, 25);
assert.equal(money(c.aPerClass), "$29.75"); assert.equal(money(c.bPerClass), "$27.38"); assert.equal(c.perClassVerdict, "lower");

c = compare(o("core-6"), o("elite-6"));
assert.equal(c.priceDiff, 60); assert.equal(c.classDiff, 4); assert.equal(c.perAdditionalClass, 15);
assert.equal(money(c.aPerClass), "$26.13"); assert.equal(money(c.bPerClass), "$22.42");
assert.equal(c.breakEven, 11); // 269 / (209/8) = 10.3 -> 11

c = compare(o("elite-6"), o("unlimited-6"));
assert.equal(c.priceDiff, 80); assert.equal(c.classDiff, null); assert.equal(c.breakEven, 16); // 349/(269/12)=15.57

assert.deepEqual(termSavings(plans[1], 3, 12), { perMonth: 20, perYear: 240 });
assert.deepEqual(termSavings(plans[1], 6, 12), { perMonth: 10, perYear: 120 });
assert.deepEqual(termSavings(plans[2], 6, 12), { perMonth: 20, perYear: 240 });
assert.deepEqual(termSavings(plans[3], 6, 12), { perMonth: 20, perYear: 240 });
assert.equal(money(perClass(329, plans[3])), "$10.97");

// Attendance-adjusted: 20 classes on Unlimited 6-mo = $17.45/class; Elite caps at 12
c = compare(o("elite-6"), o("unlimited-6"), 20);
assert.equal(money(c.bPerClass), "$17.45"); assert.equal(money(c.aPerClass), "$22.42"); assert.equal(c.perClassVerdict, "lower");
c = compare(o("elite-6"), o("unlimited-6"), 12);
assert.equal(c.perClassVerdict, "higher"); // at 12 classes Unlimited costs more per class

// Prices must not disagree with the public pricing page where both exist
const { membershipTiers } = await import("../app/lib/membershipPricing.ts");
for (const t of membershipTiers) {
  const p = plans.find((x) => x.id === t.id)!;
  for (const cm of t.commitments) if (p.prices[cm.months] !== undefined) assert.equal(p.prices[cm.months], cm.monthlyPrice, `${t.id}-${cm.months}`);
}
console.log("staff guide pricing checks: all passed");
