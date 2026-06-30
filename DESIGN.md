# The Voltage - Design System Documentation

## Overview

This document describes the typography and spacing design system for The Voltage church website. The design system provides a consistent set of tokens and utilities for styling across the public-facing pages and admin dashboard.

---

## Design Tokens

### Location
- **Main tokens file**: `app/design-tokens.css`
- **Typography utilities**: `app/typography-utilities.css`

### Font Families

| Token | Usage | Example |
|-------|-------|---------|
| `--font-family-body` | Primary body text | Inter (fallback: system-ui) |
| `--font-family-display` | Headings and display text | Copperplate Bold |
| `--font-family-display-medium` | Medium weight headings | Copperplate Medium |
| `--font-family-display-light` | Light weight headings | Copperplate Light |
| `--font-family-display-condensed` | Condensed headings | Copperplate Condensed |
| `--font-family-mono` | Code blocks | SF Mono, Fira Code |

### Typography Scale

| Token | Size | Usage |
|-------|------|-------|
| `--font-size-xs` | 12px | Captions, labels |
| `--font-size-sm` | 14px | Secondary text, buttons |
| `--font-size-base` | 16px | Body text |
| `--font-size-lg` | 18px | Large body, small headings |
| `--font-size-xl` | 20px | H4 headings |
| `--font-size-2xl` | 24px | H3 headings |
| `--font-size-3xl` | 30px | H2 headings |
| `--font-size-4xl` | 36px | H1 headings |
| `--font-size-5xl` | 48px | Hero/display text |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Emphasized text |
| `--font-weight-semibold` | 600 | Headings, buttons |
| `--font-weight-bold` | 700 | Strong emphasis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-tight` | 1.25 | Headings |
| `--line-height-normal` | 1.5 | Body text |
| `--line-height-relaxed` | 1.75 | Large text, quotes |

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--letter-spacing-tight` | -0.02em | Large headings |
| `--letter-spacing-normal` | 0 | Body text |
| `--letter-spacing-wide` | 0.02em | Small caps, labels |
| `--letter-spacing-wider` | 0.05em | Buttons, navigation |

### Spacing Scale

| Token | Size | Usage |
|-------|------|-------|
| `--space-1` | 4px | Tight spacing |
| `--space-2` | 8px | Component internal spacing |
| `--space-3` | 12px | Related elements |
| `--space-4` | 16px | Standard spacing |
| `--space-5` | 20px | Paragraph spacing |
| `--space-6` | 24px | Section padding |
| `--space-8` | 32px | Large gaps |
| `--space-10` | 40px | Section separators |
| `--space-12` | 48px | Major sections |
| `--space-16` | 64px | Page margins |

---

## Typography Utility Classes

### Heading Classes

Use these classes for semantic HTML heading elements with proper brand styling:

```tsx
// H1 - Main page headings
<h1 className="h1">Welcome to The Voltage</h1>

// H2 - Section headings
<h2 className="h2">Our Mission</h2>

// H3 - Subsection headings
<h3 className="h3">Join Us This Sunday</h3>

// H4 - Minor headings
<h4 className="h4">Service Times</h4>
```

### Body Text Classes

```tsx
// Large body - Featured content
<p className="text-body-lg">Featured content paragraph</p>

// Standard body - Regular content
<p className="text-body">Regular paragraph text</p>

// Small body - Supporting text
<p className="text-body-sm">Meta information, captions</p>

// Lead - Introduction text
<p className="text-lead">Welcome message introduction</p>
```

### Display Classes

```tsx
// Hero/Display text - Large promotional
<h1 className="text-display">Experience God</h1>
```

### Semantic Classes

```tsx
// Labels (form labels, tags)
<label className="text-label">Full Name</label>

// Quotes (scripture, testimonials)
<blockquote className="text-quote">For God so loved the world...</blockquote>

// Navigation links
<nav className="text-nav-link">Home</nav>

// Button text
<button className="text-btn">Learn More</button>
```

### Font Family Classes

```tsx
// Body font (Inter)
<p className="font-body">Body text</p>

// Display fonts (Copperplate)
<h1 className="font-display">Heading</h1>
<h1 className="font-display-medium">Medium heading</h1>
<h1 className="font-display-light">Light heading</h1>
<h1 className="font-display-condensed">Condensed</h1>
```

### Font Size Classes

```tsx
<p className="text-5xl">Extra large</p>
<p className="text-4xl">Very large</p>
<p className="text-3xl">Large</p>
<p className="text-2xl">Medium large</p>
<p className="text-xl">Large</p>
<p className="text-lg">Medium</p>
<p className="text-base">Base (default)</p>
<p className="text-sm">Small</p>
<p className="text-xs">Extra small</p>
```

### Weight Classes

```tsx
<p className="font-regular">Regular (400)</p>
<p className="font-medium">Medium (500)</p>
<p className="font-semibold">Semibold (600)</p>
<p className="font-bold">Bold (700)</p>
```

### Line Height Classes

```tsx
<p className="leading-tight">Tight line height (1.25)</p>
<p className="leading-normal">Normal line height (1.5)</p>
<p className="leading-relaxed">Relaxed line height (1.75)</p>
```

### Letter Spacing Classes

```tsx
<p className="tracking-tight">Tight (-0.02em)</p>
<p className="tracking-normal">Normal (0)</p>
<p className="tracking-wide">Wide (0.02em)</p>
<p className="tracking-wider">Wider (0.05em)</p>
```

---

## Responsive Typography

### Responsive Heading Classes

Tablet and desktop breakpoints have enhanced heading sizes:

```tsx
// Mobile (default)
<h1 className="h1">36px</h1>

// Tablet (768px+) - Add tablet: prefix
<h1 className="tablet:h1">40px</h1>

// Desktop (1024px+) - Add desktop: prefix
<h1 className="desktop:h1">48px</h1>
```

### Available Responsive Classes

| Class | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `.h1` / `.tablet:h1` / `.desktop:h1` | 36px | 40px | 48px |
| `.h2` / `.tablet:h2` / `.desktop:h2` | 30px | 32px | 36px |
| `.h3` / `.tablet:h3` / `.desktop:h3` | 24px | 24px | 28px |
| `.text-display` / `.tablet:text-display` / `.desktop:text-display` | 48px | 56px | 64px |

---

## Accessibility Considerations


### Screen Reader Only Text

Use `.sr-only` for text that should be visually hidden but available to screen readers:

```tsx
<span className="sr-only">Menu</span>
```

### Focus States

Ensure keyboard navigation focus is visible:

```tsx
<a href="#" className="focus-visible">Link</a>
```

The `.focus-visible` class provides an accessible focus indicator with the warm brown accent color.

### Text Contrast

All text colors should maintain a minimum 4.5:1 contrast ratio for body text and 3:1 for large text. Color tokens are defined in globals.css and should be used appropriately.

### Semantic HTML

Always use semantic HTML elements with appropriate heading hierarchy:

```tsx
// Correct - Logical heading structure
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

// Incorrect - Skipped heading levels
<h1>Page Title</h1>
  <h3>Subsection</h3>
```

---

## Legacy Support

### Poppins Font

Poppins is still available for backward compatibility with existing components:

```tsx
// Legacy - still works but Inter is preferred
<p className="font-poppins">Legacy text</p>
```

### Existing Color Tokens

These tokens remain unchanged for backward compatibility:
- `--color-cream`: #FAF7F0
- `--color-black`: #1A1A1A
- `--color-white`: #FFFFFF
- `--color-light-dark`: #4A4A4A
- `--color-warm-brown`: #8B7355

---

## File Structure

```
app/
├── design-tokens.css      # All CSS custom properties (tokens)
├── typography-utilities.css  # Utility classes
├── globals.css            # Main CSS - imports tokens
├── layout.tsx             # Root layout - loads fonts
├── admin/
│   ├── globals-admin.css  # Admin-specific styles
│   └── layout.tsx         # Admin layout
└── [page folders]         # Public pages
```

---

## Usage Examples

### Complete Component Example

```tsx
export function HeroSection() {
  return (
    <section className="py-16 px-4">
      <h1 className="text-display mb-4">
        Welcome to The Voltage
      </h1>
      <p className="text-body-lg text-center max-w-2xl mx-auto">
        We are the voice of this age, a community dedicated to 
        spreading God's love and message.
      </p>
      <div className="mt-8 flex gap-4 justify-center">
        <button className="text-btn bg-black text-white px-6 py-3">
          Join Us
        </button>
        <button className="text-btn border-2 border-black px-6 py-3">
          Learn More
        </button>
      </div>
    </section>
  );
}
```

### Form Component Example

```tsx
export function ContactForm() {
  return (
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="text-label block mb-2">
          Your Name
        </label>
        <input 
          id="name" 
          type="text" 
          className="text-body w-full p-3 border"
          placeholder="John Doe"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-label block mb-2">
          Message
        </label>
        <textarea 
          id="message" 
          className="text-body w-full p-3 border"
          rows={4}
        />
      </div>
      <button type="submit" className="text-btn bg-black text-white px-6 py-3">
        Send Message
      </button>
    </form>
  );
}
```

---

## Implementation Notes

1. **CSS Custom Properties**: All token values are defined as CSS custom properties, enabling future theming and dynamic styling.

2. **Tailwind Integration**: The design tokens are integrated with Tailwind CSS via the `@theme inline` directive in globals.css.

3. **Font Loading**: Inter is loaded via next/font/google with `display: swap` for optimal performance. Copperplate fonts are loaded as local fonts.

4. **Mobile-First**: Typography classes use mobile-first sizing with responsive overrides for tablet and desktop breakpoints.

5. **Design Token Imports**: The design-tokens.css and typography-utilities.css are imported at the top of globals.css, ensuring tokens are available before any component styles.

---

## Maintenance

When updating typography:

1. Update the token value in `design-tokens.css`
2. Typography utility classes will automatically reflect the change
3. Document any new tokens in this file
4. Test across all breakpoints (mobile, tablet, desktop)

---

*Document version: 1.0*
*Last updated: May 2026*