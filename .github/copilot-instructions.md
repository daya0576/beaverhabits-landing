# Beaver Habits Landing Page

## Project Overview
Landing page for Beaver Habit Tracker SaaS - built with Astro 5, React Islands, and Tailwind CSS.

## Tech Stack
- **Astro 5.0** - Static Site Generator with Islands Architecture
- **React 19** - Interactive components (client-side only)
- **Tailwind CSS 4** - Utility-first styling with CSS @layer
- **TypeScript** - Strict type checking enabled

## Code Standards

### Design Philosophy
- **Minimal & Modern** - Clean, uncluttered layouts with ample white space
- **Content-first** - Visual hierarchy guides users to key information immediately
- **Bold typography** - Large, confident text for clear messaging
- **Subtle interactions** - Smooth transitions and hover states

### Language & Documentation
- **All code, comments, and documentation MUST be in English**
- Variable names, function names, types: English only
- Git commit messages: English only
- No Chinese or other languages in codebase

### Code Style
- Use functional components with hooks (no class components)
- Prefer `const` over `let`, avoid `var`
- Use TypeScript strict mode - no `any` types without explicit reason
- Tailwind classes over inline styles or CSS files
- Component file structure:
  ```
  imports
  types/interfaces
  component definition
  exports
  ```

### File Naming
- Components: `PascalCase.tsx` (e.g., `PricingCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatPrice.ts`)
- Pages: `kebab-case.astro` (e.g., `pricing-page.astro`)

### Astro Specific
- Use `.astro` for pages and layouts
- Use React (`.tsx`) only for interactive components that need client-side state
- Add `client:load` directive only when necessary
- Prefer `client:visible` for below-the-fold components

### Commit Messages
- Format: `type: description` (e.g., `feat: add pricing section`)
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Git Workflow
- **This is a submodule** of the main `beaverhabits` repository
- After accepting code changes, always commit and push:
  ```bash
  git add -A
  git commit -m "your message"
  git push origin main
  ```
- Remind the user to also update the parent repository after pushing submodule changes

## Vibe Coding Best Practices 2026
✨ Currently applying modern development patterns as we build:
- Ship-to-learn over perfect planning
- Composition over configuration
- Zero-config defaults with escape hatches
- Type-safe by default

## Project Status
🚧 Active development - building MVP
