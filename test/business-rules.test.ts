import { describe, expect, it } from "vitest";
import {
  getFeaturedStaffForCategory,
  getServiceCategoryBySlug,
  getStaffBySlug,
  getStaffDashboardScope,
  serviceCategories,
  services,
  staffMembers,
} from "../src/lib/studio-data";

describe("Mild 2 Wild service and staff rules", () => {
  it("keeps service pages scoped to only staff who offer that service category", () => {
    const tattooStaff = getFeaturedStaffForCategory("tattoo");

    expect(tattooStaff.length).toBeGreaterThan(0);
    expect(tattooStaff.every((staff) => staff.serviceCategorySlugs.includes("tattoo"))).toBe(true);
    expect(tattooStaff.some((staff) => staff.serviceCategorySlugs.includes("nails"))).toBe(false);
  });

  it("creates a meet-me profile shape for every staff member", () => {
    expect(staffMembers.length).toBeGreaterThanOrEqual(6);
    expect(
      staffMembers.every(
        (staff) =>
          staff.slug &&
          staff.name &&
          staff.bio &&
          staff.photoUrl &&
          staff.socialLinks.length > 0 &&
          (staff.serviceCategorySlugs.length > 0 || staff.isMascot || staff.title === "Team Member"),
      ),
    ).toBe(true);
  });

  it("assigns seeded staff to the expected service groups", () => {
    const slugsFor = (category: string) => staffMembers.filter((staff) => staff.serviceCategorySlugs.includes(category as never)).map((staff) => staff.slug);

    expect(slugsFor("nails")).toEqual([
      "team-member-01",
      "team-member-02",
      "team-member-05",
      "team-member-06",
      "team-member-13",
      "team-member-14",
      "team-member-15",
      "team-member-16",
      "team-member-17",
    ]);
    expect(slugsFor("hair")).toEqual(["team-member-08", "team-member-09", "team-member-11", "team-member-18"]);
    expect(slugsFor("tattoo")).toEqual(["team-member-03", "team-member-07", "team-member-10", "team-member-19"]);
    expect(slugsFor("aesthetics")).toEqual(["team-member-04"]);
    const mascot = staffMembers.find((staff) => staff.slug === "team-member-12");
    expect(mascot?.isMascot).toBe(true);
    expect(mascot?.name).toBe("Schwebels");
  });

  it("keeps public staff names customer-facing instead of placeholder labels", () => {
    const publicStaff = staffMembers.filter((staff) => !staff.isMascot);
    const placeholderNames = new Set([
      "Luna Lacquer",
      "Raven Ink",
      "Iris Aura",
      "Ace Needle",
      "Sol Strands",
      "Sunny Shears",
      "Ruby Rinse",
      "Cherry Chrome",
      "Pixie Polish",
      "Sage Spa",
    ]);

    expect(publicStaff.some((staff) => staff.name === "Caitlin")).toBe(true);
    expect(publicStaff.some((staff) => staff.name === "Piper")).toBe(true);
    expect(publicStaff.every((staff) => !/^Team Member \d+$/i.test(staff.name))).toBe(true);
    expect(publicStaff.every((staff) => !placeholderNames.has(staff.name))).toBe(true);
  });

  it("maps Caitlin to team member 13 as a nail artist", () => {
    const caitlin = getStaffBySlug("team-member-13");

    expect(caitlin?.name).toBe("Caitlin");
    expect(caitlin?.title).toBe("Nail Artist");
    expect(caitlin?.serviceCategorySlugs).toEqual(["nails"]);
    expect(caitlin?.photoUrl).toBe("/staff/team-member-13.jpg");
  });

  it("maps Lia to team member 05 with her nail bio and portfolio", () => {
    const lia = getStaffBySlug("team-member-05");

    expect(lia?.name).toBe("Lia");
    expect(lia?.title).toBe("Nail Artist");
    expect(lia?.serviceCategorySlugs).toEqual(["nails"]);
    expect(lia?.photoUrl).toBe("/staff/team-member-05.jpg");
    expect(lia?.bio).toContain("licensed nail tech for almost 2 years");
    expect(lia?.gallery).toEqual(["Animal print", "Alternative nails", "Y2K designs"]);
    expect(lia?.portfolioImages).toHaveLength(10);
    expect(lia?.portfolioImages?.[0].src).toBe("/staff/lia/lia-nails-01.jpg");
  });

  it("maps Juny to team member 02 as a nail artist", () => {
    const juny = getStaffBySlug("team-member-02");

    expect(juny?.name).toBe("Juny");
    expect(juny?.title).toBe("Nail Artist");
    expect(juny?.serviceCategorySlugs).toEqual(["nails"]);
    expect(juny?.photoUrl).toBe("/staff/team-member-02.jpg");
    expect(juny?.bio).toContain("recently licensed in February");
    expect(juny?.calendarColor).toBe("#FF3131");
  });

  it("maps Serenity to team member 06 as a nail artist", () => {
    const serenity = getStaffBySlug("team-member-06");

    expect(serenity?.name).toBe("Serenity");
    expect(serenity?.title).toBe("Nail Artist");
    expect(serenity?.serviceCategorySlugs).toEqual(["nails"]);
    expect(serenity?.photoUrl).toBe("/staff/team-member-06.jpg");
    expect(serenity?.portfolioImages?.length).toBeGreaterThan(0);
  });

  it("maps Surge to team member 10 as a tattoo artist", () => {
    const surge = getStaffBySlug("team-member-10");

    expect(surge?.name).toBe("Surge");
    expect(surge?.title).toBe("Tattoo Artist");
    expect(surge?.serviceCategorySlugs).toEqual(["tattoo"]);
    expect(surge?.photoUrl).toBe("/staff/team-member-10.jpg");
    expect(surge?.bio).toContain("Realism and capturing the small details");
    expect(surge?.calendarColor).toBe("#E23B16");
  });

  it("maps Nani to team member 14 as a nail artist", () => {
    const nani = getStaffBySlug("team-member-14");

    expect(nani?.name).toBe("Nani");
    expect(nani?.title).toBe("Nail Artist");
    expect(nani?.serviceCategorySlugs).toEqual(["nails"]);
    expect(nani?.photoUrl).toBe("/staff/team-member-14.jpg");
    expect(nani?.portfolioImages).toBeUndefined();
  });

  it("maps Piper to team member 17 as a nail artist", () => {
    const piper = getStaffBySlug("team-member-17");

    expect(piper?.name).toBe("Piper");
    expect(piper?.title).toBe("Nail Artist");
    expect(piper?.serviceCategorySlugs).toEqual(["nails"]);
    expect(piper?.serviceSlugs).toContain("gel-full-set");
    expect(piper?.portfolioImages).toHaveLength(12);
    expect(piper?.bio).toContain("almond shape nails");
  });

  it("maps Sharvelle to team member 18 as a hair stylist", () => {
    const sharvelle = getStaffBySlug("team-member-18");

    expect(sharvelle?.name).toBe("Sharvelle");
    expect(sharvelle?.title).toBe("Hair Stylist");
    expect(sharvelle?.serviceCategorySlugs).toEqual(["hair"]);
    expect(sharvelle?.serviceSlugs).toContain("cut-with-wash");
    expect(sharvelle?.serviceSlugs).toContain("balayage");
    expect(sharvelle?.photoUrl).toBe("/staff/team-member-18.jpg");
    expect(sharvelle?.bio).toContain("hair team");
    expect(sharvelle?.calendarColor).toBe("#FF4FB3");
  });

  it("maps Mari to team member 19 as a tattoo artist", () => {
    const mari = getStaffBySlug("team-member-19");

    expect(mari?.name).toBe("Mari");
    expect(mari?.title).toBe("Tattoo Artist");
    expect(mari?.serviceCategorySlugs).toEqual(["tattoo"]);
    expect(mari?.serviceSlugs).toEqual(["tattoo-consult", "flash-tattoo"]);
    expect(mari?.photoUrl).toBe("/staff/team-member-19.jpg");
    expect(mari?.bio).toContain("tattoo artist at Mild 2 Wild");
    expect(mari?.calendarColor).toBe("#00C8D8");
  });

  it("adds Tim as a non-bookable team member without placeholder public copy", () => {
    const tim = getStaffBySlug("team-member-20");

    expect(tim?.name).toBe("Tim");
    expect(tim?.title).toBe("Team Member");
    expect(tim?.serviceCategorySlugs).toEqual([]);
    expect(tim?.serviceSlugs).toEqual([]);
    expect(tim?.photoUrl).toBe("/staff/team-member-20.jpg");
    expect(tim?.bio).toContain("contact the studio");
  });

  it("uses the received client menu prices for non-tattoo service categories", () => {
    const bySlug = new Map(services.map((service) => [service.slug, service]));

    expect(bySlug.get("acrylic-full-set")?.priceLabel).toBe("$60");
    expect(bySlug.get("ultimate-pedicure")?.description).toContain("hot stones");
    expect(bySlug.get("cut-with-wash")?.priceLabel).toBe("$35");
    expect(bySlug.get("balayage")?.priceLabel).toBe("$200+");
    expect(bySlug.get("brow-wax-lami-tint")?.priceLabel).toBe("$65");
    expect(bySlug.get("volume-lash-set")?.priceLabel).toBe("$100");
    expect(bySlug.get("sixty-minute-facial")?.priceLabel).toBe("$60.00");
    expect(bySlug.get("full-leg-wax")?.priceLabel).toBe("$40.00");
    expect(bySlug.get("tattoo-consult")?.priceLabel).toBe("Consult first");
  });

  it("models owner/admin access differently from individual employee calendar access", () => {
    const ownerScope = getStaffDashboardScope("owner");
    const employeeScope = getStaffDashboardScope("staff", "team-member-10");

    expect(ownerScope.canManageAllCalendars).toBe(true);
    expect(ownerScope.visibleStaffSlugs).toEqual(staffMembers.map((staff) => staff.slug));
    expect(employeeScope.canManageAllCalendars).toBe(false);
    expect(employeeScope.visibleStaffSlugs).toEqual(["team-member-10"]);
  });

  it("includes all client-requested primary service categories", () => {
    expect(serviceCategories.map((category) => category.slug)).toEqual([
      "nails",
      "hair",
      "tattoo",
      "aesthetics",
    ]);
    expect(getServiceCategoryBySlug("hair")?.staffLabel).toContain("Hair");
    expect(getStaffBySlug("unknown")).toBeUndefined();
  });
});
