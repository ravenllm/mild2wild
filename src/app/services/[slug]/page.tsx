import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, PaintSplat, SectionEyebrow, StaffCard } from "@/components/site";
import {
  getServiceCategoryBySlug,
  getServicesForCategory,
  serviceCategories,
  sortStaffByName,
  staffMembers,
  type ServiceCategorySlug,
} from "@/lib/studio-data";
import { readStoredStaffMembers } from "@/lib/staff-profile-overrides";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return serviceCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);
  if (!category) return { title: "Service Not Found", robots: { index: false, follow: false } };

  return {
    title: `${category.name} Services`,
    description: `${category.headline} ${category.description}`,
    alternates: { canonical: `/services/${category.slug}` },
    openGraph: {
      title: `${category.name} Services | Mild 2 Wild`,
      description: category.description,
      url: `/services/${category.slug}`,
    },
  };
}

const serviceMenuAccents = ["#ffcae6", "#c7f2ff", "#fff0a3", "#d9ffb8", "#d5c4ff", "#ffd7a8"];
const serviceMenuMarks = ["✦", "✧", "★", "✸", "✿", "✹"];

export default async function ServiceCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getServiceCategoryBySlug(slug);

  if (!category) {
    return (
      <PageShell>
        <section className="mx-auto max-w-4xl px-5 py-24">
          <h1 className="brand-display text-5xl font-black uppercase">Service not found</h1>
          <Link href="/" className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-black uppercase text-black">
            Back home
          </Link>
        </section>
      </PageShell>
    );
  }

  const services = getServicesForCategory(category.slug as ServiceCategorySlug);
  const staff = sortStaffByName(
    (await readStoredStaffMembers(staffMembers)).filter((member) => member.serviceCategorySlugs.includes(category.slug as ServiceCategorySlug)),
  );

  return (
    <PageShell>
      <section className="mx-auto min-w-0 max-w-7xl overflow-hidden px-4 py-12 sm:px-5 md:py-16">
        <div className="neon-card rounded-[2rem] p-5 sm:rounded-[3rem] sm:p-8 md:p-12" style={{ boxShadow: `0 0 80px ${category.accent}22` }}>
          <SectionEyebrow color={category.accent}>{category.name}</SectionEyebrow>
          <h1 className="brand-display max-w-5xl break-words text-4xl font-black uppercase sm:text-5xl md:text-7xl">{category.headline}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">{category.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-block max-w-full rounded-full px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-black sm:px-7 sm:tracking-[0.2em]"
              style={{ background: category.accent }}
            >
              Book {category.name}
            </Link>
            <a href="#service-staff" className="inline-block max-w-full rounded-full border border-black/15 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-black/72 sm:px-7 sm:tracking-[0.2em]">
              Meet the right staff
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid min-w-0 max-w-7xl gap-8 overflow-hidden px-5 py-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="min-w-0">
          <SectionEyebrow color={category.accent}>Services</SectionEyebrow>
          <div className="space-y-4">
            {services.map((service, index) => {
              const serviceStaff = staff.filter((member) => member.serviceSlugs.includes(service.slug));
              const cardAccent = serviceMenuAccents[index % serviceMenuAccents.length];
              const cardMark = serviceMenuMarks[index % serviceMenuMarks.length];
              const tilt = index % 2 === 0 ? "lg:-rotate-[0.35deg]" : "lg:rotate-[0.35deg]";
              return (
                <article
                  key={service.slug}
                  className={`neon-card group relative min-w-0 max-w-full overflow-hidden rounded-[1.8rem] p-5 transition duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-6 ${tilt}`}
                  style={{
                    background: `linear-gradient(145deg, rgba(255, 253, 245, 0.94), ${cardAccent}66), radial-gradient(circle at 92% 12%, ${category.accent}3d, transparent 8rem)`,
                    boxShadow: `7px 8px 0 #17130f, 0 0 0 7px ${cardAccent}88, 0 24px 54px rgba(40, 26, 20, 0.16)`,
                  }}
                >
                  <PaintSplat color={category.accent} variant="bubble" className="pointer-events-none absolute -right-12 -top-12 w-32 rotate-12 opacity-25 transition group-hover:scale-110" />
                  <div className="relative z-10 flex min-w-0 flex-wrap items-start justify-between gap-4 sm:flex-nowrap sm:gap-5">
                    <div className="min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="service-sticker rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]" style={{ background: cardAccent }}>
                          {cardMark} Menu #{String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full border-2 border-black bg-white/75 px-3 py-1 text-xs font-black text-black/70 shadow-[2px_3px_0_#17130f]">
                          {service.durationMinutes}m
                        </span>
                      </div>
                      <h2 className="brand-display break-words text-3xl font-black uppercase text-black sm:text-[2rem]">{service.name}</h2>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-black/66 sm:text-base">{service.description}</p>
                    </div>
                    <div
                      className="service-sticker shrink-0 rotate-2 rounded-[1.2rem] px-4 py-3 text-center text-lg font-black text-black transition group-hover:-rotate-2 sm:text-xl"
                      style={{ background: category.accent }}
                    >
                      {service.priceLabel}
                    </div>
                  </div>
                  <div className="relative z-10 mt-5 min-w-0 rounded-[1.25rem] border-2 border-black/80 bg-white/55 p-4 shadow-[3px_4px_0_#17130f]">
                    <p className="marker-script text-base uppercase tracking-[0.05em] text-black">Available with</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {serviceStaff.map((member) => (
                        <Link
                          key={member.slug}
                          href={`/staff/${member.slug}`}
                          className="rounded-full border-2 border-black/75 bg-white/80 px-3 py-2 text-xs font-black text-black/72 shadow-[2px_3px_0_#17130f] transition hover:-translate-y-0.5 hover:bg-pink-100 hover:text-black"
                        >
                          {member.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div id="service-staff" className="min-w-0">
          <SectionEyebrow color={category.accent}>{category.staffLabel}</SectionEyebrow>
          <p className="mb-5 text-white/60">
            Each profile below is connected to this service category so guests can compare style, specialties, and fit before requesting an appointment.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {staff.map((member) => (
              <StaffCard key={member.slug} staff={member} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
