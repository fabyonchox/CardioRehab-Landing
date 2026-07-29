# CardioRehab - Master Design System (UI/UX Pro Max Specification)

> **Source of Truth for CardioRehab Healthtech Platform**  
> *Generated & maintained using the UI/UX Pro Max Framework*

---

## 📐 1. Recommended Pattern & Layout Architecture
- **Primary Pattern**: Hero-Centric + Social Proof + Bento Grid Features + Comparison Matrix + Video Demo + FAQ Accordion.
- **Conversion Strategy**: Trust & Clinical Authority driven (ATS/ERS, EWGSOP2, AACVPR citations) + Persistant Download CTA.
- **Responsive Breakpoints**: `375px` (Mobile Small), `600px` (Mobile Large), `992px` (Tablet/Laptop), `1440px` (Desktop).

---

## 🎨 2. UI Style Specification: Cyber-Glass Clinical
- **Style Priority**: Cyber-Glass Evolution (Dark Glassmorphism + Medical Neon Accents).
- **Surface Depth**: Soft glassmorphism backdrop filters (`backdrop-filter: blur(15px-25px)`).
- **Borders & Outlines**: Sub-pixel translucent borders (`rgba(0, 229, 255, 0.12)` default, `rgba(0, 229, 255, 0.35)` hover).
- **Interactions**: Smooth 300ms cubic-bezier transition curves.

---

## 🎨 3. Color Palette & Mood (Clinical Cyber Dark)
- **Background Deep (`--bg-dark`)**: `#070a10` (Ultra-dark clinical space)
- **Glass Card Fill (`--card-bg`)**: `rgba(13, 20, 32, 0.55)` (Acrylic translucency)
- **Hover Card Fill (`--card-hover`)**: `rgba(18, 28, 45, 0.8)`
- **Primary Accent (`--accent`)**: `#00e5ff` (Cyan - Telemetry & Digital Health)
- **Primary Accent Glow (`--accent-glow`)**: `rgba(0, 229, 255, 0.4)`
- **Secondary Accent (`--accent-green`)**: `#39ff14` (Physiological Green - Vital signs)
- **Warning/Negative (`--danger-red`)**: `#ff4d4d` (Traditional manual errors)
- **Text Primary (`--text-primary`)**: `#f0f4f8` (High-contrast cool white)
- **Text Secondary (`--text-secondary`)**: `#8a9fc4` (Muted slate blue)

---

## 🔤 4. Typography System
- **Headlines & Display Titles**: `Outfit`, sans-serif (Weights: 600, 700, 800).
- **Body, Metrics & Technical Data**: `Inter`, sans-serif (Weights: 400, 500, 600).
- **Google Fonts Import Link**:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ```

---

## 🚫 5. Anti-Patterns (What to Avoid)
- ❌ **No emojis as icons**: Always use vector icons (Phosphor Icons / Lucide SVG).
- ❌ **No plain bright white backgrounds**: Use clinical dark glass hierarchy.
- ❌ **No informal SaaS jargon**: Use validated clinical terminology (TM6M, Enright, EWGSOP2, Karvonen BB, AACVPR, DASI, SARC-F).
- ❌ **No non-interactive buttons**: Ensure all clickable elements have `cursor: pointer` and visible focus/hover states.

---

## ✅ 6. Pre-Delivery Quality Checklist
- [x] **No emojis as icons** (Phosphor Icons integrated globally).
- [x] **`cursor-pointer`** enforced on all buttons, links, FAQ headers, and gallery items.
- [x] **Smooth hover transitions** (150-300ms ease).
- [x] **Text contrast ratio**: Minimum 4.5:1 WCAG AA compliant (`#f0f4f8` on `#070a10`).
- [x] **Focus states** visible for keyboard navigation.
- [x] **Responsive verification**: Tested across `375px`, `768px`, `992px`, and `1440px`.
- [x] **Offline & Privacy first**: Clearly highlighted SQLCipher / Room DB architecture.
