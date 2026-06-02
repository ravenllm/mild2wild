import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildStaffLoginInviteMetadata, buildStaffLoginInviteRedirectTo, normalizeStaffLoginInvite } from "../src/lib/staff-login-invites";
import { staffMembers } from "../src/lib/studio-data";

describe("staff login invites", () => {
  it("normalizes owner-entered emails and locks the invite to an existing non-mascot staff profile", () => {
    const result = normalizeStaffLoginInvite(
      {
        staffSlug: "team-member-21",
        email: "  Alicia@Example.COM  ",
      },
      staffMembers,
    );

    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error("expected valid invite");
    expect(result.email).toBe("alicia@example.com");
    expect(result.staff.slug).toBe("team-member-21");
    expect(result.staff.name).toBe("Alicia");
  });

  it("rejects profile selection for mascots, missing staff, and invalid emails", () => {
    expect(normalizeStaffLoginInvite({ staffSlug: "schwebels", email: "dog@example.com" }, staffMembers)).toEqual({
      ok: false,
      reason: "invalid_staff",
    });
    expect(normalizeStaffLoginInvite({ staffSlug: "team-member-999", email: "ghost@example.com" }, staffMembers)).toEqual({
      ok: false,
      reason: "invalid_staff",
    });
    expect(normalizeStaffLoginInvite({ staffSlug: "team-member-21", email: "not-an-email" }, staffMembers)).toEqual({
      ok: false,
      reason: "invalid_email",
    });
  });

  it("builds Supabase invite metadata that staff login consumes without letting employees choose profiles", () => {
    const staff = staffMembers.find((member) => member.slug === "team-member-21");
    expect(staff).toBeTruthy();
    if (!staff) throw new Error("expected Alicia fixture");

    expect(buildStaffLoginInviteMetadata(staff)).toEqual({
      role: "staff",
      staff_slug: "team-member-21",
      staffSlug: "team-member-21",
      full_name: "Alicia",
      name: "Alicia",
    });
    expect(buildStaffLoginInviteRedirectTo(staff.slug)).toContain("/login?staff=team-member-21");
  });

  it("keeps invite controls owner-only on dashboard profile cards", () => {
    const source = readFileSync(join(process.cwd(), "src/app/dashboard/page.tsx"), "utf8");
    expect(source).toContain("if (session.role !== \"owner\") redirect(\"/dashboard?inviteLogin=forbidden#profile-controls\")");
    expect(source).toContain("action={inviteStaffLoginAction}");
    expect(source).toContain("Invite login");
    expect(source).toContain("They cannot choose or switch profiles.");
  });
});
