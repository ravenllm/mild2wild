import { describe, expect, it } from "vitest";
import { dogClickerRanks, dogClickerTreats, getDogClickerMascot, getDogClickerRank } from "../src/lib/dog-clicker";

describe("dog treat clicker", () => {
  it("uses the shop dog mascot image and defines feedable treat milestones", () => {
    const mascot = getDogClickerMascot();

    expect(mascot.name).toBe("Schwebels");
    expect(mascot.tagline).toContain("Schwebels");
    expect(mascot.tagline).toContain("60-second Treat Rush");
    expect(mascot.image).toBe("/staff/team-member-12.jpg");
    expect(mascot.route).toBe("/dog-clicker");
    expect(dogClickerTreats.map((treat) => treat.name)).toEqual([
      "Tiny Biscuit",
      "Rainbow Bone",
      "Spa Day Snack",
      "Wild Deluxe Treat",
    ]);
    expect(dogClickerTreats.every((treat, index, treats) => index === 0 || treat.unlockAt > treats[index - 1].unlockAt)).toBe(true);
  });

  it("defines arcade-style score ranks in ascending order", () => {
    expect(dogClickerRanks.map((rank) => rank.name)).toEqual([
      "Couch Pup",
      "Treat Rookie",
      "Certified Good Human",
      "Schwebels' Favorite",
      "Mild 2 Wild Legend",
    ]);
    expect(dogClickerRanks.every((rank, index, ranks) => index === 0 || rank.minimumScore > ranks[index - 1].minimumScore)).toBe(true);
    expect(getDogClickerRank(0).name).toBe("Couch Pup");
    expect(getDogClickerRank(125).name).toBe("Certified Good Human");
    expect(getDogClickerRank(999).name).toBe("Mild 2 Wild Legend");
  });
});
