export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mild2wild.vercel.app").replace(/\/$/, "");

export const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Mild 2 Wild";
export const businessDescription =
  "A colorful tattoo, nail, hair, aesthetics, spa, and retail studio where guests can explore services, meet the team, and request appointments online.";

export const businessPhone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+14406547085";
export const businessPhoneDisplay = "(440) 654-7085";
export const businessEmail = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || undefined;
export const businessStreetAddress = process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS ?? "1139 Tower Blvd";
export const businessCity = process.env.NEXT_PUBLIC_BUSINESS_CITY ?? "Lorain";
export const businessRegion = process.env.NEXT_PUBLIC_BUSINESS_REGION ?? "OH";
export const businessPostalCode = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE ?? "44052";
export const businessCountry = process.env.NEXT_PUBLIC_BUSINESS_COUNTRY ?? "US";
export const businessLatitude = process.env.NEXT_PUBLIC_BUSINESS_LATITUDE;
export const businessLongitude = process.env.NEXT_PUBLIC_BUSINESS_LONGITUDE;

export const businessAddressDisplay = `${businessStreetAddress}, ${businessCity}, ${businessRegion} ${businessPostalCode}`;
export const regularBusinessHours = [
  { label: "Monday-Friday", value: "9:00 AM-6:00 PM" },
  { label: "Saturday", value: "10:00 AM-3:00 PM" },
];
export const holidayBusinessHours =
  "Closed New Year's Day, Christmas Eve, Christmas Day, Memorial Day, Labor Day, and Thanksgiving Day. New Year's Eve follows Saturday hours.";

export const socialProfileUrls = [
  process.env.NEXT_PUBLIC_FACEBOOK_URL,
  process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  process.env.NEXT_PUBLIC_TIKTOK_URL,
].filter(Boolean) as string[];

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageTitle(title: string) {
  return `${title} | ${businessName}`;
}

export function buildLocalBusinessJsonLd() {
  const address = businessStreetAddress || businessCity || businessRegion || businessPostalCode
    ? {
        "@type": "PostalAddress",
        streetAddress: businessStreetAddress,
        addressLocality: businessCity,
        addressRegion: businessRegion,
        postalCode: businessPostalCode,
        addressCountry: businessCountry,
      }
    : undefined;

  const geo = businessLatitude && businessLongitude
    ? {
        "@type": "GeoCoordinates",
        latitude: businessLatitude,
        longitude: businessLongitude,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "TattooParlor"],
    "@id": absoluteUrl("/#business"),
    name: businessName,
    url: siteUrl,
    image: absoluteUrl("/og-image.svg"),
    description: businessDescription,
    telephone: businessPhone,
    email: businessEmail,
    address,
    geo,
    sameAs: socialProfileUrls,
    areaServed: businessCity && businessRegion ? `${businessCity}, ${businessRegion}` : "Local salon, tattoo, and spa guests",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${businessName} services`,
      itemListElement: [
        "Tattoo consultations",
        "Flash tattoos",
        "Custom nail art",
        "Gel manicures",
        "Hair color",
        "Cuts and styling",
        "Facials",
        "Brow and lash services",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: absoluteUrl("/book"),
      name: "Request an appointment",
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: businessName,
    url: siteUrl,
    publisher: { "@id": absoluteUrl("/#business") },
  };
}
