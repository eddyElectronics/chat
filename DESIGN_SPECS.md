# ChatAI - UI Design Specifications

## 🎨 Design System

### Color Palette

```css
/* Dark Theme (Primary) */
--primary-bg: #0F0F23          /* Main background */
--primary-surface: #202123      /* Cards, panels */
--primary-surface-light: #343541 /* Hover states */
--primary-accent: #10A37F       /* Green accent (user messages) */
--primary-accent-hover: #0D8C6F /* Green hover */
--primary-blue: #3099FF         /* Blue accent (actions) */
--primary-blue-hover: #2680E0   /* Blue hover */

/* Text Colors */
--text-primary: #FFFFFF         /* Primary text */
--text-secondary: #C5C5D2       /* Secondary text */
--text-muted: #6B6C7B          /* Muted text */
--text-disabled: #565869       /* Disabled text */

/* Gradients */
--gradient-user: linear-gradient(135deg, #10A37F 0%, #0D8C6F 100%)
--gradient-ai: linear-gradient(135deg, #3099FF 0%, #2680E0 100%)
--gradient-surface: linear-gradient(135deg, #343541 0%, #202123 100%)
```

### Typography

```css
/* Font Family */
font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;

/* Font Sizes */
--heading-xl: 32px / 700 / 1.2     /* Main titles */
--heading-lg: 24px / 700 / 1.3     /* Section headers */
--body-lg: 16px / 400 / 1.5        /* Chat messages */
--body-md: 14px / 400 / 1.5        /* UI elements */
--caption: 12px / 400 / 1.4        /* Timestamps */
```

### Spacing Scale

```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
```

### Border Radius

```css
--radius-sm: 8px     /* Buttons, inputs */
--radius-md: 12px    /* Cards */
--radius-lg: 16px    /* Message bubbles */
--radius-xl: 24px    /* Large containers */
--radius-full: 9999px /* Circular elements */
```

### Shadows

```css
/* Elevation Levels */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15)
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2)
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.25)

/* Special Effects */
--shadow-neumorphic: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.37)
--shadow-message: 0 2px 8px rgba(0, 0, 0, 0.15)
--shadow-accent: 0 4px 12px rgba(16, 163, 127, 0.3)
--shadow-blue: 0 4px 12px rgba(48, 153, 255, 0.3)
```

---

## 📐 Layout Specifications

### Desktop Layout (> 1024px)

```
┌─────────────────────────────────────────────────┐
│ Header (h: 56px)                                │
│ [☰ Logo] ChatAI          [🔍] [☀️] [+ New Chat] │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│   Sidebar    │         Chat Area               │
│   (w: 260px) │         (flex-1)                │
│              │                                  │
│  [Search]    │   ┌─ User Message ──┐           │
│              │   │  Right aligned   │           │
│  📌 Pinned   │   └──────────────────┘           │
│  • Chat 1    │                                  │
│  • Chat 2    │   ┌──────────────────┐           │
│              │   │ AI Response      │           │
│  Recent      │   │ Left aligned     │           │
│  • Chat 3    │   └──────────────────┘           │
│  • Chat 4    │                                  │
│              │   [Typing indicator...]          │
│              │                                  │
│              ├──────────────────────────────────┤
│              │  Input Bar (h: auto, max: 200px)│
│              │  [😊][📎] Text input [🎤][➤]    │
└──────────────┴──────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌─────────────────────────┐
│ [☰] ChatAI      [+ New] │ ← Header (h: 56px)
├─────────────────────────┤
│                         │
│    ┌─ User ──┐          │
│    │ Message │          │
│    └─────────┘          │
│                         │
│  ┌──────────┐           │
│  │ AI Reply │           │
│  └──────────┘           │
│                         │
│  [Typing...]            │
│                         │
├─────────────────────────┤
│ [😊] Text input [🎤][➤] │ ← Input (h: auto)
└─────────────────────────┘

/* Sidebar overlays on tap of ☰ */
```

---

## 🎯 Component Specifications

### 1. Header Component

**Dimensions:**

- Height: 56px
- Padding: 16px horizontal
- Border: 1px solid rgba(255, 255, 255, 0.1)

**Elements:**

- Logo: 32px × 32px with gradient background
- Title: 20px bold, white color
- Icons: 20px × 20px, gray-300
- New Chat Button: bg-blue, 36px height, rounded-lg

**States:**

- Hover: Background alpha 0.5
- Active: Scale 0.95

### 2. Sidebar Component

**Dimensions:**

- Width: 260px (desktop)
- Full width overlay (mobile)
- Padding: 12px

**Search Bar:**

- Height: 40px
- Border radius: 8px
- Icon: 16px left-aligned
- Placeholder: gray-500

**Chat Items:**

- Height: 64px
- Padding: 12px
- Border radius: 8px
- Gap between: 4px

**States:**

- Hover: bg-gray-700/30
- Active: border-left 2px green
- Pinned: Pin icon filled

### 3. Message Bubble

**User Message:**

- Background: Gradient green (#10A37F to #0D8C6F)
- Alignment: Right
- Max width: 85%
- Border radius: 16px (rounded-tr-sm for tail)
- Padding: 12px 16px
- Shadow: subtle drop shadow
- Text: white, 16px

**AI Message:**

- Background: Glass effect (rgba(52, 53, 65, 0.5))
- Backdrop blur: 10px
- Alignment: Left
- Max width: 85%
- Border radius: 16px (rounded-tl-sm for tail)
- Padding: 12px 16px
- Border: 1px solid gray-700/30
- Text: gray-100, 16px

**Avatar:**

- Size: 32px × 32px
- Border radius: Full circle
- User: Green gradient
- AI: Blue gradient
- Icon: 16px white

**Timestamp:**

- Font size: 12px
- Color: gray-500
- Position: Below bubble
- Format: "h:mm a"

**Actions (on hover):**

- Copy button: 14px icon
- Regenerate button: 14px icon (AI only)
- Delete button: 14px icon (red)
- Background: gray-700/50 on hover
- Padding: 6px
- Border radius: 4px

### 4. Code Blocks

**Container:**

- Background: rgba(0, 0, 0, 0.5)
- Border radius: 8px
- Padding: 16px
- Margin: 16px 0
- Overflow: auto

**Syntax Highlighting:**

- Theme: VS Code Dark Plus
- Font: Fira Code, Monaco, monospace
- Font size: 14px
- Line height: 1.6

**Copy Button:**

- Position: Absolute top-right
- Background: gray-700
- Size: 32px × 32px
- Icon: 14px
- Opacity: 0 (visible on hover)
- Transition: 0.2s

### 5. Input Bar

**Container:**

- Min height: 56px
- Max height: 200px (4 lines)
- Padding: 12px
- Border: 1px solid gray-700/50
- Border radius: 16px
- Glass effect background

**Textarea:**

- Background: Transparent
- Resize: None (auto-grow)
- Font size: 16px
- Line height: 1.5
- Padding: 8px
- Color: white
- Placeholder: gray-500

**Action Buttons:**

- Size: 40px × 40px
- Icon: 20px
- Border radius: 8px
- Hover: bg-gray-700/50

**Send Button:**

- Background: Blue gradient
- Size: 42px × 42px
- Icon: 20px white
- Border radius: 8px
- Shadow: Blue glow
- Hover: Scale 1.1
- Active: Scale 0.95
- Disabled: gray-700, opacity 0.5

### 6. Typing Indicator

**Container:**

- Same as AI message bubble
- Glass effect background
- Padding: 16px 20px

**Dots:**

- Size: 8px × 8px
- Color: gray-400
- Gap: 6px
- Animation: Bounce (1.4s infinite)
- Delay: 0.16s, 0.32s stagger

**Animation:**

```css
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
```

### 7. Welcome Screen

**Layout:**

- Centered vertically and horizontally
- Max width: 800px
- Padding: 24px

**Hero Icon:**

- Size: 80px × 80px
- Background: Gradient green to blue
- Border radius: 24px
- Shadow: Large with accent color
- Icon: 40px white

**Heading:**

- Font size: 32px
- Font weight: 700
- Color: white
- Margin bottom: 12px

**Subheading:**

- Font size: 16px
- Color: gray-400
- Margin bottom: 48px

**Suggestion Cards:**

- Grid: 2 columns (1 on mobile)
- Gap: 16px
- Background: Glass effect
- Border: 1px solid gray-700/30
- Border radius: 16px
- Padding: 24px
- Hover: Border accent, scale 1.05
- Transition: 0.3s

**Card Content:**

- Icon: 40px × 40px container
- Icon size: 20px accent color
- Title: 16px semibold white
- Description: 14px gray-400

---

## ✨ Animation Specifications

### Message Animations

```css
/* Fade in on appear */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stagger delay */
animation-delay: calc(index * 50ms);
```

### Button Hover Effects

```css
/* Scale and glow */
transition: all 0.2s ease;
transform: scale(1);

&:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(color, 0.3);
}

&:active {
  transform: scale(0.95);
}
```

### Input Focus

```css
/* Border glow */
border: 1px solid gray-700;
transition: border-color 0.2s;

&:focus {
  border-color: #10a37f;
  box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.1);
}
```

### Sidebar Slide

```css
/* Mobile overlay */
transform: translateX(-100%);
transition: transform 0.3s ease;

&.open {
  transform: translateX(0);
}
```

### Typing Indicator

```css
/* Bouncing dots */
.dot {
  animation: bounce 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}
.dot:nth-child(3) {
  animation-delay: 0s;
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
.container {
  padding: 16px;
}

/* Tablet: 768px */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }

  .sidebar {
    display: block;
    position: relative;
  }
}

/* Desktop: 1024px */
@media (min-width: 1024px) {
  .message-bubble {
    max-width: 70%;
  }

  .chat-area {
    max-width: 900px;
  }
}

/* Large Desktop: 1440px */
@media (min-width: 1440px) {
  .chat-area {
    max-width: 1200px;
  }
}
```

---

## 🎭 Interaction States

### Hover States

- Buttons: bg-opacity +20%, scale 1.05
- Messages: Show action buttons
- Chat items: bg-gray-700/30
- Code blocks: Show copy button

### Active States

- Buttons: scale 0.95
- Chat items: Border left accent
- Input: Border accent glow

### Focus States

- Input: Border accent + shadow
- Buttons: Outline accent 2px

### Disabled States

- Opacity: 0.5
- Cursor: not-allowed
- No hover effects

### Loading States

- Typing indicator animation
- Send button disabled
- Skeleton placeholders (optional)

---

## 🔧 Accessibility

### Keyboard Navigation

- Tab: Navigate through interactive elements
- Enter: Send message
- Shift + Enter: New line in textarea
- Escape: Close modals/sidebar
- Arrow keys: Navigate chat history

### ARIA Labels

```html
<button aria-label="New chat">
<button aria-label="Send message">
<div role="log" aria-live="polite"> <!-- Chat area -->
<textarea aria-label="Message input">
```

### Focus Indicators

- Visible outline: 2px solid accent
- Offset: 2px
- Never remove focus styles

### Color Contrast

- All text meets WCAG AA (4.5:1 for normal, 3:1 for large)
- Interactive elements distinguishable
- Accent colors readable on dark backgrounds

---

## 🎨 Glassmorphism Effect

```css
.glass-effect {
  background: rgba(52, 53, 65, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
}
```

## 🌟 Neumorphic Effect (Optional)

```css
.neumorphic {
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02);
}
```

---

## 📏 Sizing Reference

### iPhone 14 (Mobile)

- Screen: 390px × 844px
- Safe area top: 47px
- Safe area bottom: 34px
- Header: 56px
- Input: 80px (collapsed)

### Desktop

- Min width: 1024px
- Max content width: 1200px
- Sidebar: 260px fixed
- Chat area: Remaining space (centered, max 900px)

---

**This design system ensures consistency, accessibility, and a premium user experience across all devices.**
