---
name: DAML By Example
description: A developer documentation reference for learning DAML smart contracts through practical examples
colors:
  bg: "#ffffff"
  bg-dark: "#0a0a0b"
  fg: "#0a0a0b"
  fg-dark: "#fafafa"
  text-body: "#404040"
  text-body-dark: "#a3a3a3"
  text-muted: "#737373"
  text-muted-dark: "#737373"
  border: "#e5e5e5"
  border-dark: "#262626"
  surface-raised: "#fafafa"
  surface-raised-dark: "#171717"
  surface-hover: "#f5f5f5"
  surface-hover-dark: "#262626"
  accent: "oklch(45% 0.07 250)"
  accent-dark: "oklch(68% 0.09 250)"
  accent-soft: "oklch(60% 0.04 250)"
  accent-surface: "oklch(96% 0.01 250)"
  accent-surface-dark: "oklch(18% 0.02 250)"
  link: "oklch(42% 0.08 250)"
  link-dark: "oklch(72% 0.10 250)"
typography:
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  h1:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h3:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 600
    lineHeight: 1.4
  code:
    fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', Consolas, monospace"
    fontSize: "0.875em"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
    padding: "0"
    size: "36px"
  button-icon-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.text-muted}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
  code-block:
    backgroundColor: "{colors.surface-raised}"
    rounded: "{rounded.lg}"
    border: "{colors.border}"
  code-block-header:
    backgroundColor: "{colors.accent-surface}"
    border: "{colors.border}"
    padding: "8px 16px"
  sidebar-item-active:
    backgroundColor: "{colors.accent-surface}"
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
  sidebar-item-default:
    textColor: "{colors.text-muted}"
    rounded: "{rounded.md}"
---

# Design System: DAML By Example

## 1. Overview

**Creative North Star: "The Lab Notebook"**

A clean, methodical reference for DAML developers. Every element earns its place, nothing distracts from the code. The system treats the browser window like a lab bench: lay out your tools, reference the material, get back to building.

This design explicitly rejects blog-style layouts (hero images, narrative pull quotes, decorative illustration) and template-generated documentation chrome (Docusaurus/Nextra family resemblance). The interface is custom, deliberate, and invisible in use. Code blocks are the visual center of gravity on every page.

**Key Characteristics:**
- Tonal paper stacking as the only depth mechanism. No shadows, no gradients, no glass.
- A single muted steel-blue accent provides wayfinding (active sidebar item, links, section icons) without decoration. Applied on under 5% of any page.
- High information density paired with generous vertical rhythm. The reader never scrolls past chrome.
- Precision through consistency. The same heading hierarchy, spacing scale, and border treatment on every page.
- Developer-first: copy buttons on every code block, keyboard-navigable sidebar, sticky table of contents, Ctrl+K search.

## 2. Colors

A restrained monochrome palette anchored by a cool ash neutral, with a single muted steel-blue accent for wayfinding. No secondary or tertiary colors exist because no surface needs them.

### Neutral

- **Paper** (`#ffffff` / `#0a0a0b`): Main surface. The background of the reading area and sidebar.
- **Cold Ash** (`#fafafa` / `#171717`): Raised surfaces. Code block fallback backgrounds, subtle layer differentiation.
- **Hover Ash** (`#f5f5f5` / `#262626`): Interactive hover states. Sidebar items, icon buttons, border accents in dark mode.
- **Border Ash** (`#e5e5e5` / `#262626`): All borders. Dividers, code block borders, header bottom edge.
- **Body Ink** (`#404040` / `#a3a3a3`): Body text. Prose content only.
- **Muted Ink** (`#737373` / `#737373`): Muted text. Secondary labels, TOC entries, sidebar section headers.

### Primary

- **Steel Blue** (`oklch(45% 0.07 250)` / `oklch(68% 0.09 250)` dark): The single accent. Used for the CTA button background, active sidebar item text, content links, section icons on the landing page, breadcrumb final item, TOC active heading, and code block filename headers. Every application is functional: wayfinding, interaction hint, or state indicator.
- **Steel Tint** (`oklch(96% 0.01 250)` / `oklch(18% 0.02 250)` dark): The accent's surface layer. Used as the background for hover states on icon buttons, active sidebar items, search result hover, and code block filename headers.

### Named Rules

**The Paper Stack Rule.** Depth is conveyed exclusively through paper color stacking: white on `cold ash` on `hover ash`. No shadows, no elevation. The single exception is the search modal, which uses a single drop shadow (`shadow-2xl`) to separate it from the page as a distinct layer.

**The Functional Accent Rule.** The steel-blue accent is never decorative. Every application serves a functional purpose: indicating active state, marking interactive elements, or providing wayfinding. The accent appears on under 5% of any page. On doc pages, it appears only in the sidebar active item, content links, breadcrumb final item, and code block headers — never as a filled background.

## 3. Typography

**Display Font:** Inter (with ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** Inter (same stack)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Consolas fallback)

**Character:** A single humanist sans-serif throughout. No contrast pair, no decorative display weight. Inter at 400 body weight reads cleanly at small sizes; the mono face provides visual distinction for code without changing the family rhythm.

### Hierarchy

- **H1** (700, 1.875rem / 30px, 1.2): Page titles only. Used once per page. Tight tracking (-0.025em) for a technical feel.
- **H2** (600, 1.25rem / 20px, 1.3): Section headings. Underlined with a border-bottom in `border ash` to visually segment the page. Margin-top 2.5rem establishes clear section breaks.
- **H3** (600, 1.0625rem / 17px, 1.4): Sub-section headings. No underline, smaller step down.
- **Body** (400, 1rem / 16px, 1.75): All prose content. Color `body ink` for comfortable extended reading. Line length capped at 65-75ch by the max-w-4xl content container.
- **Label** (600 uppercase, 0.75rem / 12px, 0.05em tracking): Sidebar section headers, "On this page" TOC heading, code block filenames.
- **Code** (400, 0.875em): Inline code snippets and code block content.

### Named Rules

**The Single Scale Rule.** Four type sizes (0.75 / 1 / 1.0625 / 1.25 / 1.875 rem) with two weights (400, 600/700). That is the complete set. No intermediate sizes, no display cut, no italic. Hierarchy comes from weight contrast and spacing, not size proliferation.

## 4. Elevation

Flat by design. The system conveys depth exclusively through tonal paper stacking: white paper on `cold ash` paper on `hover ash` paper. No shadows, no `box-shadow` values, no `translateY` lift on hover. Borders (`border ash`) at the edges of raised surfaces provide the necessary separation.

The search modal is the single exception. It sits on a distinct visual layer above all content, signaled by `shadow-2xl` and a `backdrop-blur` overlay. This isolates it as a separate interaction context, not part of the paper stack hierarchy.

## 5. Components

### Buttons

- **Shape:** Rounded rectangle (`rounded-md`, 6px).
- **Icon buttons** (theme toggle, search, mobile menu): 36px square. Transparent background at rest, `steel tint` background with `steel blue` icon on hover. Outline with `border ash`. No text, only a 16px Lucide icon. Used in the header toolbar.
- **Primary CTA** ("Get Started"): `steel blue` background, white text. 36px height, 16px horizontal padding. Hover reduces opacity to 85%. Used exactly once: the landing page header.
- **State transitions:** `transition-colors` only. No scale, no lift, no shadow. Hover is a simple background tint shift (150ms).

### Sidebar Navigation

- **Width:** 256px. Fixed position on desktop, overlays on mobile.
- **Section header:** `Label` typography (12px uppercase), `muted ink`. Clickable to collapse/expand. Chevron icon (16px) indicates state.
- **Link items:** `Body` typography (14px), `muted ink` at rest. Active state: `steel tint` background, `steel blue` text. Hover: subtle `hover ash` at 50% opacity.
- **Spacing:** 2px horizontal padding inside items, 6px vertical. 16px gap between sections.
- **Scroll:** Overflow-y auto; the entire sidebar scrolls independently of the content area.

### CodeBlock

- **Shape:** Rounded rectangle (`rounded-lg`, 8px). Border: `border ash`.
- **Filename header** (optional): `Label` typography (12px). Background `steel tint`, text `steel blue`. Bottom border `border ash`. 8px vertical padding, 16px horizontal.
- **Code area:** 16px padding all sides. Background `cold ash` (fallback) or Shiki highlighted HTML. Overflow-x auto for long lines.
- **Copy button:** Positioned top-right, hidden at rest, appears on group hover. 28px square, `border ash`, white background. Icon changes to checkmark on copy. Fades at 0% -> 100% opacity on hover.
- **Inline code:** `0.875em` on the mono stack. Background `hover ash`, 6px horizontal / 2px vertical padding, rounded at 6px.

### Table of Contents

- **Width:** 224px. Sticky at 80px from top. Hidden below `xl` breakpoint.
- **Heading:** `Label` typography (12px uppercase, `muted ink`).
- **Items:** `Body` typography (14px) at `muted ink`. Active item: `steel blue` weight 500. H3 items indented 12px.
- **Interaction:** IntersectionObserver tracks the currently visible heading. No hover fill, no border indicator. Active state is purely a weight and color change.

### Header (Documentation Pages)

- **Height:** 64px. Sticky at top, `z-30`.
- **Background:** White at 95% opacity with `backdrop-blur`. On scroll, the border-bottom in `border ash` becomes visible.
- **Content:** Mobile menu button (left), search + theme toggle (right). Full-width inside the content area, not a full-viewport bar.

### Landing Cards

- **Shape:** Rounded rectangle (`rounded-lg`, 8px). Border `border ash`. No shadow.
- **Grid:** 3 columns on desktop, 2 on tablet, 1 on mobile. 16px gap.
- **Content:** Icon in `steel blue` (16px) + section title (`Label` typography), description (14px body), up to 3 links (14px with arrow, icon in `steel blue`).
- **Hover:** Border shifts one step (`border ash` to `border neutral-300`). No lift, no shadow, no background change.

### Search Modal

- **Shape:** Rounded rectangle (`rounded-xl`, 12px). `shadow-2xl` for layer separation. Max width 512px.
- **Overlay:** `rgba(0,0,0,0.5)` with `backdrop-blur-sm`. Full screen.
- **Input:** 48px height. Search icon (left), placeholder text, ESC badge (right). No border inside the modal top section.
- **Results:** Scroll area up to 320px. Result items: rounded at 8px, `steel tint` background on hover. Title in `steel blue`, excerpt in `muted ink` with line-clamp-1.

### Breadcrumb

- **Typography:** `Body` at 14px, `muted ink`. Chevron separator (12px) between items.
- **Last item:** `steel blue` color. Links are `muted ink` with hover color change to `steel blue`. No background, no border.

## 6. Do's and Don'ts

### Do:

- **Do** use the paper stack for depth. Layer `white` on `cold ash` on `hover ash` instead of adding shadows.
- **Do** keep code blocks as the most visually prominent element on every doc page. They are the reason the page exists.
- **Do** use the steel-blue accent only for functional purposes: active states, links, wayfinding icons. Never for decoration.
- **Do** respect the single scale rule. Four type sizes are enough.
- **Do** use the accent surface (`steel tint`) for hover backgrounds, active sidebar items, and code block headers. Keep it subtle.
- **Do** use `transition-colors` for state changes. Never animate layout properties.

### Don't:

- **Don't** use shadows, gradients, glassmorphism, or any decorative effect. The paper stack is the only depth system.
- **Don't** add hero images, pull quotes, narrative prose, or blog-style layouts. This is a developer reference, not a story.
- **Don't** use em dashes. Use commas, colons, or periods instead.
- **Don't** wrap content in cards nested inside other cards. Single-layer paper surfaces only.
- **Don't** add sidebar stripe borders (`border-left` or `border-right` greater than 1px as accent). Use the paper background or nothing.
- **Don't** create the hero-metric template (big number, small label, supporting stats). This is documentation, not a SaaS landing page.
- **Don't** reach for a modal as a first solution. Exhaust inline and progressive alternatives first.
- **Don't** increase the type scale. No display cut, no new sizes. The existing five work.
- **Don't** apply the steel-blue accent to filled backgrounds on doc pages. Its filled use is reserved for the landing page CTA only.
