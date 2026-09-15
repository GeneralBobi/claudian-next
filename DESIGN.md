---
name: claudian.app desktop
description: Existing dark desktop identity with an expressive companion extension.
colors:
  primary: "#d97757"
  background: "#0e0e10"
  surface: "#16161a"
  secondary-surface: "#1c1c21"
  divider: "#26262c"
  foreground: "#f2f0eb"
  muted: "#8d8a83"
  companion-secondary: "#b5b1a9"
typography:
  companion-title:
    fontFamily: "Lora, serif"
    fontSize: "27px"
    fontWeight: 500
    lineHeight: 1.4
  companion-body:
    fontFamily: "Lora, serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.8
  action:
    fontFamily: "Poppins, sans-serif"
    fontSize: "12px"
    fontWeight: 600
rounded:
  control: "6px"
  field: "4px"
spacing:
  action-gap: "8px"
  section-gap: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-secondary:
    backgroundColor: "{colors.secondary-surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
---

# Design System: claudian.app desktop

## Overview

**Creative North Star: "Bir asistandan, yol arkadaşına."**

The visual authority is the existing claudian.app website and its orange-dot wordmark. The earlier green/cream desktop design was rejected and must not be restored.

The companion extends that identity with a geometric screen character and a single contextual message. Its visible expression accompanies readable state text. Local note cues are a limited fallback; this visual system does not establish completed contextual reasoning.

**Key Characteristics:**
- Dark tonal surfaces and a warm orange accent.
- Poppins controls paired with Lora reading text.
- Companion expression follows application state and can be paused.

## Colors

### Primary

Warm orange marks the wordmark period, primary actions and visible keyboard focus.

### Neutral

Background, surface and secondary surface separate the desktop layers. Foreground carries primary text; muted supports chrome; the brighter companion secondary tone carries source and explanatory text.

**The Existing Identity Rule.** Preserve the orange-dot wordmark and the incumbent dark palette.

## Typography

Use the exact locally bundled Poppins 600/700, Lora 400/500 and JetBrains Mono families from the site. Companion headings use Poppins (25px, 600, 1.4); message titles and prose use the frontmatter roles. At the compact breakpoint, the heading becomes 22px and the message title 23px. Source and action text is 12px; expanded details are 13px. Functional text is at least 11px. Data-heavy paths and times can use monospace.

## Layout

The desktop setup is an Operate surface: a compact 720×640 first-run window with no dashboard navigation. Detect the environment, propose settings, reveal advanced choices on request, preview writes, execute real steps, and expose the installation log. Successful setup offers one action to open the main application. Returning users go directly to the panel.

The returning-user panel retains its header and navigation. The companion container caps at 1000px. Its character and message use a two-column grid with a 48px gap and 340px minimum stage height. At 740px and below, the gap is 24px, the character column is 190px, the stage minimum is 290px, and the source/action footer stacks. This is a desktop layout; the compact content may require vertical scrolling.

## Elevation & Depth

Desktop surfaces use tonal separation and thin dividers. The companion face adds one soft grounding shadow (0 18px 35px #0005); this is specific to the character, not a new card elevation scale.

## Shapes

Controls and cards retain the compact control radius. Text fields use the field radius. The companion is a rounded screen (48px radius, 35px compact) with two pill-shaped eyes and a small orange mouth. Its silhouette is an original geometric construction, not a copied reference asset.

## Components

### Buttons

Primary buttons use orange with dark text; secondary buttons use the raised dark surface. Both retain a thin border, orange hover border and visible orange focus outline (2px). Companion buttons have a 40px minimum height and a 4px focus offset. Disabled actions reduce opacity and cannot be activated.

### Inputs / Fields

Established text fields use a dark surface, thin border, field radius and orange focus. The companion password input currently inherits incomplete styling; it is not a canonical field variant.

### Navigation

Poppins tab buttons use muted text at rest and the standard surface with foreground text when active. Hover and keyboard focus remain visibly orange.

### Cards / Containers

Existing cards use the surface tone, divider border, compact control radius and 20px padding. The companion message sits directly on the page rather than acquiring another card container.

### Companion expression

**The Readable State Rule.** Character expression accompanies visible state text; it never substitutes for the error, source or action label.

Calm eyes blink on a 7s cycle. Attention turns the character toward the message. Waiting nods on a 1.6s ease-in-out cycle; acknowledgement nods once over 0.6s ease-out. Access failure shortens and tilts the eyes. Quiet mode stops animation and flattens the eyes; reduced-motion disables companion animation and transitions.

**The Scoped Motion Rule.** The user's expressive Loona/Hamroh companion direction authorizes authored character motion only on this companion surface. Preserve the incumbent restriction elsewhere: no authored animation, CSS keyframes or hand-coded motion; any new motion outside this scope needs an approved third-party asset with recorded license and source.

Sources: ui/companion-panel.css, ui/companion-panel.js, ui/styles.css, ui/fonts.css and ui/index.html; checked against .impeccable/review/desktop.png and minimum.png. PRODUCT.md and planning/COMPANION-SURFACE.md establish the approved scope.

Not canonized or repaired: the companion password field lacks the established field styling, and the pre-existing verification spinner conflicts with the older non-companion motion restriction. These are implementation drift outside this documentation change.

## Do's and Don'ts

### Do:
- **Do** brand the application as `claudian.app` with its orange period.
- **Do** keep source information, readable states, quiet mode and reduced-motion support visible or available.
- **Do** distinguish detection, configuration and verified access in setup status.

### Don't:
- **Don't** restore the rejected green/cream identity or invent a separate emblem, typography or palette.
- **Don't** add decorative gradients, an onboarding hero, statistic tiles or simulated progress.
- **Don't** imply the companion's contextual reasoning is complete; retain its development status.

