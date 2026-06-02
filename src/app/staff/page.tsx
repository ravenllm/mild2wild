import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell, SectionEyebrow, StaffCard } from "@/components/site";
import { serviceCategories, sortStaffByName, staffMembers } from "@/lib/studio-data";
import { readStoredStaffMembers } from "@/lib/staff-profile-overrides";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Meet the Mild 2 Wild artists, stylists, nail techs, tattoo artists, aesthetics specialists, and shop mascot before requesting an appointment.",
  alternates: { canonical: "/staff" },
  openGraph: {
    title: "Meet the Team | Mild 2 Wild",
    description: "Explore Mild 2 Wild staff profiles by service category and request an appointment with the right team member.",
    url: "/staff",
  },
};

export default async function StaffIndexPage() {
  const mergedStaffMembers = await readStoredStaffMembers(staffMembers);
  const mascotProfile = mergedStaffMembers.find((staff) => staff.isMascot);
  const employeeProfiles = sortStaffByName(mergedStaffMembers.filter((staff) => !staff.isMascot));

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-5 md:py-16">
        <SectionEyebrow color="#F06BD6">Meet the crew</SectionEyebrow>
        <h1 className="brand-display max-w-4xl text-3xl font-black uppercase sm:text-5xl md:text-7xl">Meet the artists, stylists, and specialists.</h1>
        <p className="mt-6 max-w-3xl text-lg text-white/65">
          Explore the team by service category, view individual profiles, and choose who feels like the right fit for your next appointment.
        </p>

        {mascotProfile ? (
          <Link
            href={`/staff/${mascotProfile.slug}`}
            className="neon-card group mt-8 grid overflow-hidden rounded-[2rem] p-4 transition duration-300 hover:-translate-y-1 md:max-w-4xl md:grid-cols-[15rem_1fr] md:items-center md:gap-5 lg:max-w-5xl lg:grid-cols-[17rem_1fr]"
            style={{ boxShadow: `7px 8px 0 #17130f, 0 0 0 7px ${mascotProfile.calendarColor}3f, 0 24px 54px rgba(40, 26, 20, 0.18)` }}
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.4rem] border-[3px] border-black bg-black md:aspect-[4/3]">
              <Image
                src={mascotProfile.photoUrl}
                alt={`${mascotProfile.name} profile photo`}
                fill
                sizes="(min-width: 1024px) 17rem, (min-width: 768px) 15rem, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/35 to-transparent"
                style={{ boxShadow: `inset 0 -35px 55px ${mascotProfile.calendarColor}20` }}
              />
              <span
                className="absolute left-4 top-4 rounded-full border-2 border-black px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] text-black shadow-[3px_4px_0_#17130f]"
                style={{ background: mascotProfile.calendarColor }}
              >
                Mascot
              </span>
            </div>
            <div className="relative z-10 mt-5 md:mt-0">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/45">{mascotProfile.title}</p>
              <h3 className="brand-display mt-2 text-3xl uppercase text-black group-hover:text-pink-500 sm:text-4xl">
                {mascotProfile.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-black/65 md:text-base md:leading-7">{mascotProfile.bio}</p>
              <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-black">
                View profile →
              </p>
            </div>
          </Link>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {serviceCategories.map((category) => {
            const count = mergedStaffMembers.filter((staff) => staff.serviceCategorySlugs.includes(category.slug)).length;
            return (
              <Link
                key={category.slug}
                href={`/services/${category.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-white/70 transition hover:text-black sm:px-4 sm:text-xs sm:tracking-[0.18em]"
                style={{ borderColor: `${category.accent}55` }}
              >
                <span style={{ color: category.accent }}>{count}</span>
                <span>{category.staffLabel}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {employeeProfiles.map((staff) => <StaffCard key={staff.slug} staff={staff} />)}
        </div>
      </section>
    </PageShell>
  );
}
