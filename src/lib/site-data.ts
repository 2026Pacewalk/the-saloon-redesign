import courseMehndi from "@/assets/course-mehndi.jpg";
import svcFacial from "@/assets/svc-facial.jpg";
import svcHairColor from "@/assets/svc-hair-color.jpg";
import svcBeautyCare from "@/assets/svc-beauty-care.jpg";
// Central content + structure for the 1st Lady Hair & Beauty Salon site.
// Slugs mirror the original WordPress site for SEO continuity.

// Service imagery
import imgHairStyling from "@/assets/svc-hair-styling.jpg";
import imgShortHair from "@/assets/svc-short-hair.jpg";
import imgLongHair from "@/assets/svc-long-hair.jpg";
import imgUpdo from "@/assets/svc-updo.jpg";
import imgBridal from "@/assets/svc-bridal.jpg";
import imgDayMakeup from "@/assets/svc-day-makeup.jpg";
import imgEveningMakeup from "@/assets/svc-evening-makeup.jpg";
import imgMakeupLesson from "@/assets/svc-makeup-lesson.jpg";
import imgEyelashes from "@/assets/svc-eyelashes.jpg";
import imgFilePolish from "@/assets/svc-file-polish.jpg";
import imgManiPedi from "@/assets/svc-mani-pedi.jpg";
import imgShellac from "@/assets/svc-shellac.jpg";
import imgCuticle from "@/assets/svc-cuticle.jpg";
import imgExtensions from "@/assets/svc-extensions.jpg";
import imgAroma from "@/assets/svc-aroma-massage.jpg";
import imgStone from "@/assets/svc-stone-therapy.jpg";
import imgOzone from "@/assets/svc-ozone.jpg";
import imgHoney from "@/assets/svc-honey-wrap.jpg";
import imgBrowTint from "@/assets/svc-brow-tint.jpg";
import imgLashTint from "@/assets/svc-lash-tint.jpg";
import imgWaxing from "@/assets/svc-waxing.jpg";
import imgSugaring from "@/assets/svc-sugaring.jpg";
import imgElectrolysis from "@/assets/svc-electrolysis.jpg";
import imgIpl from "@/assets/svc-ipl.jpg";

export type NavChild = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavChild[] };

export const CONTACT = {
  name: "1st Lady Hair & Beauty Salon",
  phone: "+91 95015 04300",
  phoneHref: "tel:+919501504300",
  whatsapp: "+91 95015 04300",
  email: "info@1stladysaloon.com",
  address:
    "Near Gagi Tailor, Old Post Office Street, Bagha Purana, District Moga 142038 (PB)",
  hours: "Monday – Sunday · 9:00 AM – 8:00 PM",
  mapShort: "Bagha Purana, Moga",
  mapLink: "https://maps.app.goo.gl/Zz7Jm2kRhofzrG3u5",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.0656505650295!2d75.0955785!3d30.688428899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3910a93cb5214fdf%3A0x7a44e76fc9b68e1d!2s1st%20Lady%20Hair%20%26%20Beauty%20Salon!5e0!3m2!1sen!2sin!4v1786010552842!5m2!1sen!2sin",
};

export const SOCIAL = {
  facebook: "https://www.facebook.com/1stladysaloon/",
  whatsapp: "https://wa.me/919501504300",
  email: "mailto:info@1stladysaloon.com",
};

// ---- Google reviews ---------------------------------------------------------
// Live rating shown on Google Maps. `writeReview` opens the place so guests can
// leave a review; `readReviews` opens all reviews.
export const GOOGLE = {
  rating: 4.9,
  count: 48,
  writeReview: "https://maps.app.goo.gl/Zz7Jm2kRhofzrG3u5",
  readReviews: "https://maps.app.goo.gl/Zz7Jm2kRhofzrG3u5",
};

export type Review = { name: string; when: string; text: string; tag?: string };

// Real, verified 5-star reviews from Google. Add more here as they come in.
export const REVIEWS: Review[] = [
  {
    name: "Harshita Goyal",
    when: "2 months ago",
    tag: "Academy",
    text:
      "Learning salon skills has been an amazing experience. I'm gaining confidence in makeup, hair styling, skincare, and professional beauty techniques every day. The course is creative, practical, and very helpful for building a successful future in the beauty industry.",
  },
  {
    name: "Priya",
    when: "2 months ago",
    tag: "Academy",
    text:
      "The salon course was a great learning experience for me. The trainers were supportive and taught every technique in a practical way. I gained confidence in makeup, hairstyling, and skincare through hands-on practice.",
  },
  {
    name: "Unique Bajaj",
    when: "2 years ago",
    tag: "Local Guide",
    text:
      "1st Lady Hair & Beauty Salon in Baghapurana is undoubtedly the best beauty parlour in town. Their exceptional service and expertise in the beauty industry make them a top choice for anyone seeking beauty treatments. The staff is highly professional.",
  },
  {
    name: "Balwinder Kaur",
    when: "2 years ago",
    tag: "Ladies Salon",
    text:
      "Best ladies salon in our city Bagha Purana. Friendly staff and excellent services provided by them. Jyoti Sharma mam is one of the best make-up artists in our area.",
  },
  {
    name: "Sukhdeep Saggu",
    when: "2 years ago",
    tag: "Beauty Parlour",
    text:
      "Step into the world of glamour and luxury at the top beauty parlour. Indulge yourself in a world of elegance, sophistication and pampering. Discover your true beauty at the best beauty salon in town — your journey to radiance begins here.",
  },
  {
    name: "Atma Hans",
    when: "2 years ago",
    tag: "Ladies Salon",
    text:
      "Best ladies saloon in our town Bagha Purana. Today I visited here and after renovation now it's looking so beautiful. Highly recommended.",
  },
  {
    name: "Ekta",
    when: "1 year ago",
    tag: "Skincare",
    text:
      "Best salon in Bagha Purana. Their service is very nice and I like it so much. Highly recommend to everyone.",
  },
];

// ---- Services (24) — slugs preserved from WordPress ------------------------
export type Service = {
  slug: string;
  title: string;
  group: "Hair" | "Make-up" | "Nails" | "Skin & Spa" | "Hair Removal";
  blurb: string;
  img: string;
};

export const SERVICES: Service[] = [
  { slug: "professional-makeup", title: "Haircut & Style", group: "Hair", blurb: "Precision cuts, blow-dry and styling tailored to your face shape and hair type." , img: imgHairStyling },
  { slug: "short-hair-style", title: "Short Hair Style", group: "Hair", blurb: "Chic, easy-to-maintain short styles finished with a polished shape." , img: imgShortHair },
  { slug: "sexy-candlelit-eyes", title: "Long Hair Style", group: "Hair", blurb: "Soft waves, sleek blow-outs and elegant looks for long hair." , img: imgLongHair },
  { slug: "up-doevening-style", title: "Updo / Evening Style", group: "Hair", blurb: "Sculpted updos and evening styling for parties and special occasions." , img: imgUpdo },
  { slug: "brides-make-up", title: "Bride's Make-up", group: "Make-up", blurb: "Complete bridal make-over with long-lasting, camera-ready finish." , img: imgBridal },
  { slug: "daytime-make-up", title: "Daytime Make-up", group: "Make-up", blurb: "Fresh, natural daytime looks that let your features shine." , img: imgDayMakeup },
  { slug: "evening-make-up", title: "Evening Make-up", group: "Make-up", blurb: "Glamorous evening make-up with defined eyes and flawless base." , img: imgEveningMakeup },
  { slug: "make-up-lesson", title: "Make-up Lesson", group: "Make-up", blurb: "One-on-one lessons to master your everyday and party make-up." , img: imgMakeupLesson },
  { slug: "creative-eyelashes", title: "Creative Eyelashes", group: "Make-up", blurb: "Lash extensions and creative lash work for a striking eye." , img: imgEyelashes },
  { slug: "file-and-polish", title: "File and Polish", group: "Nails", blurb: "Quick nail shaping and a glossy polish finish." , img: imgFilePolish },
  { slug: "mini-mani-pedi", title: "Mini Mani-Pedi", group: "Nails", blurb: "Express manicure and pedicure to refresh hands and feet." , img: imgManiPedi },
  { slug: "shellac-coating", title: "Shellac Coating", group: "Nails", blurb: "Long-lasting, high-shine shellac gel coating." , img: imgShellac },
  { slug: "cuticle-removal", title: "Cuticle Removal", group: "Nails", blurb: "Gentle cuticle care for neat, healthy-looking nails." , img: imgCuticle },
  { slug: "extra-long-corners", title: "Extra Long Corners", group: "Nails", blurb: "Sculpted extensions with dramatic length and shape." , img: imgExtensions },
  { slug: "aroma-massage", title: "Aroma Massage", group: "Skin & Spa", blurb: "Relaxing aromatherapy massage to soothe body and mind." , img: imgAroma },
  { slug: "stone-therapy", title: "Stone Therapy", group: "Skin & Spa", blurb: "Warm-stone therapy that eases tension and improves circulation." , img: imgStone },
  { slug: "ozone-therapy", title: "Ozone Therapy", group: "Skin & Spa", blurb: "Skin-purifying ozone treatment for a clear, radiant complexion." , img: imgOzone },
  { slug: "honey-wrappings", title: "Honey Wrappings", group: "Skin & Spa", blurb: "Nourishing honey body wrap that hydrates and softens skin." , img: imgHoney },
  { slug: "eyebrow-tint", title: "Eyebrow Tint", group: "Skin & Spa", blurb: "Precise brow tinting to define and frame your eyes." , img: imgBrowTint },
  { slug: "eyelash-tint", title: "Eyelash Tint", group: "Skin & Spa", blurb: "Lash tinting for darker, fuller-looking lashes without mascara." , img: imgLashTint },
  { slug: "waxing", title: "Waxing", group: "Hair Removal", blurb: "Full-body and facial waxing for smooth, long-lasting results." , img: imgWaxing },
  { slug: "sugaring", title: "Sugaring", group: "Hair Removal", blurb: "Natural sugaring hair removal, gentle on sensitive skin." , img: imgSugaring },
  { slug: "electrolysis", title: "Electrolysis", group: "Hair Removal", blurb: "Permanent hair removal, treated hair by hair." , img: imgElectrolysis },
  { slug: "ipl-hair-removal", title: "IPL Hair Removal", group: "Hair Removal", blurb: "Advanced IPL treatment for lasting hair reduction." , img: imgIpl },
];

// ---- Courses — grouped, slugs preserved ------------------------------------
export type Course = {
  slug: string;
  title: string;
  group: "Certificate" | "Diploma" | "Advanced";
  duration: string;
  summary: string;
  modules: string[];
  img: string;
};

export const COURSES: Course[] = [
  {
    slug: "certificate-in-basic-mehndi", img: courseMehndi, title: "Certificate in Basic Mehndi", group: "Certificate", duration: "1 Month",
    summary: "Learn traditional and modern mehndi artistry, from basic motifs to bridal patterns.",
    modules: ["Mehndi tools & cones", "Basic motifs & fillers", "Arabic & Indian styles", "Bridal hand & feet design"],
  },
  {
    slug: "certificate-in-art-of-make-up", img: svcDayMakeup, title: "Certificate in Art of Make-up", group: "Certificate", duration: "1 Month",
    summary: "Master everyday, party and HD make-up techniques with professional products.",
    modules: ["Skin prep & base", "Eye make-up techniques", "Contour & highlight", "Party & HD looks"],
  },
  {
    slug: "certificate-in-hair-designing", img: svcHairStyling, title: "Certificate in Hair Designing", group: "Certificate", duration: "2 Months",
    summary: "Foundation in cutting, styling and hair-do for salon-ready skills.",
    modules: ["Hair anatomy & tools", "Basic cuts", "Blow-dry & styling", "Party hair-do"],
  },
  {
    slug: "certficate-in-nair-art-and-nail-extension", img: svcExtensions, title: "Certificate in Nail Art & Nail Extension", group: "Certificate", duration: "1 Month",
    summary: "Complete nail-art and extension training including gel and acrylic work.",
    modules: ["Manicure & pedicure", "Nail art designs", "Gel extensions", "Acrylic extensions"],
  },
  {
    slug: "certficate-in-basic-spa", img: svcAromaMassage, title: "Certificate in Basic SPA", group: "Certificate", duration: "1 Month",
    summary: "Introduction to spa therapies, massage and relaxation treatments.",
    modules: ["Spa etiquette", "Body massage basics", "Aroma & stone therapy", "Body polishing"],
  },
  {
    slug: "certificate-in-advance-beauty", img: svcFacial, title: "Certificate in Advance Beauty", group: "Certificate", duration: "2 Months",
    summary: "Advanced skin and beauty treatments for the modern professional.",
    modules: ["Advanced facials", "Skin analysis", "Clean-up & bleach", "Advanced waxing"],
  },
  {
    slug: "certificate-in-beauty-hair-designing", img: svcHairColor, title: "Certificate in Beauty & Hair Designing", group: "Certificate", duration: "3 Months",
    summary: "Combined beauty and hair programme covering the salon essentials.",
    modules: ["Beauty fundamentals", "Hair cutting & styling", "Make-up basics", "Client consultation"],
  },
  {
    slug: "diploma-in-beautician", img: svcBeautyCare, title: "Diploma in Beautician", group: "Diploma", duration: "6 Months",
    summary: "A complete beautician diploma preparing you for a professional salon career.",
    modules: ["Skin & beauty therapy", "Make-up artistry", "Hair care & styling", "Nails & spa", "Salon management"],
  },
  {
    slug: "diploma-in-beauty-culture", img: svcOzone, title: "Diploma in Beauty Culture", group: "Diploma", duration: "6 Months",
    summary: "In-depth beauty culture training with strong practical exposure.",
    modules: ["Cosmetology basics", "Facials & skin care", "Bridal make-up", "Body treatments"],
  },
  {
    slug: "diploma-in-hair-designing", img: svcLongHair, title: "Diploma in Hair Designing", group: "Diploma", duration: "6 Months",
    summary: "Specialised diploma focused on cutting, colouring and hair design.",
    modules: ["Advanced cutting", "Global & creative colour", "Chemical treatments", "Editorial styling"],
  },
  {
    slug: "diploma-in-body-therapy", img: svcStoneTherapy, title: "Diploma in Body Therapy", group: "Diploma", duration: "4 Months",
    summary: "Professional body-therapy diploma covering massage and spa treatments.",
    modules: ["Anatomy & physiology", "Massage techniques", "Spa & body wraps", "Wellness therapies"],
  },
  {
    slug: "diploma-in-spa-therapy", img: svcHoneyWrap, title: "Diploma in SPA Therapy", group: "Diploma", duration: "4 Months",
    summary: "Comprehensive spa-therapy diploma for aspiring spa professionals.",
    modules: ["Spa treatments", "Aromatherapy", "Stone & hydro therapy", "Client care"],
  },
  {
    slug: "advance-diploma-in-cosmetology", img: svcEveningMakeup, title: "Advance Diploma in Cosmetology", group: "Advanced", duration: "9 Months",
    summary: "Advanced cosmetology diploma combining skin, hair, make-up and management.",
    modules: ["Advanced cosmetology", "Skin & laser basics", "Advanced make-up", "Hair design", "Business & management"],
  },
  {
    slug: "advance-diploma-in-aeshetices-hiar-designing", img: svcUpdo, title: "Advance Diploma in Aesthetics & Hair Designing", group: "Advanced", duration: "9 Months",
    summary: "Premium programme blending aesthetics with high-end hair designing.",
    modules: ["Aesthetic treatments", "Advanced hair design", "Creative colour", "Bridal & editorial"],
  },
  {
    slug: "post-graduate-diploma-in-cosmetology", img: svcBridal, title: "Post Graduate Diploma in Cosmetology", group: "Advanced", duration: "12 Months",
    summary: "Our flagship PG diploma — the complete path to a master cosmetologist career.",
    modules: ["Complete cosmetology", "Advanced aesthetics", "Salon & spa management", "Entrepreneurship", "Internship"],
  },
];

export const COURSE_GROUPS = ["Certificate", "Diploma", "Advanced"] as const;

// ---- Products (12) — catalog only ------------------------------------------
export type Product = { slug: string; title: string; category: string };

export const PRODUCTS: Product[] = [
  { slug: "brush", title: "Brush", category: "Styling" },
  { slug: "creative-haircut-blade", title: "Creative Haircut Blade", category: "Cutting" },
  { slug: "cuticle", title: "Cuticle Clippers", category: "Nails" },
  { slug: "clipper", title: "Electric Hair Clipper", category: "Cutting" },
  { slug: "foot-smoother", title: "Foot Smoother", category: "Nails" },
  { slug: "haircomb", title: "Hair Comb Set", category: "Styling" },
  { slug: "dryer", title: "Hair Dryer", category: "Styling" },
  { slug: "straightener", title: "Hair Straightener", category: "Styling" },
  { slug: "scissors", title: "Manicure Scissors", category: "Nails" },
  { slug: "tweezers", title: "Manicure Tweezers", category: "Nails" },
  { slug: "polishers", title: "Nail Polishers", category: "Nails" },
  { slug: "scissorss", title: "Professional Hair Scissors", category: "Cutting" },
];

// ---- Primary navigation -----------------------------------------------------
export const NAV: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About", to: "/overview",
    children: [
      { label: "Overview", to: "/overview" },
      { label: "Our History", to: "/company-history" },
      { label: "Vision & Mission", to: "/vision-and-mission" },
      { label: "Accreditation", to: "/accreditation" },
    ],
  },
  { label: "Services", to: "/services" },
  {
    label: "Courses", to: "/courses",
    children: [
      { label: "All Courses", to: "/courses" },
      { label: "Certificate Courses", to: "/courses#certificate" },
      { label: "Diploma Courses", to: "/courses#diploma" },
      { label: "Advanced Diplomas", to: "/courses#advanced" },
    ],
  },
  { label: "Gallery", to: "/gallery" },
  { label: "Result", to: "/result" },
  { label: "Shop", to: "/shop" },
  {
    label: "More", to: "/faq",
    children: [
      { label: "FAQ", to: "/faq" },
      { label: "News & Events", to: "/news-and-events" },
      { label: "We're Hiring", to: "/vacancies" },
      { label: "Franchise Enquiry", to: "/frenchise-enquiry" },
      { label: "Blog", to: "/blog" },
    ],
  },
  { label: "Contact", to: "/contacts" },
];
