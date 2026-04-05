# Mana Infrastructure Website

## Company
- **Name:** Mana Infrastructure Private Limited
- **Founded:** 2012 | **Incorporated:** 2025
- **HQ:** Tirupati, AP | **Corporate:** Hyderabad, Telangana
- **Tagline:** "Build Together, Grow Together"
- **Email:** info@manainfra.in
- **Sectors:** Highways, Tunnels, Irrigation, Railways, Bridges
- **States:** AP, Telangana, Karnataka, Maharashtra, Odisha
- **Stats:** ₹400+ Cr turnover, ₹1500+ Cr book order, 13+ years, 500+ machines, 1000+ staff, 5 states

## Brand Palette (Midnight Amber)
| Token | Hex | Usage |
|-------|-----|-------|
| `navy` | `#1B2A4A` | Primary brand color |
| `amber` | `#D4922E` | Secondary accent |
| `gold` | `#E8A435` | Highlights, CTAs, headings |
| `dark` | `#0F1B2D` | Nav, footer, hero overlays |
| `light` | `#F8FAFC` | Alt section backgrounds |
| `white` | `#FFFFFF` | Content backgrounds |
| `text-dark` | `#1E293B` | Body text on light bg |
| `text-muted` | `#64748B` | Secondary text |
| `text-light` | `#94A3B8` | Text on dark bg (muted) |

## Design Direction
- **Light theme with dark accents** — white/light backgrounds for content, dark navy for heroes/nav/footer
- Mobile-first responsive (Tailwind breakpoints: sm/md/lg/xl)

## Tech
- Tailwind CSS via CDN
- Vanilla JS
- 5 HTML files: index.html, about.html, location.html, projects.html, contact.html
- Shared nav/footer via JS injection (shared/nav.js, shared/footer.js)
- Custom CSS: css/custom.css
- Images: images/ directory

## Tailwind Config (include in every HTML page)
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: '#1B2A4A',
        amber: '#D4922E',
        gold: '#E8A435',
        dark: '#0F1B2D',
        light: '#F8FAFC',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    }
  }
}
```

## Pages
1. **Home** (index.html) — hero, stats, expertise, featured projects, credentials, CTA
2. **About** (about.html) — who we are, certifications, vision/mission, management, key figures
3. **Location** (location.html) — offices, maps, operational states, project locations
4. **Projects** (projects.html) — 4 featured projects, other projects, executed works table, active projects
5. **Contact** (contact.html) — form (placeholder), contact info, maps

## HTML Template
Every page uses this skeleton:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PAGE_TITLE - Mana Infrastructure</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>/* tailwind config */</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/custom.css">
</head>
<body class="font-body text-text-dark">
  <div id="navbar"></div>
  <!-- page content -->
  <div id="footer"></div>
  <script src="shared/nav.js"></script>
  <script src="shared/footer.js"></script>
</body>
</html>
```

## Key Content Reference
- **Management:** Sri T. Mastan Naidu (MD), Smt. T. Sarvani (Director)
- **Registered Office:** D.No. 19-3-145/A, Postal Colony, Tirupati – 517501, AP
- **Corporate Office:** Subishi Town Center, Mokila Village, Shankarpally Mandal, Hyderabad – 501203
- **Certifications:** Special Class Contractor (Civil Works, AP 409/259), Class-I Contractor (R&B, AP 2018), Firm Reg. 164/2012
