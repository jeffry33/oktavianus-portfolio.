# Oktavianus Jeffry — Portfolio

A five-chapter, editorial-style personal portfolio built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Design direction
- Monochrome black-and-white editorial layout with a red accent
- Oversized condensed typography and portrait-led hero
- Five-slide desktop presentation with animated transitions
- Keyboard arrows, mouse wheel, navigation, and touch swipe controls
- Mobile layout reflows into vertically scrollable chapters
- Reduced-motion accessibility support

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Assets
- `public/images/portrait-cutout.png`: portrait crop prepared from the supplied reference poster.
- `public/images/portrait-reference.png`: original supplied portrait poster for reference.

## Before publishing
1. Confirm the email and LinkedIn URL in `app/page.tsx`. A GitHub profile URL was not provided in the CV, so replace the placeholder before publishing.
2. Replace the portrait crop with a clean original transparent PNG if available. The current crop is derived from the supplied poster and may retain some background details.
3. The supplied CV is included at `public/files/Oktavianus-Jeffry-Pradhana-CV.pdf` and linked from the contact slide.
4. Review experience descriptions and dates for accuracy.


<!-- Portfolio deployment setup verified -->
