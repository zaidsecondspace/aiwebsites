# Hammad Medical Center — Homepage

A modern, clean, mobile-first homepage for **Hammad Medical Center**, a trusted family medical clinic located in Kalaburagi, Karnataka, India. The site is built with pure HTML, CSS, and JavaScript — no build step required — and is optimised to convert visitors into patients via appointment bookings and phone calls.

---

## 🎯 Project Goals

- Build instant trust with a professional, warm, community-focused design
- Highlight clinical expertise and core services
- Make it frictionless to **Call Now** or **Book an Appointment** from any device
- Load fast and feel great on mobile (primary audience)

---

## ✅ Currently Completed Features

### Design & UX
- **Mobile-first, fully responsive** layout (breakpoints at 640px, 900px, 1100px)
- **Brand color system** — Deep Blue `#1E3A8A` (primary), Soft Green `#10B981` (secondary), light blue accents, white/grey backgrounds
- **Modern typography** using Inter font (weights 300–800) with bold display treatment
- **Subtle, tasteful animations** — scroll reveals, floating hero cards, hover lifts, gradient accents
- **Accessibility** — semantic HTML5 landmarks, ARIA labels, keyboard navigation, `prefers-reduced-motion` support, proper focus states
- **Fast loading** — CDN assets, lazy-loaded images, no heavy frameworks

### Page Sections
1. **Fixed navigation header** with logo, desktop nav, mobile hamburger menu, and "Book Now" CTA. Background blurs + shadow appears on scroll. Active section highlighted automatically.
2. **Hero Section**
   - Trust eyebrow badge
   - Bold headline with green accent color on "Compassionate Care"
   - Subheadline + dual CTAs (**Book an Appointment** / **Call Now**)
   - Hero image with two floating info cards
   - **Three trust badges** — 4.9★ Rating, Experienced Doctor, Same-Day Appointments
3. **Services Section** — three illustrated service cards with icons, descriptions, and feature lists:
   - General Consultation & Family Medicine
   - Hypertension & Chronic Disease Management
   - Diagnostic Services (ECG & Basic Tests)
4. **About Section** — clinic image with floating "100+ Happy Patients" stat, three-paragraph story, four highlight items, and a CTA.
5. **Testimonials Section** — three realistic 5-star patient reviews with avatars and decorative quote mark.
6. **Contact Section** (deep-blue gradient background)
   - Phone, address, and hours info block
   - **Working appointment request form** with name, phone, service, and message fields
   - Dual CTAs (Call + Book)
   - Embedded Google Map of the clinic location
7. **Footer** — brand + tagline, quick links, contact details, emergency CTA, copyright.

### Conversion & Interaction
- **Sticky mobile CTA bar** (Call Now / Book) always visible on mobile
- **Smooth scrolling** navigation with scroll-padding for the fixed header
- **Click-to-call** links (`tel:07975755281`) on every phone CTA
- **Appointment form** persists submissions to the RESTful Table API (see below)
- Success confirmation state with accessible live region
- Hamburger menu with body-scroll lock, Escape-to-close, link auto-close

---

## 🗂 Project Structure

```
/
├── index.html            Main homepage (all sections)
├── css/
│   └── style.css         Mobile-first stylesheet with brand system
├── js/
│   └── main.js           Nav, scroll reveal, form handler
└── README.md             This document
```

---

## 🔗 Functional Entry Points (URIs)

| Path / Anchor      | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `/` or `index.html`| Homepage                                       |
| `#hero`            | Top / Home section                             |
| `#services`        | Comprehensive Medical Services                 |
| `#about`           | About the clinic                               |
| `#testimonials`    | Patient reviews                                |
| `#contact`         | Contact info, booking form, map                |
| `#appointment-form`| Jumps directly to the appointment form         |
| `tel:07975755281`  | Click-to-call clinic phone                     |

### RESTful Table API (used by the appointment form)
- `POST tables/appointments` — Create a new appointment request
- `GET  tables/appointments` — List all requests (for admin / future dashboard)
- `GET  tables/appointments/{id}` — Fetch a specific request
- `PATCH tables/appointments/{id}` — Update status/details
- `DELETE tables/appointments/{id}` — Remove a request

---

## 🗄 Data Model

### `appointments` table
| Field          | Type       | Description                                                   |
| -------------- | ---------- | ------------------------------------------------------------- |
| `id`           | text       | Unique record identifier (auto)                               |
| `name`         | text       | Patient's full name                                           |
| `phone`        | text       | Patient's phone number                                        |
| `service`      | text (enum)| One of: General Consultation, Hypertension / Chronic Disease, Diagnostic / ECG, Other |
| `message`      | rich_text  | Optional message / concern description                        |
| `submitted_at` | number     | Submission timestamp (ms)                                     |

System fields (`gs_project_id`, `gs_table_name`, `created_at`, `updated_at`) are added automatically.

---

## 🚧 Features Not Yet Implemented

- Admin dashboard to view, filter, and mark appointment requests as handled
- SMS / email notifications to the clinic when a new request arrives
- Multi-language support (Kannada / Hindi / Urdu) for a more inclusive local experience
- Dedicated "Services" detail pages (currently a single-page homepage)
- Doctor profile / credentials page with photo and qualifications
- Patient blog / health-tips section for SEO and engagement
- Online payment or deposit for appointment confirmation
- Google reviews live-pull integration

---

## 🛣 Recommended Next Steps

1. **Replace placeholder imagery** with real photos of the clinic, doctor, and facilities (same aspect ratios: hero 4:5, about 4:3).
2. **Add real Google Reviews** or verified testimonials with patient consent.
3. **Build an admin page** (`/admin.html`) that lists all submitted appointments using the Table API.
4. **Connect form submissions to WhatsApp / SMS** by replacing the form handler with a WhatsApp click-to-chat deep link as a quick alternative: `https://wa.me/917975755281?text=...`.
5. **Set up analytics** (e.g., Google Analytics, Meta Pixel) to track CTA click-through rates.
6. **Add structured data (JSON-LD)** — `MedicalBusiness`/`LocalBusiness` schema — to improve local search visibility on Google.
7. **Create a Favicon and PWA manifest** for a branded, installable experience.
8. **Deploy via the Publish tab** to make the site live.

---

## 🏥 Clinic Quick Facts

- **Name:** Hammad Medical Center
- **Address:** AARAM Apt, MG Rd, beside Syndicate Bank, MB Nagar, Sunder Nagar, Kalaburagi, Karnataka
- **Phone:** 079757 55281
- **Hours:** Open daily 12:00 PM – 10:00 PM · Emergency appointments available
- **Tagline:** *Serving Kalaburagi with trusted healthcare.*
