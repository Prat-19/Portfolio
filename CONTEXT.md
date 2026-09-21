# Pratham Portfolio — Assistant Context

## Project Overview
Modern portfolio website for Pratham Dalakoti — MSc Business Analytics Graduate from UCD Smurfit School. Single-page site with video background, dark/light theme toggle, GSAP animations, and smooth scrolling.

## File Structure (Current, Clean)
```
Pratham Portfolio/
├── index.html          Main HTML (no inline CSS/JS, ~67KB)
├── css/style.css       All styles extracted (~28KB)
├── js/main.js          All JS extracted (~20KB)
├── serve.js            HTTP server on port 8081
├── assets/
│   ├── images/
│   │   └── profilem.png    Profile photo (400x400 PNG)
│   └── videos/
│       └── motionpage-swirl-bands.mp4  Background video (1.35MB)
├── node_modules/       Dependencies (sharp, @ffmpeg-installer, semver)
├── package.json        Depends: @ffmpeg-installer/ffmpeg, sharp
└── package-lock.json
```

## Running the Server
```bash
node serve.js
```
Server runs on port 8081. Already running if port in use.

## HTML Structure (index.html)
- `<head>`: Meta tags, title, Google Fonts (Inter + JetBrains Mono), Font Awesome CDN, Lenis/GSAP CDN, `<link rel="stylesheet" href="css/style.css">`
- `<body data-theme="light">`: Theme attribute on body
- `<div id="loader">`: Loading screen with progress bar and counter
- `<video class="bg-video">`: Autoplay muted loop background video
- `<div class="bg-layer">`: Mouse gradient + 3 bg orbs
- `<button class="theme-toggle" id="themeToggle">`: Dark/light toggle
- `<div class="scroll-progress" id="scrollProgress">`: Scroll bar
- `<nav class="nav">`: Logo "Pratham D." + nav links (About, Skills, Experience, Education, Projects, Contact)
- `<section id="hero">`: Split layout — text left (name, subtitle, CTA buttons), profile image right (220px circle)
- `<section id="about">`: Bio text + 3 stat cards
- `<section id="skills">`: 8 skill cards in grid
- `<section id="experience">`: 2 timeline items
- `<section id="education">`: 3 education cards
- `<section id="certifications">`: 6 certification cards
- `<section id="projects">`: 1 project card (MSc Capstone)
- `<section id="contact">`: Contact info + form
- `<footer>`: Copyright + LinkedIn link
- `<div class="cursor">` + `<div class="cursor-dot">`: Custom cursor
- `<script src="js/main.js"></script>`: At end of body

## CDN Scripts Loaded
- `@studio-freight/lenis@1.0.42` — Smooth scroll
- `gsap@3.12.5` — Animation library
- `gsap@3.12.5/ScrollTrigger` — Scroll-based animations
- `font-awesome@6.5.1` — Icons

## CSS Variables (from css/style.css)

### Light Mode (default, `data-theme="light"`)
| Variable | Value | Purpose |
|---|---|---|
| `--bg` | `#fff8e` | Page background |
| `--text` | `#1a1a1a` | Default text |
| `--text-muted` | `#e0e0e0` | Subtitle/muted text |
| `--text-muted-light` | `#ffffff` | Bright text |
| `--text-secondary` | `#d0d0d0` | Secondary text |
| `--text-muted-bright` | `#f0f0f0` | Bright muted |
| `--text-dim` | `#cccccc` | Dim text |
| `--heading` | `#1a1a1a` | Heading text |
| `--accent` | `#7c6ce0` | Purple (primary) |
| `--accent2` | `#00cec9` | Teal (secondary) |
| `--accent3` | `#fdcb6e` | Gold (tertiary) |
| `--card-bg` | `#ffffff` | Card background |
| `--card-border` | `#e0e0e0` | Card border |
| `--radius` | `12px` | Border radius |
| `--shadow` | `0 4px 24px rgba(0,0,0,0.08)` | Box shadow |
| `--glow-color` | `rgba(124,108,224,0.3)` | Glow |
| `--gradient-start` | `#7c6ce0` | Gradient start |
| `--gradient-end` | `#00cec9` | Gradient end |

### Dark Mode (`data-theme="dark"`)
| Variable | Value |
|---|---|
| `--bg` | `#0a0a0a` |
| `--text` | `#e0e0e0` |
| `--text-muted` | `#b0b0b0` |
| `--text-muted-light` | `#ffffff` |
| `--text-secondary` | `#999999` |
| `--text-muted-bright` | `#f0f0f0` |
| `--text-dim` | `#cccccc` |
| `--heading` | `#e0e0e0` |
| `--card-bg` | `#1a1a1a` |
| `--card-border` | `#333333` |

## Key CSS Classes & Their Roles
- `.hero` — Hero section with video background
- `.hero-content` — Text wrapper (split layout, left side)
- `.hero-profile` — Profile image (220px circle, right side, purple glow border, hover scale)
- `.hero-title` — Name text (7rem, white-space: nowrap)
- `.hero-subtitle` — Subtitle text (var(--text-muted))
- `.hero-cta` / `.hero-secondary` — CTA buttons
- `.section` — Section container
- `.section-header` — Section header with label, heading, description
- `.skills-grid` — 2-column grid of skill cards
- `.timeline` — Vertical timeline
- `.timeline-item` — Timeline entry with dot, card
- `.education-grid` — 3-column education grid
- `.certs-grid` — Certification card grid
- `.contact-grid` — Contact info + form grid
- `.cursor` / `.cursor-dot` — Custom cursor elements
- `.theme-toggle` — Theme switch button
- `.scroll-progress` — Scroll progress bar
- `.reveal-section` / `.reveal-up` / `.reveal-left` — GSAP reveal animations
- `.stagger-children` — Staggered animation children
- `.deco-circle` — Decorative CSS circles (dc-s1 through dc-s9)
- `.bg-orb` — Background gradient orbs (3 total)

## JavaScript (js/main.js)
All in one IIFE `(function() { 'use strict'; ... })();`

### Features:
1. **Theme toggle** — Reads/writes `localStorage.getItem('pm-theme')`, applies data-theme to body
2. **Custom cursor** — `#cursor` (big circle) and `#cursorDot` (dot) follow mouse with smooth lerp
3. **Lenis smooth scroll** — `new Lenis()` with `requestAnimationFrame` loop
4. **GSAP ScrollTrigger** — Reveals sections with `.reveal-section`, `.reveal-up`, `.reveal-left`
5. **Scroll progress** — Updates `.scroll-progress` width based on scroll position
6. **Loader animation** — Counter increments, bar fills, then hides
7. **Form handling** — Contact form submission (prevent default, shows feedback)
8. **Intersection observer** — For scroll-triggered animations as fallback
9. **Window resize handler** — Adjusts cursor size on resize

## Important Notes

### Editing Tips
- **CSS changes**: Edit `css/style.css`, not `index.html`
- **JS changes**: Edit `js/main.js`, not `index.html`
- **Theme variables**: Change in `:root` and `[data-theme="dark"]` blocks in `css/style.css`
- **Adding new sections**: Add `<section>` to `index.html`, add styles to `css/style.css`, add animations to `js/main.js`
- **Image/video paths**: Use `assets/images/` and `assets/videos/` prefixes
- **CSS specificity**: `!important` used frequently on utility classes; be careful overriding

### Color System
- Accent colors are purple (#7c6ce0), teal (#00cec9), gold (#fdcb6e)
- All text colors are bright white (#e0e0e0 - #ffffff) for visibility on dark video background
- Previously green (#5abd02) was replaced with purple/teal/gold

### Responsive Breakpoints
- `1024px` — Tablet adjustments
- `768px` — Mobile nav toggle, grid changes
- `480px` — Small mobile adjustments
- Uses `clamp()` for fluid typography

### Known Issues
- `--heading: #1a1a1a` is still dark on light mode (may need updating for dark video background visibility)
- `profile.jpg` is a duplicate not used
- `node_modules` contains `@ffmpeg-installer` and `sharp` which may not be needed for the portfolio
- Video file is 1.35MB MP4 with blur filter — loads on autoplay

### Security Notes
- The contact form has no backend — just frontend validation
- `serve.js` is a basic HTTP server, not production-ready
- No authentication or CSRF protection

## Changes Made (Chronological)
1. Added MP4 video background with blur(10px), brightness(0.7), opacity 0.5
2. Replaced all green (#5abd02) with purple/teal/gold
3. Increased font weights from 400 to 500, added text-shadow
4. Added profile photo (220px circle, right side of hero)
5. Added `white-space: nowrap` to `.hero-title`
6. Changed muted text colors to bright white (var(--text-muted) → #e0e0e0, etc.)
7. Updated dark mode variables
8. Added hover effects and glow animation to profile image
9. Extracted inline CSS to `css/style.css`
10. Extracted inline JS to `js/main.js`
11. Moved media files to `assets/` folder
12. Updated `serve.js` MIME types (added webm, jpeg, gif, svg, woff, woff2)
13. Cleaned up temp files (frame PNGs, DESIGN.md, KNOWLEDGE_BASE.md, linkedin PDF, profile.jpg)

## Dependencies (package.json)
```json
{
  "dependencies": {
    "@ffmpeg-installer/ffmpeg": "^1.1.0",
    "sharp": "^0.35.4"
  }
}
```
Note: These may be leftover from video processing and might not be needed for the portfolio site.
