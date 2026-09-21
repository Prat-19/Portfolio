# Pratham Dalakoti — Portfolio Website

## Overview
A modern, animated portfolio website for Pratham Dalakoti — MSc Business Analytics Graduate from UCD Smurfit School. Features a video background with blur, dark/light theme toggle, smooth scrolling, and responsive design.

## Live URL
http://127.0.0.1:8081/

## How to Run
```bash
node serve.js
```
Then open http://127.0.0.1:8081/

## Sections

### 1. Hero
- **Name**: "Pratham Dalakoti" (single line, white text)
- **Subtitle**: "MSc Business Analytics Graduate from UCD Smurfit | Data Analytics & Business Strategy"
- **Profile photo**: Right side, 220px circle with purple glow border
- **Buttons**: "View My Work" + "Get in Touch"
- **Background**: Video (`motionpage-swirl-bands.mp4`) with blur(10px), brightness(0.7), opacity 0.5
- **Theme toggle**: Top-right corner (dark/light mode)
- **Scroll indicator**: Animated scroll line at bottom

### 2. About
- **Title**: "MSc Business Analytics Graduate"
- **Description**: Financial data analysis, operations, and marketing analytics across the full analytics lifecycle. Right to work in Ireland.
- **Stats**: 2 Internships, 3 Education Levels, 6 Certifications
- **Content**: 3 paragraphs about background, career, and availability

### 3. Skills
- **Title**: "Top Skills"
- **Grid of skill cards** with icons, names, and levels:
  - R (Advanced), Python (Advanced), SQL (Expert), Power BI (Advanced), Tableau (Advanced), DAX (Intermediate), Excel (Advanced), GenAI (Intermediate)

### 4. Experience
- **Timeline** with 2 entries:
  - **Business Analyst Intern** at Samynk & Co (Oct 2024 – Mar 2025, New Delhi)
  - **Operations Intern** at DCDC Kidney Care (Jun – Aug 2024, New Delhi)

### 5. Education
- **3 education levels**:
  - MSc Business Analytics (UCD) — Current, Sep 2025–Sep 2026
  - BBA (Vivekananda Institute) — Completed, Sep 2022–Jul 2025
  - Senior Secondary (Lancers Convent) — Completed, Apr 2020–Jun 2022

### 6. Certifications
- 6 certification cards: Bloomberg Spreadsheet Analysis, SAP FICO HANA, McKinsey Forward Program, IIBA, Business Analysis Fundamentals (UCD), UCD Advantage Award

### 7. Projects
- **MSc Capstone — Sustainability Reporting Mapper**
  - Applied automated schema matching and XBRL tagging to map sustainability reporting data between EU frameworks (VSME and CSRD)
  - Technologies: Python, XBRL, Schema Matching
  - Status: Completed

### 8. Contact
- **Contact info**: Email, Phone, Location, LinkedIn
- **Contact form**: Name, Email, Message fields with "Send Message" button
- **Footer**: © 2026 Pratham Dalakoti, LinkedIn link

## Key Features
- Dark/Light theme toggle (persists via localStorage)
- Smooth scroll (Lenis library)
- GSAP animations (ScrollTrigger)
- Custom cursor with trail effect
- Video background with blur
- Decorative CSS circles and dashed lines
- Responsive design with media queries
- Scroll progress indicator
- Reveal-on-scroll animations

## File Structure
```
Pratham Portfolio/
├── index.html          Main HTML structure
├── css/style.css       All styles (CSS variables, animations, responsive)
├── js/main.js          All JavaScript (theme, cursor, GSAP, Lenis)
├── serve.js            Local HTTP server on port 8081
├── assets/
│   ├── images/
│   │   └── profilem.png    Profile photo
│   └── videos/
│       └── motionpage-swirl-bands.mp4  Background video
├── node_modules/       Dependencies (sharp, ffmpeg)
├── package.json
└── package-lock.json
```

## CSS Variables
- `--bg`: Background color
- `--text`, `--text-muted`, `--text-muted-light`, `--text-secondary`, `--text-muted-bright`, `--text-dim`: Text colors (bright white in light mode)
- `--heading`: Heading color
- `--accent`, `--accent2`, `--accent3`: Purple, teal, gold accents
- `--card-bg`, `--card-border`: Card styling
- `--radius`, `--shadow`: Design tokens
- `--glow-color`, `--glow-color-secondary`: Glow effects
- `--gradient-start`, `--gradient-end`, `--gradient-mid`: Gradient colors

## Dependencies (CDN)
- Lenis (smooth scroll)
- GSAP + ScrollTrigger (animations)
- Font Awesome 6.5.1 (icons)
- Inter + JetBrains Mono fonts

## Notes
- Profile image is `profilem.png` (400x400 PNG)
- Video background is `motionpage-swirl-bands.mp4` (1351KB)
- Theme preference saved in localStorage as `pm-theme`
