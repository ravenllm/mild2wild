import { describe, expect, it } from "vitest";
import {
  buildLocalBusinessJsonLd,
  businessAddressDisplay,
  businessPhone,
  businessPhoneDisplay,
  holidayBusinessHours,
  regularBusinessHours,
} from "../src/lib/seo";

describe("Mild 2 Wild public business info", () => {
  it("uses the confirmed public contact details for visible surfaces", () => {
    expect(businessPhone).toBe("+14406547085");
    expect(businessPhoneDisplay).toBe("(440) 654-7085");
    expect(businessAddressDisplay).toBe("1139 Tower Blvd, Lorain, OH 44052");
    expect(regularBusinessHours).toEqual([
      { label: "Monday-Friday", value: "9:00 AM-6:00 PM" },
      { label: "Saturday", value: "10:00 AM-3:00 PM" },
    ]);
    expect(holidayBusinessHours).toContain("New Year's Day");
    expect(holidayBusinessHours).toContain("Christmas Eve");
    expect(holidayBusinessHours).toContain("Christmas Day");
    expect(holidayBusinessHours).toContain("Memorial Day");
    expect(holidayBusinessHours).toContain("Labor Day");
    expect(holidayBusinessHours).toContain("Thanksgiving Day");
    expect(holidayBusinessHours).toContain("New Year's Eve follows Saturday hours");
  });

  it("publishes phone, address, and regular hours in LocalBusiness JSON-LD without an email", () => {
    const jsonLd = buildLocalBusinessJsonLd();

    expect(jsonLd.telephone).toBe("+14406547085");
    expect(jsonLd.email).toBeUndefined();
    expect(jsonLd.address).toMatchObject({
      "@type": "PostalAddress",
      streetAddress: "1139 Tower Blvd",
      addressLocality: "Lorain",
      addressRegion: "OH",
      postalCode: "44052",
      addressCountry: "US",
    });
    expect(jsonLd.openingHoursSpecification).toEqual([
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
    ]);
  });
});
