import { absoluteUrl } from "./seo";
import type { StaffMember } from "./studio-data";

export type StaffLoginInviteInput = {
  staffSlug: unknown;
  email: unknown;
};

export type StaffLoginInviteNormalization =
  | { ok: true; email: string; staff: StaffMember }
  | { ok: false; reason: "missing_email" | "invalid_email" | "invalid_staff" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeStaffLoginInvite(input: StaffLoginInviteInput, staffMembers: StaffMember[]): StaffLoginInviteNormalization {
  const staffSlug = typeof input.staffSlug === "string" ? input.staffSlug.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const staff = staffMembers.find((member) => member.slug === staffSlug && !member.isMascot);

  if (!staff) return { ok: false, reason: "invalid_staff" };
  if (!email) return { ok: false, reason: "missing_email" };
  if (!emailPattern.test(email)) return { ok: false, reason: "invalid_email" };

  return { ok: true, email, staff };
}

export function buildStaffLoginInviteMetadata(staff: StaffMember) {
  return {
    role: "staff",
    staff_slug: staff.slug,
    staffSlug: staff.slug,
    full_name: staff.name,
    name: staff.name,
  };
}

export function buildStaffLoginInviteRedirectTo(staffSlug: string) {
  return absoluteUrl(`/login?staff=${encodeURIComponent(staffSlug)}`);
}
