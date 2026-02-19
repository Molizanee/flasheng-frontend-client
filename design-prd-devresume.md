# Design PRD — DevForge Resume
### Product Design Requirements Document
**Version:** 1.0 | **Status:** Draft | **Last Updated:** 2026-02-19

---

## 0. Product Overview

**DevForge** is a SaaS platform that generates, tailors, and manages developer resumes. The core promise: _a developer's experience, skills, and impact — rendered beautifully and optimized intelligently for every job application._

Target users are mid-to-senior software engineers, tech leads, and engineering managers who want their resume to work as hard as they do.

---

## 1. Design Philosophy

### 1.1 Conceptual Direction

> **"Terminal meets Portfolio."**

The aesthetic lives between a premium dark IDE and an engineering portfolio site. It should feel like something a Staff Engineer at a top-tier company *built for themselves* — not a HR tool dressed in dark mode. The design communicates precision, technical credibility, and quiet confidence.

Every element earns its place. Data density is high, chrome is low.

### 1.2 Design Principles

| Principle | Meaning in Practice |
|---|---|
| **Signal over Noise** | Remove decorative elements that don't carry information. Every pixel works. |
| **Earned Complexity** | The interface reveals complexity progressively. First-time users see simplicity; power users find depth. |
| **Terminal Credibility** | Typography, spacing and color should resonate with engineers. Monospace as an accent is intentional. |
| **Precision Motion** | Animations are purposeful — they communicate state, not personality. |
| **Dark by Default** | Dark theme is primary. Light is an option, never the hero. |

---

## 2. Visual Design System

### 2.1 Color System

#### Base Palette (Dark Theme — Primary)

```
Background Layer Stack:
  --color-bg-void:        #080B12   /* Deepest surface — app shell */
  --color-bg-base:        #0D1117   /* Primary page background */
  --color-bg-elevated:    #141A24   /* Cards, panels */
  --color-bg-overlay:     #1C2333   /* Modals, dropdowns, floating layers */
  --color-bg-subtle:      #232D3F   /* Hover states, subtle separators */
```

```
Border / Divide:
  --color-border-faint:   #1E2A3A   /* Structural grid lines */
  --color-border-default: #263044   /* Card edges, input borders */
  --color-border-active:  #3A4F6B   /* Active/focused element borders */
```

```
Brand / Accent (Electric Blue):
  --color-accent-primary:   #3B82F6   /* CTAs, active nav, links */
  --color-accent-secondary: #60A5FA   /* Hover accent, highlights */
  --color-accent-glow:      #3B82F620 /* Blur glow behind accent elements */
  --color-accent-subtle:    #3B82F610 /* Tinted surface for selected states */
```

```
Semantic Colors:
  --color-success:    #22C55E   /* Match scores high, ATS pass */
  --color-warning:    #F59E0B   /* Medium scores, suggestions */
  --color-danger:     #EF4444   /* ATS fails, missing keywords */
  --color-info:       #6366F1   /* AI-generated content badge */

  --color-success-subtle:  #22C55E12
  --color-warning-subtle:  #F59E0B12
  --color-danger-subtle:   #EF444412
  --color-info-subtle:     #6366F112
```

```
Text Hierarchy:
  --color-text-primary:   #F1F5F9   /* Headlines, primary content */
  --color-text-secondary: #94A3B8   /* Body text, descriptions */
  --color-text-tertiary:  #4E6380   /* Labels, metadata, placeholders */
  --color-text-disabled:  #2D3E52   /* Inactive states */
  --color-text-accent:    #60A5FA   /* Inline links, accent text */
  --color-text-code:      #7DD3FC   /* Inline code, tech keywords */
```

#### Light Theme Overrides

The light theme inverts the surface stack, keeps the accent palette, and uses warm-white backgrounds to avoid sterile clinical white.

```
  --color-bg-void:        #F8FAFC
  --color-bg-base:        #FFFFFF
  --color-bg-elevated:    #F1F5F9
  --color-bg-overlay:     #E2E8F0
  --color-text-primary:   #0F172A
  --color-text-secondary: #475569
  --color-text-tertiary:  #94A3B8
  --color-border-default: #CBD5E1
```

---

### 2.2 Typography

#### Font Stack

| Role | Font | Fallback | Weight Range |
|---|---|---|---|
| **Display / Hero** | `Syne` | `sans-serif` | 700, 800 |
| **UI / Body** | `DM Sans` | `sans-serif` | 400, 500, 600 |
| **Monospace / Code** | `JetBrains Mono` | `monospace` | 400, 500 |

> **Rationale:** Syne brings angular, engineered character to headlines without feeling decorative. DM Sans has humanist warmth for readability at density. JetBrains Mono is the gold standard for developer tooling — using it triggers familiarity and trust.

#### Type Scale

```
Display XL:  Syne 800 / 64px / line-height: 1.0 / letter-spacing: -2px
Display L:   Syne 700 / 48px / line-height: 1.05 / letter-spacing: -1.5px
Heading 1:   Syne 700 / 36px / line-height: 1.1  / letter-spacing: -1px
Heading 2:   DM Sans 600 / 24px / line-height: 1.3
Heading 3:   DM Sans 600 / 18px / line-height: 1.4
Body L:      DM Sans 400 / 16px / line-height: 1.6
Body M:      DM Sans 400 / 14px / line-height: 1.6
Body S:      DM Sans 400 / 12px / line-height: 1.5
Label:       DM Sans 500 / 11px / line-height: 1.4 / letter-spacing: 0.08em / UPPERCASE
Code:        JetBrains Mono 400 / 13px / line-height: 1.6
```

---

### 2.3 Spacing & Layout Grid

#### Base Unit

All spacing is based on a **4px base unit**. Use the following named steps:

```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

#### Grid System

| Context | Columns | Gutter | Max Width |
|---|---|---|---|
| **App Shell** | 12 | 24px | 1440px |
| **Dashboard** | 12 | 20px | 1280px |
| **Editor (two-pane)** | 6+6 | 0 (flush split) | 100% |
| **Marketing / Landing** | 12 | 24px | 1200px |
| **Resume Preview** | Fixed | — | 794px (A4 width) |

#### Border Radius

```
--radius-sm:  4px   /* Tags, badges */
--radius-md:  8px   /* Inputs, small cards */
--radius-lg:  12px  /* Cards, panels */
--radius-xl:  16px  /* Modals, large surfaces */
--radius-2xl: 24px  /* Hero cards, CTA blocks */
--radius-full: 9999px /* Pills, avatars */
```

---

### 2.4 Elevation & Depth

Depth is achieved with layered box-shadows and border-glow, not traditional drop-shadows.

```
--shadow-none:    none
--shadow-sm:      0 0 0 1px var(--color-border-faint)
--shadow-md:      0 0 0 1px var(--color-border-default),
                  0 4px 16px rgba(0,0,0,0.3)
--shadow-lg:      0 0 0 1px var(--color-border-active),
                  0 8px 32px rgba(0,0,0,0.5)
--shadow-glow:    0 0 0 1px var(--color-accent-primary),
                  0 0 24px var(--color-accent-glow)
--shadow-float:   0 0 0 1px var(--color-border-default),
                  0 20px 60px rgba(0,0,0,0.6)
```

---

### 2.5 Iconography

- **Library:** [Lucide Icons](https://lucide.dev) — consistent stroke weight (1.5px), geometric, aligned with the clean tech aesthetic.
- **Sizes:** 14px (dense UI) / 16px (default) / 20px (actions) / 24px (feature icons)
- **Color:** Inherit from text hierarchy — icon color matches its surrounding text role.
- **Tech Skill Icons:** [Devicons](https://devicons.github.io/devicon/) for language/framework logos inside skill tags.

---

### 2.6 Glassmorphism & Surface Treatments

Used selectively on floating elements (modals, tooltips, score panels) — **not** on every card.

```css
/* Floating Glass Panel */
.glass-panel {
  background: rgba(20, 26, 36, 0.75);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-top-color: rgba(255, 255, 255, 0.12); /* Top edge highlight */
}
```

---

## 3. Page Layout & Wireframes

### 3.1 Information Architecture

```
DevForge/
├── / (Landing Page)
├── /auth
│   ├── /login
│   └── /signup
├── /dashboard          — Resume index + activity feed
├── /resume
│   ├── /new            — Onboarding wizard
│   ├── /:id/edit       — Main editor (two-pane)
│   └── /:id/preview    — Full-screen preview + export
├── /tailor             — Job description input + AI tailoring
├── /analytics          — ATS score history, keyword gaps
└── /settings
    ├── /profile
    ├── /integrations    — GitHub, LinkedIn import
    └── /billing
```

---

### 3.2 Landing Page Layout

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                 │
│  [Logo]  Overview · Features · Pricing · Docs    [CTA] │
├─────────────────────────────────────────────────────────┤
│  HERO SECTION (100vh)                                   │
│                                                         │
│  ● Live ATS Score Monitor          [status pill]        │
│                                                         │
│  Engineered Resumes                                     │
│  For Developers                                         │
│  Who Ship.                [3D Chrome Letter / Token]    │
│                                                         │
│  [Subheadline — 2 lines max]                            │
│  [Primary CTA]  [Secondary CTA — Import from GitHub]   │
│                                                         │
│  ─────── Trusted by engineers at ───────               │
│  [Logo strip: Google / Stripe / Vercel / Linear / AWS] │
├─────────────────────────────────────────────────────────┤
│  FEATURES SECTION                                       │
│  [Section label pill: ● AI Engine]                      │
│                                                         │
│  "The Engine Behind                                     │
│   Intelligent Resumes"                                  │
│                                                         │
│  [Flow diagram: GitHub → DevForge → Tailored Resume]   │
│   Input Sources    Platform          Output             │
├─────────────────────────────────────────────────────────┤
│  LIVE METRICS TABLE                                     │
│  "Real ATS Performance, In Real Time"                   │
│                                                         │
│  ┌──────┬──────┬────────┬──────────┬──────────────┐    │
│  │ Role │ ATS  │ Match% │ Keywords │ Template     │    │
│  ├──────┼──────┼────────┼──────────┼──────────────┤    │
│  │ SWE  │ 94%  │ ▲+2.1% │ 47/50    │ Minimal Pro  │    │
│  │ SRE  │ 88%  │ ▼-0.3% │ 38/44    │ Technical    │    │
│  │ EM   │ 91%  │ ▲+1.8% │ 52/57    │ Leadership   │    │
│  └──────┴──────┴────────┴──────────┴──────────────┘    │
├─────────────────────────────────────────────────────────┤
│  SECURITY / TRUST SECTION                               │
│  "Your Data. Your Career. Protected."                   │
│  [Three feature cards in row — glass style]             │
│   Privacy Layer · Zero-Log AI · Export Ownership        │
├─────────────────────────────────────────────────────────┤
│  PRICING SECTION                                        │
│  [Three-tier cards — Starter / Pro / Team]              │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                 │
└─────────────────────────────────────────────────────────┘
```

**Layout Annotations:**
- Hero uses a **12-column asymmetric split**: text content on columns 1–6, 3D visual asset on columns 7–12.
- Sticky navbar with `backdrop-filter: blur(20px)` on scroll.
- Hero background: animated gradient mesh with subtle noise texture.

---

### 3.3 Dashboard Layout

```
┌──────────┬──────────────────────────────────────────────┐
│ SIDEBAR  │  HEADER                                       │
│  Logo    │  Dashboard           [Search] [Notif] [Ava]  │
│  ──────  ├───────────────────────────────────────────── │
│  Overview│  STAT CARDS ROW (4 cols)                     │
│  Resumes │  ┌──────────┐┌──────────┐┌──────┐┌────────┐ │
│  Tailor  │  │ Resumes  ││ Avg ATS  ││Apps  ││Exports │ │
│  Analyt. │  │    7     ││  91.4%   ││  24  ││   18   │ │
│  Integr. │  └──────────┘└──────────┘└──────┘└────────┘ │
│  ──────  ├───────────────────────────────────────────── │
│  Settings│  RESUME GRID                  ACTIVITY FEED  │
│  Help    │  ┌──────────┐ ┌──────────┐  ┌─────────────┐ │
│          │  │ Resume 1 │ │ Resume 2 │  │ ● Tailored  │ │
│          │  │ SWE @ G  │ │ SRE @ CF │  │   2h ago    │ │
│          │  │ ATS: 94% │ │ ATS: 88% │  │ ● Exported  │ │
│  ──────  │  │ [Edit]   │ │ [Edit]   │  │   5h ago    │ │
│  [User]  │  └──────────┘ └──────────┘  │ ● Score ▲   │ │
│          │  ┌──────────┐ ┌──────────┐  │   Yesterday │ │
│          │  │ Resume 3 │ │  [+ New] │  └─────────────┘ │
│          │  │ EM @ Lin │ │          │                   │
│          │  │ ATS: 91% │ │          │                   │
│          │  └──────────┘ └──────────┘                   │
└──────────┴──────────────────────────────────────────────┘
```

**Sidebar specs:**
- Width: `240px` collapsed → `64px` icon-only on small screens
- Background: `--color-bg-void`
- Active nav item: left border `3px solid --color-accent-primary` + `--color-accent-subtle` background

**Resume cards:**
- Dimensions: ~280px × 200px
- Show template thumbnail (miniaturized render of the actual resume)
- Hover: `--shadow-glow`, slight `translateY(-2px)` lift
- Status badge: ATS score pill with color-coded tier

---

### 3.4 Resume Editor Layout (Two-Pane)

The editor is the **core product surface**. Two equal panes, zero gutter — the split is structural.

```
┌─────────────────────────────────────────────────────────────────┐
│ EDITOR TOPBAR                                                   │
│ [← Back]  "Senior SWE @ Google"  [Autosaved ✓]  [Tailor] [Export ▾]│
├────────────────────────────────┬────────────────────────────────┤
│  EDITOR PANE (Left)            │  PREVIEW PANE (Right)          │
│  bg: --color-bg-base           │  bg: #1a1a1a (simulates paper) │
│                                │                                │
│  ┌─ SECTION: Work Experience ─┐│  ╔══════════════════════════╗  │
│  │ ┌─────────────────────────┐││  ║  JOHN DOE                ║  │
│  │ │ Job Title _____________ │││  ║  Senior Software Engineer ║  │
│  │ │ Company  _____________ │││  ║  john@email.com · GitHub  ║  │
│  │ │ Date Range ────── ───  │││  ╠══════════════════════════╣  │
│  │ │                        │││  ║  EXPERIENCE              ║  │
│  │ │ • Bullet 1 ____________│││  ║  Google · 2021–Present   ║  │
│  │ │   [AI: Quantify this ↗]│││  ║  • Led migration of...   ║  │
│  │ │ • Bullet 2 ____________│││  ║  • Reduced latency 40%   ║  │
│  │ └─────────────────────────┘││  ╠══════════════════════════╣  │
│  │ [+ Add Experience]          ││  ║  SKILLS                  ║  │
│  └─────────────────────────────┘│  ║  Go · Node.js · K8s...  ║  │
│                                │  ╚══════════════════════════╝  │
│  ┌─ ATS SCORE PANEL ──────────┐│                                │
│  │ ████████░░  82%  GOOD      │├────────────────────────────────┤
│  │ Missing: "distributed sys" │  PREVIEW TOOLBAR                │
│  │         "system design"    │  [A4/Letter] [Zoom: 85%] [Theme]│
│  └─────────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────┘
```

**Editor pane details:**
- Section headers: monospace label pill `WORK EXPERIENCE` with left-accent line
- Fields: borderless on default, `--color-border-active` on focus
- AI suggestion inline callouts: right-aligned, accent colored, dismissible
- Section reordering: drag handle on hover (left side of section block)

**Preview pane details:**
- Renders actual resume as live HTML/CSS — no iframe lag
- Page shadow: `box-shadow: 0 4px 40px rgba(0,0,0,0.8)` — the resume floats
- Page background stays dark (`#1a1a1a`) but the A4 page itself is white or dark (template-dependent)
- Scroll is independent from editor pane

---

### 3.5 AI Tailoring Page Layout

```
┌──────────────────────────────────────────────────────────┐
│ HEADER: "Tailor Resume to Job"                           │
├─────────────────────────┬────────────────────────────────┤
│  JOB INPUT (Left)       │  ANALYSIS OUTPUT (Right)       │
│                         │                                │
│  ┌─ Source ──────────┐  │  ┌─ Match Score ─────────────┐ │
│  │ ○ Paste JD        │  │  │  ████████████░░  87%       │ │
│  │ ○ URL             │  │  │  "Strong Match"             │ │
│  │ ○ LinkedIn URL    │  │  └───────────────────────────┘ │
│  └───────────────────┘  │                                │
│                         │  ┌─ Keyword Gaps ────────────┐ │
│  ┌─ Job Description ─┐  │  │ ✓ Kubernetes      present │ │
│  │                   │  │  │ ✓ Go              present │ │
│  │  [paste here...]  │  │  │ ✗ gRPC            MISSING │ │
│  │                   │  │  │ ✗ distributed sys MISSING │ │
│  └───────────────────┘  │  └───────────────────────────┘ │
│                         │                                │
│  Select base resume:    │  ┌─ AI Suggestions ──────────┐ │
│  [Resume dropdown ▾]    │  │ Bullet 3, Job 1:           │ │
│                         │  │ "Improved" → "Reduced API  │ │
│  [Analyze & Tailor →]   │  │  latency by 40% via gRPC   │ │
│                         │  │  migration across 5 svcs"  │ │
│                         │  │ [Apply] [Dismiss]           │ │
│                         │  └───────────────────────────┘ │
└─────────────────────────┴────────────────────────────────┘
```

---

### 3.6 Onboarding Wizard (3-Step)

Progress: `[Import] → [Review] → [Customize]`

- **Step 1 — Import:** GitHub OAuth + LinkedIn URL + manual input. Each option is a large selectable card (icon + title + description).
- **Step 2 — Review:** Auto-parsed resume sections displayed in a read-only preview for confirmation and quick edits.
- **Step 3 — Customize:** Template selection (3 visible tiles + more on scroll), color scheme picker, font choice.

Each wizard step is centered, max-width `640px`, with generous vertical padding. Background is `--color-bg-void` with a faint grid pattern.

---

## 4. Motion & Interaction Guidelines

### 4.1 Timing & Easing Reference

```
--ease-default:  cubic-bezier(0.16, 1, 0.3, 1)    /* Snappy overshoot — UI transitions */
--ease-smooth:   cubic-bezier(0.4, 0, 0.2, 1)      /* Standard material ease */
--ease-enter:    cubic-bezier(0, 0, 0.2, 1)         /* Elements appearing */
--ease-exit:     cubic-bezier(0.4, 0, 1, 1)         /* Elements disappearing */
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1)  /* Springy — for delight moments only */

--duration-instant: 80ms    /* Immediate feedback (button click) */
--duration-fast:    150ms   /* Hover states, toggles */
--duration-default: 250ms   /* Most transitions */
--duration-slow:    400ms   /* Page transitions, modals */
--duration-crawl:   700ms   /* Hero animations, onboarding */
```

---

### 4.2 Page-Level Transitions

**Dashboard → Editor:**
The resume card expands using a **shared element transition** (View Transitions API). The card morphs into the editor shell — this communicates continuity and avoids a jarring page jump.

```
Timeline:
  0ms    → Card scales up, border-radius collapses (0ms–200ms)
  150ms  → Editor pane fades in from left (opacity: 0→1)
  200ms  → Preview pane slides in from right (translateX: 24px→0)
  300ms  → Topbar fades in + ATS panel slides up from bottom
```

**Editor Autosave Feedback:**
Small status text transitions: `Saving...` → `Saved ✓` with a 1-second green tint pulse on the status chip. Never a full toast — it's a status update, not an event.

---

### 4.3 Micro-Interactions

#### ATS Score Bar

When a section is edited and a new score is computed, the score bar animates:

```
1. Bar width transitions over 600ms with --ease-default
2. Score number counts up/down (JS counter animation, 400ms)
3. If score improves: bar glows green for 800ms then fades
4. If score drops: bar pulses amber for 600ms then normalizes
```

#### AI Suggestion Appearance

When an AI suggestion is generated, it enters with:

```
  translateY: 8px → 0 (150ms, --ease-enter)
  opacity: 0 → 1 (200ms)
  Left border accent: width 0 → 3px (100ms delay)
```

"Apply" button click: the suggestion block collapses with height animation, the corresponding resume bullet in the preview flashes briefly (background: `--color-info-subtle`) to confirm the change.

#### Resume Card Hover (Dashboard)

```css
.resume-card {
  transition: transform 200ms var(--ease-default),
              box-shadow 200ms var(--ease-default);
}
.resume-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}
```

#### Button States

```
Default   → background: --color-bg-elevated, border: --color-border-default
Hover     → background: --color-bg-subtle, border: --color-border-active (150ms)
Active    → scale: 0.97 (80ms, --ease-exit) → scale: 1 (150ms, --ease-spring)
Loading   → spinner replaces icon, button width locked (no layout shift)
Success   → brief green tint (300ms), returns to default (500ms)
```

#### Navigation Sidebar Active State

Active link indicator (left border + background):

```
  On route change: indicator slides from previous position to new one
  (position transition: 200ms --ease-default)
  Background tint: opacity 0→1 (150ms)
```

---

### 4.4 Scroll-Triggered Animations (Landing Page)

All sections below the fold use a single entrance pattern for consistency. Use `IntersectionObserver` with a threshold of `0.15`:

```
Staggered reveal group:
  Parent: no animation
  Child N:
    opacity: 0 → 1
    translateY: 20px → 0
    duration: 500ms
    delay: N × 80ms
    easing: --ease-enter
```

The **live metrics table** (landing page) simulates live data: values update every 4–6 seconds with a subtle row flash (`background: --color-accent-subtle`) for the updated cell.

---

### 4.5 Loading & Skeleton States

**General skeletons:**

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-elevated) 25%,
    var(--color-bg-subtle) 50%,
    var(--color-bg-elevated) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**AI Processing State (Tailoring page):**

A full-screen overlay with terminal-style streaming text is displayed while AI analyzes the job description:

```
Analyzing job description...
Mapping skill keywords...
Scoring against resume...       ████████░░░  82%
Generating suggestions...
```

Each line appears sequentially. Progress bar fills in 3–5 seconds. This is the one "theatrical" moment in the product — the user should feel the engine working.

---

### 4.6 Modal & Overlay Behavior

```
Enter:
  Backdrop: opacity 0 → 0.6 (200ms)
  Modal panel: opacity 0→1, translateY: 16px→0, scale: 0.97→1 (250ms, --ease-enter)

Exit:
  Backdrop: opacity → 0 (150ms)
  Modal panel: opacity → 0, translateY: 0→8px (180ms, --ease-exit)
```

Focus trap is active while modal is open. `Escape` key dismisses with exit animation.

---

## 5. Component Quick Reference

| Component | Key Specs |
|---|---|
| **Primary Button** | bg: accent-primary, h: 40px, px: 20px, radius-md, font: DM Sans 500 14px |
| **Ghost Button** | border: border-default, transparent bg, same sizing |
| **Input Field** | h: 40px, bg: bg-elevated, border: border-default → border-active on focus |
| **Badge / Tag** | radius-full, px: 10px, py: 3px, font: Label (11px uppercase), semantic colors |
| **Score Pill** | Monospace, color-coded: ≥90% success, 75-89% warning, <75% danger |
| **Section Card** | bg: bg-elevated, shadow-md, radius-lg, p: space-6 |
| **Glass Card** | `.glass-panel` mixin, radius-xl, used for modals/overlays only |
| **Inline Code** | JetBrains Mono, text-code color, bg: bg-subtle, px: 6px, radius-sm |
| **Skeleton** | shimmer animation, radius matching the element it replaces |
| **Toast / Alert** | Bottom-right, max-width 360px, 4-second autodismiss, stacks upward |

---

## 6. Accessibility Baseline

- **Contrast ratio:** All text/background combinations must meet WCAG AA (4.5:1 body, 3:1 large text). `--color-text-secondary` on `--color-bg-base` passes at 5.2:1.
- **Focus rings:** `outline: 2px solid var(--color-accent-primary); outline-offset: 2px` — never remove focus outlines.
- **Reduced motion:** Wrap all `animation` and `transition` declarations in `@media (prefers-reduced-motion: no-preference)`. Fallback is instant state change.
- **Semantic HTML:** Section headings maintain logical hierarchy (`h1` only once per page). Editor uses `<form>` with labelled inputs.
- **Keyboard navigation:** Full editor operable via keyboard. Tab order follows visual reading order.

---

## 7. Design Token Delivery

Tokens are distributed in three formats:

1. **CSS Custom Properties** — consumed directly in web app (`tokens.css`)
2. **JSON** — for design tool sync and potential React Native use (`tokens.json`)
3. **Figma Variables** — imported via the Tokens Studio plugin

All changes to design tokens go through a PR in the design system repository. Breaking changes (renaming, removing tokens) require a migration note.

---

*End of Document*
