export type DogTreatIconName = "bone" | "rainbow" | "spark" | "crown";

export type DogClickerTreat = {
  name: string;
  icon: DogTreatIconName;
  unlockAt: number;
  rewardText: string;
};

export type DogClickerRank = {
  name: string;
  minimumScore: number;
  message: string;
};

export const dogClickerTreats: DogClickerTreat[] = [
  {
    name: "Tiny Biscuit",
    icon: "bone",
    unlockAt: 0,
    rewardText: "A polite little crunch.",
  },
  {
    name: "Rainbow Bone",
    icon: "rainbow",
    unlockAt: 25,
    rewardText: "Tail wag mode: activated.",
  },
  {
    name: "Spa Day Snack",
    icon: "spark",
    unlockAt: 75,
    rewardText: "Schwebels is feeling pampered.",
  },
  {
    name: "Wild Deluxe Treat",
    icon: "crown",
    unlockAt: 150,
    rewardText: "Schwebels now owns the parlor.",
  },
];

export const dogClickerRanks: DogClickerRank[] = [
  {
    name: "Couch Pup",
    minimumScore: 0,
    message: "Schwebels noticed the effort.",
  },
  {
    name: "Treat Rookie",
    minimumScore: 50,
    message: "A respectable snack run.",
  },
  {
    name: "Certified Good Human",
    minimumScore: 125,
    message: "Schwebels approves this technique.",
  },
  {
    name: "Schwebels' Favorite",
    minimumScore: 250,
    message: "Tail-wag energy is officially high.",
  },
  {
    name: "Mild 2 Wild Legend",
    minimumScore: 400,
    message: "The treat jar may never recover.",
  },
];

export function getDogClickerMascot() {
  return {
    name: "Schwebels",
    title: "Shop Dog Treat Rush Mascot",
    image: "/staff/team-member-12.jpg",
    route: "/dog-clicker",
    tagline: "Start a 60-second Treat Rush, build a tail-wag combo, chase golden treats, and see if you can become Schwebels' favorite human.",
  };
}

export function getUnlockedTreat(totalTreats: number) {
  return dogClickerTreats.reduce((current, treat) => (totalTreats >= treat.unlockAt ? treat : current), dogClickerTreats[0]);
}

export function getDogClickerRank(score: number) {
  return dogClickerRanks.reduce((current, rank) => (score >= rank.minimumScore ? rank : current), dogClickerRanks[0]);
}
