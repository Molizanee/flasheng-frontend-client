# Design System Implementation Plan

## Objective
Implement the DevForge design PRD as the FlashEng design system foundation.

## Scope: Design System Only
- Design tokens (colors, typography, spacing, shadows, radii, motion)
- Font installation (Syne, DM Sans, JetBrains Mono)
- Lucide React icons (already installed)
- Base component updates (Button, Badge, GlassCard)
- New components (ScorePill, SectionCard, InlineCode, Toast, Skeleton, Modal)
- Update existing components to use new tokens
- Accessibility foundations

## Phases

### Phase 1: Tokens & Fonts
1.1 Update index.html fonts (Syne, DM Sans, JetBrains Mono replacing Inter)
1.2 Rewrite @theme block in src/index.css with full PRD token set
1.3 Add type scale utility classes

### Phase 2: CSS Utilities
2.1 Update glassmorphism styles
2.2 Add skeleton loader CSS
2.3 Update gradients from purple to blue accent
2.4 Add accessibility foundations (reduced motion, focus rings)

### Phase 3: Dependencies
3.1 Install lucide-react (DONE)

### Phase 4: Components
4.1 Update Button.tsx
4.2 Update Badge.tsx
4.3 Update GlassCard.tsx
4.4 Create ScorePill.tsx
4.5 Create SectionCard.tsx
4.6 Create InlineCode.tsx
4.7 Create Toast.tsx + ToastContext
4.8 Create Skeleton.tsx
4.9 Create Modal.tsx

### Phase 5: Migrate Existing Components
5.1 Navbar.tsx - new tokens + Lucide icons
5.2 Hero.tsx - new tokens + Lucide icons
5.3 ProblemSection, HowItWorks, Features, CTASection, Footer
5.4 Dashboard components (DashboardNavbar, ResumeGrid, ResumeCard)
5.5 Login.tsx, Generate.tsx (FileUpload, PixPayment, GenerationProgress)

### Phase 6: Verification
- Run tsc -b && vite build
- Fix any type or build errors

## Not in Scope
- No new pages
- No routing changes
- No layout restructuring
- No backend changes
- Brand stays "FlashEng"
- Language stays Portuguese
