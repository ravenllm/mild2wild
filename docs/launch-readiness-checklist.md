# Mild 2 Wild launch readiness checklist

Updated: 2026-06-02

## Current status

The current Vercel site is in a client-review / pre-launch state. The website is live on the temporary Vercel URL and the core public flows are working. Final launch is mainly gated by owner-approved business details, final content, and the final domain.

Temporary review URL:

- https://mild2wild.vercel.app

## QA pass completed

Automated checks:

- `npm run check` passed.
- `npm run security:audit` passed with `found 0 vulnerabilities`.

Production route checks returned HTTP 200 for:

- `/`
- `/staff`
- `/staff/team-member-05`
- `/staff/team-member-10`
- `/staff/team-member-14`
- `/staff/team-member-17`
- `/staff/team-member-20`
- `/book`
- `/book?staff=team-member-17`
- `/services/nails`
- `/services/tattoo`
- `/services/hair`
- `/services/aesthetics`
- `/products`
- `/tour`
- `/dog-clicker`
- `/legal`
- `/login`
- `/robots.txt`
- `/sitemap.xml`

Protected route checks while logged out:

- `/dashboard` redirects to `/login`.
- `/dashboard/calendar/team-member-14` redirects to `/login`.
- `/dashboard/staff/team-member-14/edit` redirects to `/login`.

Booking/API safety checks:

- Empty booking request returns HTTP 400 with validation errors.
- Fake service slug returns HTTP 400.
- Incompatible staff/service pair returns HTTP 400.
- No live valid booking record was created during this QA pass.

Public copy scan:

- No customer-facing placeholder hits found for: `Coming soon`, `Instagram coming soon`, `Bio coming soon`, `role coming soon`, `menu pending`, `details pending`, `still being collected`, `Moxie Mani`, `Team Member 14`, or `Team Member 17` on checked production routes.
- Nani appears on `/staff` and `/staff/team-member-14`; Moxie Mani does not.
- Piper appears on `/staff` and `/staff/team-member-17`; Team Member 17 placeholder does not.

Browser checks:

- Desktop browser checks showed no page console errors on checked routes.
- `/staff` showed Schwebels, Nani, Piper, and the current staff list correctly.
- `/book?staff=team-member-17` preselected Piper as a nail artist with a compatible nail service.
- Piper portfolio images loaded and rendered without visible `figcaption` caption bands.
- Mobile screenshots at 390px were captured for `/`, `/staff`, `/book`, and `/staff/team-member-17`; header Login and Book Now stayed visible and no obvious severe clipping/layout breakage was visible in the captured top-of-page checks.

SEO/domain plumbing:

- `robots.txt` is live and disallows private/dashboard/API/login routes.
- `sitemap.xml` is live and includes 31 public URLs.
- Current canonical/sitemap URL still uses the temporary Vercel domain until the final domain is chosen and connected.

## Still needed from client before final launch

### Business basics

- Official public business name exactly as it should appear.
- Public phone number.
- Public email address.
- Street address, city, state, ZIP.
- Public hours by day.
- Holiday/seasonal hour notes, if any.
- Preferred customer contact method: call, text, email, booking form, or social DM.

### Domain and accounts

- Final domain choice.
- Who will buy/manage the domain: client account, Tyler/Liminull, or another registrar account.
- Google Business Profile access or owner handoff plan.
- Google Search Console owner access after the final domain is connected.

### Staff content

For every staff member who should appear publicly:

- Final display name.
- Final role/title.
- Short bio, or approval to keep generic safe bio text.
- Exact services each person should offer.
- Portfolio/gallery images.
- Public social links, if any.
- Whether customers can request that person directly.
- Whether that person needs dashboard login access.

Specific items to confirm from current site:

- Tim is currently shown as a general team member with neutral service/contact wording. Confirm his final role, services, and whether he should be bookable.
- Any remaining generic nail/hair/tattoo/spa bios should be replaced with staff-approved bios when the client has them.
- Any missing portfolio galleries can stay as clean placeholders, but final portfolio photos are needed before a fully polished staff launch.

### Services and pricing

- Final service list by category: Nails, Hair, Tattoo, Aesthetics & Spa.
- Final price or price-range wording.
- Final durations.
- Deposit requirements.
- Consultation requirements.
- Which staff can perform each service.
- Any service-specific prep or aftercare instructions.
- Any services that should be hidden, call-only, or request-only.

### Policies/legal

- Cancellation/no-show policy.
- Late arrival policy.
- Deposit/refund rules.
- Tattoo age, ID, minor/guardian, and consent requirements.
- Tattoo touch-up/aftercare policy.
- Health/allergy/disclosure language for salon/spa services.
- Product return/exchange policy.
- Privacy/communications language for booking requests.

### Products/retail

- Product categories to show.
- Product names/photos/prices, if they want specific products listed.
- Whether products are showcase-only, pickup/in-studio, gift cards, or future ecommerce.
- Final gift card availability wording.

### Tour/about/community

- Approved shop photos or tour video.
- Shop story/about copy.
- Founder/owner story, if desired.
- Accessibility/parking notes.
- Community/charity involvement, if any.

## Final launch steps after client info is confirmed

1. Update website content with final approved business/staff/service/policy info.
2. Re-run full local checks: `npm run check` and `npm run security:audit`.
3. Commit/push any final source changes.
4. Connect the final domain to Vercel.
5. Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain in Vercel.
6. Redeploy production.
7. Verify canonical production routes on the final domain:
   - `/`
   - `/book`
   - `/staff`
   - representative staff profile
   - representative service page
   - `/products`
   - `/tour`
   - `/legal`
   - `/login`
8. Verify `/robots.txt` and `/sitemap.xml` use the final domain.
9. Submit sitemap in Google Search Console.
10. Verify Google Business Profile website link, NAP consistency, hours, services, and photos.
11. Submit one clearly marked QA booking request only if approved, verify routing in dashboard, then delete it and confirm cleanup.
12. Send client the final review link and a short acceptance checklist.

## Client-ready message Tyler can send

The website is ready for a final content review. The core pages are live, staff names are showing correctly, the booking request flow is working, and the protected dashboard routes are guarded behind login.

Before we connect the final domain and prepare Google setup, I need the last owner-approved details: final phone/email/address/hours, final staff bios/services/portfolio photos, final service pricing and policies, product/gift card wording, and the domain choice.

Once those are confirmed, the next step is final content entry, domain connection, Search Console/Google Business Profile setup, and one last live booking/dashboard verification pass.
