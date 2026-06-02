export type ServiceCategorySlug = "nails" | "hair" | "tattoo" | "aesthetics";

export type ServiceCategory = {
  slug: ServiceCategorySlug;
  name: string;
  headline: string;
  description: string;
  accent: string;
  staffLabel: string;
};

export type StudioService = {
  slug: string;
  name: string;
  categorySlug: ServiceCategorySlug;
  durationMinutes: number;
  priceLabel: string;
  description: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type PortfolioImage = {
  src: string;
  alt: string;
  label: string;
};

export type StaffProfileTemplateId =
  | "recommended"
  | "tattoo-flash-wall"
  | "black-bone"
  | "crimson-ink"
  | "neon-street"
  | "pastel-pop"
  | "glossy-salon"
  | "spa-glow"
  | "rainbow-nails"
  | "dark-comic"
  | "clean-minimal"
  | "gold-luxe"
  | "lavender-aura";

export type StaffProfileColorSlot = "primary" | "secondary" | "accent" | "blush" | "soft" | "deep" | "shadow" | "glow" | "ink";

export type StaffProfileDecorId =
  | "classic-sparkles"
  | "skull-flash"
  | "ember-nebula"
  | "cherry-bomb"
  | "cosmic-aura"
  | "butterfly-glow"
  | "chrome-stars"
  | "botanical-vines"
  | "lightning-pop"
  | "moon-magic"
  | "drip-graffiti"
  | "halo-bubbles"
  | "ribbon-hearts"
  | "flash-daggers";

export type StaffProfilePortfolioStyleId =
  | "default-service"
  | "rainbow-outline"
  | "clean-cream"
  | "black-bone"
  | "tattoo-flash"
  | "glossy-salon"
  | "spa-glow"
  | "ghost-glow"
  | "bone-yard"
  | "moonlit-aura"
  | "chrome-pop";

export type StaffProfileTheme = {
  template: StaffProfileTemplateId;
  decor?: StaffProfileDecorId;
  portfolioStyle?: StaffProfilePortfolioStyleId;
  colors?: Partial<Record<StaffProfileColorSlot, string>>;
};

export type StaffMember = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  serviceCategorySlugs: ServiceCategorySlug[];
  serviceSlugs: string[];
  socialLinks: SocialLink[];
  gallery: string[];
  portfolioImages?: PortfolioImage[];
  profileTheme?: StaffProfileTheme;
  calendarColor: string;
  isMascot?: boolean;
};

export type DashboardScope = {
  role: "owner" | "staff";
  canManageAllCalendars: boolean;
  visibleStaffSlugs: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "nails",
    name: "Nails",
    headline: "Wild sets, clean care, and custom nail art.",
    description:
      "Bright acrylics, gel, fills, sculpted art, and detail-heavy sets from nail artists who live for color.",
    accent: "#F06BD6",
    staffLabel: "Nail artists",
  },
  {
    slug: "hair",
    name: "Hair",
    headline: "Color, cuts, styling, and big transformation energy.",
    description:
      "From polished salon services to bold color work, hair bookings route to stylists only.",
    accent: "#FFE45C",
    staffLabel: "Hair stylists",
  },
  {
    slug: "tattoo",
    name: "Tattoo",
    headline: "Custom ink, flash, consultations, and portfolio-driven artists.",
    description:
      "Tattoo inquiries show tattoo staff only, with portfolios and consultation-first booking flows.",
    accent: "#4DDCE5",
    staffLabel: "Tattoo artists",
  },
  {
    slug: "aesthetics",
    name: "Aesthetics & Spa",
    headline: "Spa, skincare, beauty treatments, and self-care rituals.",
    description:
      "Aesthetics and spa services connect visitors with the right licensed beauty professionals.",
    accent: "#A95CFF",
    staffLabel: "Aesthetics & spa staff",
  },
];

export const services: StudioService[] = [
  {
    slug: "acrylic-full-set",
    name: "Acrylic Full Set",
    categorySlug: "nails",
    durationMinutes: 90,
    priceLabel: "$60",
    description: "Full acrylic set. Gel polish is included at no extra cost.",
  },
  {
    slug: "acrylic-fill-in",
    name: "Acrylic Fill-In",
    categorySlug: "nails",
    durationMinutes: 75,
    priceLabel: "$50",
    description: "Acrylic fill-in service. Gel polish is included at no extra cost.",
  },
  {
    slug: "poly-gel-full-set",
    name: "Poly-Gel Full Set",
    categorySlug: "nails",
    durationMinutes: 90,
    priceLabel: "$70",
    description: "Poly-gel full set. Gel polish is included at no extra cost.",
  },
  {
    slug: "poly-gel-fill-in",
    name: "Poly-Gel Fill-In",
    categorySlug: "nails",
    durationMinutes: 75,
    priceLabel: "$60",
    description: "Poly-gel fill-in service. Gel polish is included at no extra cost.",
  },
  {
    slug: "gel-full-set",
    name: "Gel Full Set",
    categorySlug: "nails",
    durationMinutes: 90,
    priceLabel: "$70",
    description: "Gel full set with gel polish included at no extra cost.",
  },
  {
    slug: "gel-fill-in",
    name: "Gel Fill-In",
    categorySlug: "nails",
    durationMinutes: 75,
    priceLabel: "$60",
    description: "Gel fill-in service with gel polish included at no extra cost.",
  },
  {
    slug: "dip-powder",
    name: "Dip Powder",
    categorySlug: "nails",
    durationMinutes: 75,
    priceLabel: "$60",
    description: "Dip powder nail service with gel polish included at no extra cost.",
  },
  {
    slug: "dip-with-tips",
    name: "Dip With Tips",
    categorySlug: "nails",
    durationMinutes: 90,
    priceLabel: "$65",
    description: "Dip powder with tips. Gel polish is included at no extra cost.",
  },
  {
    slug: "manicure",
    name: "Manicure",
    categorySlug: "nails",
    durationMinutes: 45,
    priceLabel: "$30",
    description: "Natural nail manicure. Kids 10 and under can receive any natural nail service for $10 off.",
  },
  {
    slug: "deluxe-manicure",
    name: "Deluxe Manicure",
    categorySlug: "nails",
    durationMinutes: 60,
    priceLabel: "$50",
    description: "Deluxe manicure service. Kids 10 and under can receive any natural nail service for $10 off.",
  },
  {
    slug: "deluxe-pedicure",
    name: "Deluxe Pedicure",
    categorySlug: "nails",
    durationMinutes: 60,
    priceLabel: "$50",
    description: "A full pedicure with toe trimming, cuticle and callus removal, lotion massage, sugar scrub, hot towel, and gel polish.",
  },
  {
    slug: "jelly-pedicure",
    name: "Jelly Pedicure",
    categorySlug: "nails",
    durationMinutes: 75,
    priceLabel: "$65",
    description: "A full pedicure with warm jelly soak, hydrating jelly massage, sugar scrub, lotion massage, hot towel, and gel polish.",
  },
  {
    slug: "royal-pedicure",
    name: "Royal Pedicure",
    categorySlug: "nails",
    durationMinutes: 80,
    priceLabel: "$70",
    description: "A full pedicure with soak, mask, sugar scrub, lotion massage, hot towel, and gel polish.",
  },
  {
    slug: "ultimate-pedicure",
    name: "Ultimate Pedicure",
    categorySlug: "nails",
    durationMinutes: 90,
    priceLabel: "$80",
    description: "A full pedicure with soak, mask, sugar scrub, lotion massage, callus softener, hot towel, deep moisturizing treatment, hot stones, and gel polish.",
  },
  {
    slug: "kids-regular-polish",
    name: "Kids Regular Polish Add-On",
    categorySlug: "nails",
    durationMinutes: 15,
    priceLabel: "Free with adult service",
    description: "Children under 10 can get regular polish free with an adult service.",
  },
  {
    slug: "cut-with-wash",
    name: "Cut With Wash",
    categorySlug: "hair",
    durationMinutes: 45,
    priceLabel: "$35",
    description: "Haircut with wash.",
  },
  {
    slug: "cut-without-wash",
    name: "Cut Without Wash",
    categorySlug: "hair",
    durationMinutes: 30,
    priceLabel: "$20",
    description: "Haircut without wash.",
  },
  {
    slug: "buzz-cut",
    name: "Buzz Cut",
    categorySlug: "hair",
    durationMinutes: 20,
    priceLabel: "$10",
    description: "Buzz cut service.",
  },
  {
    slug: "bang-trim",
    name: "Bang Trim",
    categorySlug: "hair",
    durationMinutes: 15,
    priceLabel: "$5",
    description: "Bang trim service.",
  },
  {
    slug: "conditioning-treatment",
    name: "Conditioning Treatment",
    categorySlug: "hair",
    durationMinutes: 30,
    priceLabel: "$20",
    description: "Hair care treatment for extra conditioning and softness.",
  },
  {
    slug: "roller-set",
    name: "Roller Set",
    categorySlug: "hair",
    durationMinutes: 60,
    priceLabel: "$45",
    description: "Roller set styling service.",
  },
  {
    slug: "blowout",
    name: "Blowout",
    categorySlug: "hair",
    durationMinutes: 60,
    priceLabel: "$40",
    description: "Blowout service, wash included.",
  },
  {
    slug: "style",
    name: "Style",
    categorySlug: "hair",
    durationMinutes: 60,
    priceLabel: "$40",
    description: "Finished style service.",
  },
  {
    slug: "updo",
    name: "Updo",
    categorySlug: "hair",
    durationMinutes: 75,
    priceLabel: "$60",
    description: "Updo styling service.",
  },
  {
    slug: "spiral-perm",
    name: "Spiral Perm",
    categorySlug: "hair",
    durationMinutes: 180,
    priceLabel: "$80+",
    description: "Chemical or color service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "partial-perm",
    name: "Partial Perm",
    categorySlug: "hair",
    durationMinutes: 120,
    priceLabel: "$50",
    description: "Partial perm service.",
  },
  {
    slug: "full-color",
    name: "Full Color",
    categorySlug: "hair",
    durationMinutes: 150,
    priceLabel: "$80+",
    description: "Full color service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "full-highlights",
    name: "Full Highlights",
    categorySlug: "hair",
    durationMinutes: 180,
    priceLabel: "$120+",
    description: "Full highlight service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "balayage",
    name: "Balayage",
    categorySlug: "hair",
    durationMinutes: 210,
    priceLabel: "$200+",
    description: "Balayage color service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "money-piece",
    name: "Money Piece",
    categorySlug: "hair",
    durationMinutes: 90,
    priceLabel: "$40+",
    description: "Money piece color service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "partial-color",
    name: "Partial Color",
    categorySlug: "hair",
    durationMinutes: 120,
    priceLabel: "$50+",
    description: "Partial color service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "partial-highlights",
    name: "Partial Highlights",
    categorySlug: "hair",
    durationMinutes: 120,
    priceLabel: "$75+",
    description: "Partial highlight service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "root-touch-up",
    name: "Root Touch Up",
    categorySlug: "hair",
    durationMinutes: 90,
    priceLabel: "$60+",
    description: "Root touch up service; final pricing may vary by hair and appointment needs.",
  },
  {
    slug: "tattoo-consult",
    name: "Tattoo Consultation",
    categorySlug: "tattoo",
    durationMinutes: 30,
    priceLabel: "Consult first",
    description: "Start with a tattoo consultation so the artist can review the idea, placement, timing, and pricing with you.",
  },
  {
    slug: "flash-tattoo",
    name: "Flash Tattoo",
    categorySlug: "tattoo",
    durationMinutes: 120,
    priceLabel: "Quoted by artist",
    description: "Flash tattoo requests are reviewed by the artist so availability, sizing, placement, and pricing are clear before the appointment.",
  },
  {
    slug: "thirty-minute-facial",
    name: "30 Min Facial",
    categorySlug: "aesthetics",
    durationMinutes: 30,
    priceLabel: "$40.00",
    description: "A mini facial starting with cleansing, exfoliation, toner, and moisturizer.",
  },
  {
    slug: "back-facial",
    name: "Back Facial",
    categorySlug: "aesthetics",
    durationMinutes: 60,
    priceLabel: "$60.00",
    description: "A relaxing back facial that includes hot stones, double cleansing, extraction, exfoliation, massage, and more.",
  },
  {
    slug: "sixty-minute-facial",
    name: "60 Min Facial",
    categorySlug: "aesthetics",
    durationMinutes: 60,
    priceLabel: "$60.00",
    description: "A relaxing facial that includes double cleansing, extraction, exfoliation, massage, and more.",
  },
  {
    slug: "dermaplaning",
    name: "Dermaplaning",
    categorySlug: "aesthetics",
    durationMinutes: 45,
    priceLabel: "$75.00",
    description: "Exfoliates the skin's epidermis by removing dead skin cells and fine hairs.",
  },
  {
    slug: "hot-stone-massage",
    name: "Hot Stone Massage",
    categorySlug: "aesthetics",
    durationMinutes: 60,
    priceLabel: "$70.00",
    description: "One-hour hot stone massage.",
  },
  {
    slug: "full-leg-wax",
    name: "Full Leg Wax",
    categorySlug: "aesthetics",
    durationMinutes: 45,
    priceLabel: "$40.00",
    description: "Full leg waxing service.",
  },
  {
    slug: "brazilian-wax",
    name: "Brazilian Wax",
    categorySlug: "aesthetics",
    durationMinutes: 45,
    priceLabel: "$50.00",
    description: "Brazilian waxing service.",
  },
  {
    slug: "underarm-wax",
    name: "Underarm Wax",
    categorySlug: "aesthetics",
    durationMinutes: 20,
    priceLabel: "$20.00",
    description: "Underarm waxing service.",
  },
  {
    slug: "half-arm-wax",
    name: "Half Arm Wax",
    categorySlug: "aesthetics",
    durationMinutes: 30,
    priceLabel: "$25.00",
    description: "Half arm waxing service.",
  },
  {
    slug: "lip-chin-wax",
    name: "Lip/Chin Wax",
    categorySlug: "aesthetics",
    durationMinutes: 15,
    priceLabel: "$10.00",
    description: "Lip or chin waxing service.",
  },
  {
    slug: "brow-wax-shape",
    name: "Brow Wax & Shape",
    categorySlug: "aesthetics",
    durationMinutes: 20,
    priceLabel: "$20",
    description: "Brow wax and shape service.",
  },
  {
    slug: "brow-wax-tint",
    name: "Brow Wax & Tint",
    categorySlug: "aesthetics",
    durationMinutes: 30,
    priceLabel: "$30",
    description: "Brow wax and tint service.",
  },
  {
    slug: "brow-wax-lami",
    name: "Brow Wax & Lami",
    categorySlug: "aesthetics",
    durationMinutes: 45,
    priceLabel: "$50",
    description: "Brow wax and lamination service.",
  },
  {
    slug: "brow-wax-lami-tint",
    name: "Brow Wax, Lami, & Tint",
    categorySlug: "aesthetics",
    durationMinutes: 60,
    priceLabel: "$65",
    description: "Brow wax, lamination, and tint service.",
  },
  {
    slug: "lash-lift-tint",
    name: "Lash Lift & Tint",
    categorySlug: "aesthetics",
    durationMinutes: 60,
    priceLabel: "$60",
    description: "Lash lift and tint service.",
  },
  {
    slug: "lash-lift",
    name: "Lash Lift",
    categorySlug: "aesthetics",
    durationMinutes: 45,
    priceLabel: "$50",
    description: "Lash lift service.",
  },
  {
    slug: "classic-lash-set",
    name: "Classic Set",
    categorySlug: "aesthetics",
    durationMinutes: 120,
    priceLabel: "$70",
    description: "Classic lash extension set.",
  },
  {
    slug: "mixed-lash-set",
    name: "Mixed Set",
    categorySlug: "aesthetics",
    durationMinutes: 150,
    priceLabel: "$80",
    description: "Mixed lash extension set.",
  },
  {
    slug: "volume-lash-set",
    name: "Volume Set",
    categorySlug: "aesthetics",
    durationMinutes: 180,
    priceLabel: "$100",
    description: "Volume lash extension set.",
  },
  {
    slug: "air-brushed-brow-add-on",
    name: "Air Brushed Brow Add-On",
    categorySlug: "aesthetics",
    durationMinutes: 15,
    priceLabel: "+$10",
    description: "Add air brushed brow to any tint service.",
  },
];

const serviceSlugsByCategory: Record<ServiceCategorySlug, string[]> = {
  nails: [
    "acrylic-full-set",
    "acrylic-fill-in",
    "poly-gel-full-set",
    "poly-gel-fill-in",
    "gel-full-set",
    "gel-fill-in",
    "dip-powder",
    "dip-with-tips",
    "manicure",
    "deluxe-manicure",
    "deluxe-pedicure",
    "jelly-pedicure",
    "royal-pedicure",
    "ultimate-pedicure",
    "kids-regular-polish",
  ],
  hair: [
    "cut-with-wash",
    "cut-without-wash",
    "buzz-cut",
    "bang-trim",
    "conditioning-treatment",
    "roller-set",
    "blowout",
    "style",
    "updo",
    "spiral-perm",
    "partial-perm",
    "full-color",
    "full-highlights",
    "balayage",
    "money-piece",
    "partial-color",
    "partial-highlights",
    "root-touch-up",
  ],
  tattoo: ["tattoo-consult", "flash-tattoo"],
  aesthetics: [
    "thirty-minute-facial",
    "back-facial",
    "sixty-minute-facial",
    "dermaplaning",
    "hot-stone-massage",
    "full-leg-wax",
    "brazilian-wax",
    "underarm-wax",
    "half-arm-wax",
    "lip-chin-wax",
    "brow-wax-shape",
    "brow-wax-tint",
    "brow-wax-lami",
    "brow-wax-lami-tint",
    "lash-lift-tint",
    "lash-lift",
    "classic-lash-set",
    "mixed-lash-set",
    "volume-lash-set",
    "air-brushed-brow-add-on",
  ],
};

const categoryTitles: Record<ServiceCategorySlug, string> = {
  nails: "Nail Artist",
  hair: "Hair Stylist",
  tattoo: "Tattoo Artist",
  aesthetics: "Aesthetics & Spa Specialist",
};

const categoryBio: Record<ServiceCategorySlug, string> = {
  nails:
    "This nail artist offers color-forward sets, detailed nail art, and appointment options for guests who want a look that fits their style.",
  hair:
    "This stylist helps guests plan cuts, color, transformations, and finishing details that match their look and routine.",
  tattoo:
    "This tattoo artist is available for consultation-first projects, flash ideas, placement planning, and portfolio review.",
  aesthetics:
    "This beauty specialist supports spa, skincare, brow, lash, and self-care services with a calm client-first approach.",
};

const categoryGallery: Record<ServiceCategorySlug, string[]> = {
  nails: ["Custom sets", "Chrome details", "Hand-painted art"],
  hair: ["Color work", "Cuts & styling", "Event-ready finishes"],
  tattoo: ["Custom concepts", "Flash designs", "Consultation planning"],
  aesthetics: ["Skincare", "Brows & lashes", "Relaxing treatments"],
};

const publicStaffNames: Record<number, string> = {
  1: "Annika",
  2: "Juny",
  3: "Seven",
  4: "Akira",
  5: "Lia",
  6: "Serenity",
  7: "Von",
  8: "Veronica",
  9: "Laylay",
  10: "Surge",
  11: "Yoyo",
  13: "Caitlin",
  14: "Nani",
  15: "Anahi",
  16: "Zaylin",
  17: "Piper",
  18: "Sharvelle",
  19: "Mari",
  20: "Tim",
  21: "Alicia",
};

const categoryAccentRotation: Record<ServiceCategorySlug, string[]> = {
  nails: ["#F06BD6", "#FF5AB8", "#FF8BE8", "#B73CFF", "#FF7AC8"],
  hair: ["#FFE45C", "#FFB84D", "#E9FF63", "#F8D34E"],
  tattoo: ["#4DDCE5", "#30F2FF", "#7A6CFF", "#57FFD6"],
  aesthetics: ["#A95CFF", "#C66BFF", "#79D94D", "#8A5CFF"],
};

const mascotBio =
  "Schwebels is the Mild 2 Wild shop dog and official mascot — part of the studio personality, welcome energy, and brand moments without appearing as a bookable service provider.";

const serenityBio =
  "Hi! My name is Serenity, and I’m a nail tech at Mild2Wild. I attended the spa tech program at LCJVS during high school, and I’ve been licensed for about a year now. I absolutely love doing nail art — it’s definitely my favorite part of the job. I also really enjoy getting to know my clients and creating a fun, comfortable experience while they’re in my chair. My favorite colors are pink and burgundy, and outside of work I love spending time outdoors, enjoying the sunshine, and hanging out with my friends and family. I’m also obsessed with my dog, Twink, who’s a very spoiled chiweenie and basically my baby.";

const junyBio =
  "Hi I’m Juny! I was recently licensed in February and just graduated. I am an 18-year-old nail tech who is just in the beginning stages but a fast learner. I enjoy doing nails and hair, as those are my specialty skills and what I love to do. I plan on getting licensed for cosmetology to further my education in the beauty industry.";

const surgeBio =
  "I’m Surge, I’ve been an artist for as long as I can remember, and I’ve always loved bringing people’s ideas to life. Realism and capturing the small details others overlook have always been my passion. Throughout my life, people constantly told me I should do something with my art, but I never knew what that would be. I spent years working in factories and warehouses until a serious work injury changed everything. A herniated disc left me unable to do the heavy lifting and physical work I relied on to provide for my family. It was devastating, and I felt lost. While working as a waiter, several coworkers encouraged me to apply for a tattoo apprenticeship. Looking back, it felt like life was pushing me toward the path I was meant to take. Art had always been there — I just needed the push to pursue it. Today, tattooing allows me to combine my love for art with my passion for helping people. Whether it’s creating meaningful memorial pieces, covering scars, designing something unique, or simply helping someone feel more confident, I take pride in making every tattoo personal. For me, tattooing isn’t just artwork — it’s a way to connect with people and make a positive impact in their lives.";

const sharvelleBio =
  "Sharvelle is part of the Mild 2 Wild hair team, helping guests plan cuts, color, styling, and transformation appointments that fit their look and routine.";

const mariBio =
  "Mari is a tattoo artist at Mild 2 Wild. Guests can use her profile for consultation-first tattoo requests, flash questions, and appointment planning.";

const timBio =
  "Tim is part of the Mild 2 Wild team. Guests can contact the studio for current details about his availability and services.";

const aliciaBio =
  "Alicia is a nail artist at Mild 2 Wild. Guests can contact the studio for current details about her availability, nail services, and appointment options.";

const liaBio =
  "Hi! My name is Lia and I have been a licensed nail tech for almost 2 years. I love doing animal print, alternative, and Y2K designs. I’m a huge Hello Kitty lover and I love anime!";

const piperBio =
  "Hi, I’m Piper. I like anime and Hello Kitty, and I specialize in almond shape nails. I do Gel-X, acrylic, and manicures.";

const liaPortfolioImages: PortfolioImage[] = [
  {
    src: "/staff/lia/lia-nails-01.jpg",
    alt: "Lia nail art with soft pink French tips, white details, and small accent designs.",
    label: "Soft pink French details",
  },
  {
    src: "/staff/lia/lia-nails-02.jpg",
    alt: "Lia nail art with long black alternative nails, white line art, and dark graphic accents.",
    label: "Black alternative line art",
  },
  {
    src: "/staff/lia/lia-nails-03.jpg",
    alt: "Lia nail art with brown sculpted tips, white accent art, and sharp graphic lines.",
    label: "Brown graphic tips",
  },
  {
    src: "/staff/lia/lia-nails-04.jpg",
    alt: "Lia nail art with bright pink glossy nails and blue accent nails.",
    label: "Pink and blue gloss",
  },
  {
    src: "/staff/lia/lia-nails-05.jpg",
    alt: "Lia nail art with red, pink, and white mixed designs, gems, and decorative accents.",
    label: "Mixed pink accent set",
  },
  {
    src: "/staff/lia/lia-nails-06.jpg",
    alt: "Lia nail art with teal animal print tips, black striping, and rhinestone accents.",
    label: "Teal animal print",
  },
  {
    src: "/staff/lia/lia-nails-07.jpg",
    alt: "Lia nail art with white sculpted tips, glitter, and 3D bow details.",
    label: "White glitter bows",
  },
  {
    src: "/staff/lia/lia-nails-08.jpg",
    alt: "Lia nail art with hot pink and electric blue color-blocked nails.",
    label: "Pink blue color block",
  },
  {
    src: "/staff/lia/lia-nails-09.jpg",
    alt: "Lia nail art with pink, white, and black mixed designs, rhinestones, and 3D floral accents.",
    label: "Floral mixed design",
  },
  {
    src: "/staff/lia/lia-nails-10.jpg",
    alt: "Lia nail art with black, gold, and nude alternative details with metallic accents.",
    label: "Black gold alt details",
  },
];

const piperPortfolioImages: PortfolioImage[] = Array.from({ length: 12 }, (_, index) => {
  const displayIndex = String(index + 1).padStart(2, "0");
  return {
    src: `/staff/piper/piper-nails-${displayIndex}.jpg`,
    alt: `Piper nail art portfolio photo ${displayIndex} featuring acrylic, Gel-X, manicure, or almond-shape nail work.`,
    label: `Piper nail portfolio ${displayIndex}`,
  };
});

const serenityPortfolioImages: PortfolioImage[] = [
  {
    src: "/staff/serenity/serenity-nails-01.jpg",
    alt: "Serenity nail art with pink flowers, blue accents, and gold details.",
    label: "Floral color set",
  },
  {
    src: "/staff/serenity/serenity-nails-02.jpg",
    alt: "Serenity nail art with burgundy abstract French tips and gold accents.",
    label: "Burgundy abstract tips",
  },
  {
    src: "/staff/serenity/serenity-nails-03.jpg",
    alt: "Serenity nail art with a black-and-white horror accent nail and red splatter details.",
    label: "Horror accent set",
  },
  {
    src: "/staff/serenity/serenity-nails-04.jpg",
    alt: "Serenity nail art with white sculpted tips, gold charms, and rhinestone accents.",
    label: "White and gold charms",
  },
  {
    src: "/staff/serenity/serenity-nails-05.jpg",
    alt: "Serenity nail art with bright pink and orange swirl tips.",
    label: "Pink orange swirls",
  },
  {
    src: "/staff/serenity/serenity-nails-06.jpg",
    alt: "Serenity nail art with burgundy French tips, glitter, and gold accents.",
    label: "Burgundy glitter French",
  },
  {
    src: "/staff/serenity/serenity-nails-07.jpg",
    alt: "Serenity nail art with black and nude nails, gold chrome frames, and star charms.",
    label: "Gold chrome accents",
  },
  {
    src: "/staff/serenity/serenity-nails-08.jpg",
    alt: "Serenity nail art with white French tips, blue dots, and colorful painted flowers.",
    label: "Blue daisy French",
  },
  {
    src: "/staff/serenity/serenity-nails-09.jpg",
    alt: "Serenity nail art with red floral details, white tips, and gold star accents.",
    label: "Red flower set",
  },
  {
    src: "/staff/serenity/serenity-nails-10.jpg",
    alt: "Serenity nail art with turquoise French tips, white florals, and gold bead accents.",
    label: "Turquoise floral tips",
  },
  {
    src: "/staff/serenity/serenity-nails-11.jpg",
    alt: "Serenity nail art with royal blue charms, rhinestones, and long sculpted tips.",
    label: "Royal blue charms",
  },
];

const staffSeed: Array<{ index: number; categorySlug?: ServiceCategorySlug; isMascot?: boolean }> = [
  { index: 1, categorySlug: "nails" },
  { index: 2, categorySlug: "nails" },
  { index: 3, categorySlug: "tattoo" },
  { index: 4, categorySlug: "aesthetics" },
  { index: 5, categorySlug: "nails" },
  { index: 6, categorySlug: "nails" },
  { index: 7, categorySlug: "tattoo" },
  { index: 8, categorySlug: "hair" },
  { index: 9, categorySlug: "hair" },
  { index: 10, categorySlug: "tattoo" },
  { index: 11, categorySlug: "hair" },
  { index: 12, isMascot: true },
  { index: 13, categorySlug: "nails" },
  { index: 14, categorySlug: "nails" },
  { index: 15, categorySlug: "nails" },
  { index: 16, categorySlug: "nails" },
  { index: 17, categorySlug: "nails" },
  { index: 18, categorySlug: "hair" },
  { index: 19, categorySlug: "tattoo" },
  { index: 20 },
  { index: 21, categorySlug: "nails" },
];

export const staffMembers: StaffMember[] = staffSeed.map(({ index, categorySlug, isMascot }) => {
  const paddedIndex = String(index).padStart(2, "0");
  const categoryIndex = categorySlug
    ? staffSeed.filter((staff) => staff.categorySlug === categorySlug && staff.index <= index).length - 1
    : 0;
  const colors = categorySlug ? categoryAccentRotation[categorySlug] : ["#4DDCE5"];
  const isPendingRole = !categorySlug && !isMascot;
  const isLia = index === 5;
  const isJuny = index === 2;
  const isSerenity = index === 6;
  const isPiper = index === 17;
  const isSurge = index === 10;
  const isSharvelle = index === 18;
  const isMari = index === 19;
  const isTim = index === 20;
  const isAlicia = index === 21;

  return {
    slug: `team-member-${paddedIndex}`,
    name: isMascot
      ? "Schwebels"
      : (publicStaffNames[index] ?? (categorySlug ? `${categoryTitles[categorySlug]} ${paddedIndex}` : `Team Member ${paddedIndex}`)),
    title: isMascot ? "Mascot" : isPendingRole ? "Team Member" : categoryTitles[categorySlug as ServiceCategorySlug],
    bio: isMascot
      ? mascotBio
      : isLia
        ? liaBio
        : isJuny
          ? junyBio
          : isSerenity
            ? serenityBio
            : isPiper
              ? piperBio
              : isSurge
              ? surgeBio
              : isSharvelle
                ? sharvelleBio
                : isMari
                  ? mariBio
                  : isTim
                    ? timBio
                    : isAlicia
                      ? aliciaBio
                      : categorySlug
                        ? categoryBio[categorySlug]
                        : "Contact the studio for current availability and service details for this team member.",
    photoUrl: `/staff/team-member-${paddedIndex}.jpg`,
    serviceCategorySlugs: categorySlug ? [categorySlug] : [],
    serviceSlugs: categorySlug ? serviceSlugsByCategory[categorySlug] : [],
    socialLinks: isMascot
      ? [
          { label: "Friendship APL", href: "https://friendshipapl.org" },
          { label: "View portfolio", href: "#portfolio" },
        ]
      : [{ label: "View portfolio", href: "#portfolio" }],
    gallery: isMascot
      ? ["Shop dog mascot", "Schwebels story", "Tour-page cameo"]
      : isLia
        ? ["Animal print", "Alternative nails", "Y2K designs"]
        : isJuny
          ? ["Nail care", "Hair creativity", "Fast-learning beauty skills"]
        : isSerenity
          ? ["Nail art", "Pink and burgundy tones", "Comfortable client experience"]
        : isPiper
          ? ["Anime", "Hello Kitty", "Almond shape nails"]
        : isSurge
          ? ["Realism", "Fine details", "Personal meaningful pieces"]
        : isMari
          ? ["Tattoo artist", "Consultation-first requests", "Flash and custom ideas"]
        : isTim
          ? ["Mild 2 Wild team", "Studio availability", "Service questions"]
          : categorySlug
            ? categoryGallery[categorySlug]
            : ["Mild 2 Wild team", "Studio availability", "Service questions"],
    portfolioImages: isLia ? liaPortfolioImages : isPiper ? piperPortfolioImages : isSerenity ? serenityPortfolioImages : undefined,
    calendarColor: isJuny
      ? "#FF3131"
      : isSurge
        ? "#E23B16"
        : isSharvelle
          ? "#FF4FB3"
          : isMari
            ? "#00C8D8"
            : isTim
              ? "#9ADFEA"
              : colors[categoryIndex % colors.length],
    isMascot,
  };
});

export const productHighlights = [
  "Aftercare kits",
  "Cuticle oils",
  "Salon shampoos",
  "Spa skincare",
  "Gift cards",
];

export function compareStaffByName(left: Pick<StaffMember, "name" | "slug">, right: Pick<StaffMember, "name" | "slug">) {
  return left.name.localeCompare(right.name, undefined, { sensitivity: "base" }) || left.slug.localeCompare(right.slug);
}

export function sortStaffByName<T extends Pick<StaffMember, "name" | "slug">>(members: T[]): T[] {
  return [...members].sort(compareStaffByName);
}

export function getServiceCategoryBySlug(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

export function getServicesForCategory(slug: ServiceCategorySlug) {
  return services.filter((service) => service.categorySlug === slug);
}

export function getFeaturedStaffForCategory(slug: ServiceCategorySlug) {
  return sortStaffByName(staffMembers.filter((staff) => staff.serviceCategorySlugs.includes(slug)));
}

export function getStaffForService(serviceSlug: string) {
  return sortStaffByName(staffMembers.filter((staff) => staff.serviceSlugs.includes(serviceSlug)));
}

export function getStaffBySlug(slug: string) {
  return staffMembers.find((staff) => staff.slug === slug);
}

export function getStaffDashboardScope(role: "owner" | "staff", staffSlug?: string): DashboardScope {
  if (role === "owner") {
    return {
      role,
      canManageAllCalendars: true,
      visibleStaffSlugs: staffMembers.map((staff) => staff.slug),
    };
  }

  return {
    role,
    canManageAllCalendars: false,
    visibleStaffSlugs: staffSlug ? [staffSlug] : [],
  };
}
