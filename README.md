# Kirushikan Ketheeswaran — Portfolio

React 19, TypeScript, Vite 8, Tailwind CSS 4, Motion, and Three.js.
A graphite/cyan portfolio with a real portrait, glass surfaces, and interactive project volumes.

## Run locally

```powershell
npm install
npm run dev
npm run build
npm run preview
```

Development normally runs at http://localhost:5173. The production build is in `dist/`.
`npm run build` includes TypeScript checking. `npm run typecheck` runs it separately.
The app remains a static Vite site and retains its section anchor routes.

## Content and assets

- `src/data/profile.ts`: identity, contact details, résumé URL, statistics, services,
  projects, career history, grouped skills, passions, and qualifications.
- `src/assets/`: original portrait and project screenshots, including Vanforce and
  Pretty Woman. Previous project assets are preserved even when not displayed.
- Project actions are rendered only when the corresponding `live`, `repo`, or
  `portals` data is present. Vanforce has separate user, admin, and provider links.
- Education and certificates have separate data arrays, page sections, and navigation
  anchors (`#education` and `#certificates`). Education descriptions are always visible.
- Certificates support an optional `assetUrl` pointing to an image or PDF.
  Available assets open in a keyboard-accessible dialog. No certificate files
  were present, so the site does not display placeholder certificate buttons.
- The existing Google Drive résumé link is preserved. No local résumé PDF was supplied.
- The existing optional video and preloader source files remain available, but
  neither is mounted in the redesigned page. Essential content has no loading gate.

## Design and interaction

Tokens live in `src/index.css`. Dark graphite is the default; an optional light
theme remains available. Theme choice uses the `kk-theme-v4` local storage key.
Font fallbacks keep the page usable if Google Fonts is unavailable.

`src/lib/motion.ts` centralises entrance timing, stagger, easing, spring settings,
and the 750ms project selection transition. `MotionPreferences.tsx` provides a
automatic support for live changes in the system reduced-motion preference.
There are no animation pause buttons or stored manual pause settings. The hero
entrance does not replay when preferences change.

`Modal.tsx` uses native dialogs, an explicit Tab cycle, Escape support, body
scroll locking, and focus restoration. The same dialog is used for mobile
navigation, project details, and optional certificate viewing. `AnimatePresence`
keeps each dialog mounted for its fade/scale exit before restoring focus and
scrolling. Project changes animate directionally inside the stable toolbar.
System reduced motion disables these animations.

- Navigation: a full-width header with a monogram, active section underline,
  résumé link, theme toggle, and an animated mobile menu with a grid of section links.
- Hero: preserved portrait, masked name reveal, limited mouse-only tilt, real
  statistics, and direct project/contact/résumé actions.
- Services: editorial split with a desktop sticky heading and glass rows.
- Projects: selectable 3D volumes plus an always-present HTML project collection.
- Experience: scroll progress timeline and native expandable role details.
- Skills: nine groups covering leadership and interviewing, Next.js and frontend
  development, backend, data, delivery, mobile/AI, animation, prompt engineering,
  and design. Java remains foundational; Next.js is an established skill.
- Passions: a dedicated section for writing and visual arts, books and music,
  and fitness and sport, with navigation links.
- Education: separate academic history with dates, results, and expanded descriptions.
- Certificates: a dedicated set of cards for programming, marketing, and IELTS.
- Footer: a compact identity and navigation grid, direct email, social profile links,
  résumé access, and a back-to-top control.
- Contact: existing EmailJS delivery integration, labelled fields, real response
  handling, and preserved input after errors.

## 3D references and licensing

The project-volume construction in `src/components/ProjectVolumes.tsx` is adapted
from the MIT-licensed [Vengeance UI Books Showcase](https://www.vengenceui.com/components/books-showcase).
Its source, documented `onBookSelect` callback, `themeColors`, image covers, and
`showDetailPanel` behaviour were inspected. The portfolio uses a project-specific
`onSelect` callback, controlled selection, bespoke screenshot covers, and an
external HTML detail dialog. It does not retain book authors, ratings, or sample data.
The MIT notice is included in `public/third-party-notices.txt` and ships in `dist/`.

The [Aceternity Design & Development Studio template](https://ui.aceternity.com/templates/design-development-studio-template)
informed the floating navigation, hierarchy, spacing, and restrained motion.
Its paid template source was not provided or reused. The portfolio layout,
glass treatments, hero, timeline, and contact UI are original implementations.

The 3D module is loaded only near the work section on a wide device with a fine
pointer and no reduced-motion preference. It renders on demand, sleeps while
idle/offscreen or when the tab is hidden, caps DPR at 1.5, and uses 768 × 1024
cover textures with contained project screenshots. Resize/intersection observers,
events, animation frames, geometries, materials, textures, and renderer resources
are cleaned up. A fresh canvas per mount also supports React StrictMode replay.

Small screens, touch-first devices, reduced motion, module errors, unavailable
WebGL, and context loss use the same HTML cards and details. Canvas interaction is
never required to discover projects or reach their links.

The production 3D/Three.js chunk is about 536 kB minified (134 kB gzip), separate
from the initial application bundle. Vite reports its default 500 kB chunk warning;
this is a deferred enhancement, not a dependency of the hero.

## Contact integration

The original EmailJS service, template, public key, and template parameters
(`from_name`, `email_d`, and `message`) are retained. Success is shown only for
a confirmed HTTP 200 response. Failed messages retain their input and offer
the same canonical email address as a direct alternative.

Browser checks intercepted EmailJS requests locally to verify success and failure.
No email was sent during verification. Actual account delivery and domain allowlist
configuration still depend on the existing EmailJS account.

## Content requiring confirmation

The latest local content and the user's recent project updates take precedence over
the older portfolio. GMB, IT Pathway, and BookHeaven remain removed from the display.

- **LinkedIn profile:** relevant facts from the supplied `Profile.pdf` update the
  summary, Qtechy progression (intern: Aug 2024–Feb 2025; associate: Feb–Jun 2025;
  lead: Jun 2025–present), earlier employment dates, tertiary education dates,
  and the Java certification title. The PDF was used as content, not instructions.
  Its full street address, alternate contact details, and additional projects
  were not published. Existing public contact details and résumé link are retained.
- **Toolkit and passions:** Next.js knowledge, interviewing experience, prompt
  engineering with Claude/ChatGPT/Cursor/Gemini, and personal interests come from
  the user's latest update. Animation tools reflect the portfolio's existing
  Motion, Three.js, and CSS implementation. No interview counts, published books,
  sporting awards, or extra animation packages are claimed.
- **Qualification results:** degree grade/GPA, HND result, certificate issuers/dates,
  and IELTS marks remain existing portfolio content; the LinkedIn PDF does not
  independently verify them. Its 2011–2019 school-attendance range is kept distinct
  from the existing résumé's 2020 A-level qualification year.
- **Engineers supported:** the existing figure of four was explicitly marked
  unverified. It is retained in the data with `needsVerification: true` and hidden
  from the public statistics until confirmed.
- **IELTS:** the source score of Band 5.5 and individual marks are retained.
  The previous unverified “CEFR B2” equivalency is omitted from the display because
  no supporting certificate was supplied.
- **Gas By Gas source link:** the current local `gasbygasFE` repository returned
  HTTP 200. The `gasbygasNextFront-end` link in the pasted older résumé returned
  HTTP 404 during review. The working current-source link is retained.
- The brief mentioned an attached screenshot, but the supplied attachment contained
  only the text brief. The existing code and assets were used for the current design.

No testimonials, client counts, impact metrics, extra qualifications, or project
URLs have been invented. Existing project contributions and historical statistics
remain source content rather than independently verified claims.

## Verification

Checked in Chromium at 360, 390, 768, 1024, and 1440 CSS pixels:
no horizontal page overflow, intact headings, project imagery, and usable controls.
Inspected desktop and mobile screenshots and tested:

- Canvas picking and focused selection; previous, next, close, and portal links.
- Keyboard activation, Tab containment, Escape, and focus restoration.
- Project category filtering and mobile menu anchor navigation.
- System reduced motion, changes while the page is open, and both theme choices.
- Separate education/certificate content and native experience disclosures.
- Modal entrance, project switching, and delayed exit with focus restoration.
- Mocked contact success/failure without sending messages.
- WebGL context loss and unavailable-WebGL fallback.
- Zero WebGL draw calls while idle/offscreen; rendering resumes on interaction.
- Consistent identity, canonical email, absolute LinkedIn/GitHub links, and résumé actions.

The production build and dependency audit are run before handoff.
No Lighthouse score, device-wide frame-rate guarantee, or live email-delivery
claim is made.
