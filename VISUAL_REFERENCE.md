# ChatAI - Visual UI Reference

## 🎨 Complete UI Component Breakdown

This document provides pixel-perfect specifications for recreating or modifying the ChatGPT-inspired interface.

---

## 📐 Screen Layouts

### Desktop View (1440px × 900px)

```
╔════════════════════════════════════════════════════════════════╗
║ ┌──────────────────────────────────────────────────────────┐  ║
║ │  [☰]  🟢 ChatAI        [🔍]  [☀️]  [+ New Chat]          │  ║ 56px
║ └──────────────────────────────────────────────────────────┘  ║
╠═══════════════╦════════════════════════════════════════════════╣
║               ║                                                ║
║  SIDEBAR      ║           CHAT AREA                            ║
║  260px        ║           (Flexible Width)                     ║
║               ║                                                ║
║ ┌───────────┐ ║  ┌──────────────────────────┐                 ║
║ │ 🔍 Search │ ║  │                          │                 ║
║ └───────────┘ ║  │   ┌──────────────┐      │                 ║
║               ║  │   │ User Message │ 👤   │                 ║
║ 📌 Pinned     ║  │   └──────────────┘      │                 ║
║ • Project X   ║  │                          │                 ║
║ • Planning    ║  │  🤖 ┌──────────────┐    │                 ║
║               ║  │     │ AI Response  │    │                 ║
║ Recent        ║  │     └──────────────┘    │                 ║
║ • Chat 1      ║  │                          │                 ║
║ • Chat 2      ║  │  🤖 [Typing...]          │                 ║
║ • Chat 3      ║  │                          │                 ║
║               ║  └──────────────────────────┘                 ║
║               ║                                                ║
║               ╠════════════════════════════════════════════════╣
║               ║  ┌───────────────────────────────────────┐    ║
║               ║  │ [😊] [📎] Message... [🎤] [➤]        │    ║ Auto
║               ║  └───────────────────────────────────────┘    ║ height
╚═══════════════╩════════════════════════════════════════════════╝
    260px                  Remaining space
```

### Mobile View (390px × 844px - iPhone 14)

```
╔══════════════════════════════════╗
║ ┌──────────────────────────────┐ ║
║ │ [☰] ChatAI      [+ New Chat] │ ║ 56px
║ └──────────────────────────────┘ ║
╠══════════════════════════════════╣
║                                  ║
║          CHAT AREA               ║
║       (Full Width)               ║
║                                  ║
║  ┌──────────────┐                ║
║  │ User Message │ 👤             ║
║  └──────────────┘                ║
║                                  ║
║  🤖 ┌──────────────┐             ║
║     │ AI Response  │             ║
║     └──────────────┘             ║
║                                  ║
║  🤖 [Typing...]                  ║
║                                  ║
║                                  ║
║                                  ║
╠══════════════════════════════════╣
║ ┌──────────────────────────────┐ ║
║ │ [😊] Message... [🎤] [➤]    │ ║ 72px
║ └──────────────────────────────┘ ║
╚══════════════════════════════════╝

/* Sidebar slides from left on [☰] tap */
```

---

## 🎨 Component Specifications

### 1. Header Bar

```
┌─────────────────────────────────────────────────┐
│  [☰]  🟢 ChatAI        [🔍]  [☀️]  [+ New Chat] │ 56px height
└─────────────────────────────────────────────────┘

Specifications:
├─ Background: #202123
├─ Border Bottom: 1px solid rgba(255, 255, 255, 0.1)
├─ Padding: 16px horizontal
├─ Display: Flex, space-between, align-center
│
├─ Left Section:
│  ├─ Hamburger Button (Mobile):
│  │  └─ Size: 40px × 40px
│  │     Icon: 20px, white
│  │     Hover: bg-gray-700/50
│  │
│  └─ Logo + Title:
│     ├─ Logo: 32px × 32px, gradient (green→blue), rounded-lg
│     ├─ Icon: "AI" text, white, 12px bold
│     └─ Title: "ChatAI", 20px bold, white, margin-left: 8px
│
└─ Right Section:
   ├─ Search Button:
   │  └─ Size: 40px × 40px, icon 20px
   │     Hidden on mobile
   │
   ├─ Theme Toggle:
   │  └─ Size: 40px × 40px, icon 20px
   │     Hidden on mobile
   │
   └─ New Chat Button:
      └─ Height: 36px, padding: 12px 16px
         Background: #3099FF
         Text: "New Chat" (hidden on mobile)
         Icon: Plus 20px
         Border radius: 8px
         Hover: scale(1.05), shadow
```

### 2. Sidebar

```
┌─────────────────┐
│  🔍 Search      │ 48px height
├─────────────────┤
│                 │
│ 📌 Pinned       │ 24px height
│ • Chat 1        │ 64px height
│ • Chat 2        │ 64px height
│                 │
│ Recent          │ 24px height
│ • Chat 3        │ 64px height
│ • Chat 4        │ 64px height
│ • Chat 5        │ 64px height
│                 │
└─────────────────┘

Specifications:
├─ Width: 260px (desktop)
├─ Background: #202123
├─ Border Right: 1px solid rgba(255, 255, 255, 0.1)
├─ Padding: 12px
│
├─ Search Box:
│  ├─ Height: 40px
│  ├─ Background: #0F0F23
│  ├─ Border: 1px solid #343541
│  ├─ Border radius: 8px
│  ├─ Icon: 16px, left-aligned, gray-400
│  ├─ Padding: 8px 12px 8px 40px
│  └─ Placeholder: "Search chats...", gray-500
│
├─ Section Headers:
│  ├─ Font size: 12px
│  ├─ Font weight: 600
│  ├─ Color: gray-400
│  ├─ Padding: 8px
│  └─ Margin: 16px 0 8px
│
└─ Chat Items:
   ├─ Height: 64px
   ├─ Padding: 12px
   ├─ Border radius: 8px
   ├─ Margin bottom: 4px
   ├─ Background: transparent
   │  └─ Hover: rgba(255, 255, 255, 0.05)
   │     Active: #10A37F/10 with border-left 2px #10A37F
   │
   ├─ Content:
   │  ├─ Icon: MessageSquare 16px, gray-400
   │  ├─ Title: 14px medium, gray-300, truncate
   │  └─ Meta: 12px, gray-500
   │     Format: "X messages · MMM d"
   │
   └─ Actions (on hover):
      ├─ Position: Absolute, top-right
      ├─ Background: #202123, shadow
      ├─ Buttons: 24px × 24px each
      │  ├─ Pin: Gray-400 (filled when pinned)
      │  └─ Delete: Red-400
      └─ Border radius: 4px
```

### 3. Chat Area

```
┌─────────────────────────────────────┐
│                                     │
│  ┌──────────────────┐               │
│  │   User Message   │ 👤            │
│  └──────────────────┘               │
│  [Copy] 3:45 PM                     │
│                                     │
│  🤖 ┌──────────────────┐            │
│     │   AI Response    │            │
│     │                  │            │
│     │   Code:          │            │
│     │   ┌────────────┐ │            │
│     │   │ function() │ │            │
│     │   └────────────┘ │            │
│     └──────────────────┘            │
│     [Copy][Regenerate] 3:45 PM     │
│                                     │
│  🤖 [●●● Typing...]                 │
│                                     │
└─────────────────────────────────────┘

Specifications:
├─ Background: #0F0F23
├─ Padding: 24px
├─ Max width: 900px (centered)
├─ Overflow: auto, scrollbar-thin
│
└─ Message Layout:
   ├─ Margin bottom: 24px
   ├─ Display: Flex
   ├─ Gap: 12px
   │
   ├─ Avatar:
   │  ├─ Size: 32px × 32px
   │  ├─ Border radius: Full circle
   │  ├─ Background: Gradient
   │  │  ├─ User: #10A37F → #0D8C6F
   │  │  └─ AI: #3099FF → #2680E0
   │  ├─ Icon: 16px, white, centered
   │  └─ Shadow: 0 4px 12px color/20
   │
   └─ Bubble:
      ├─ Max width: 85%
      ├─ Padding: 12px 16px
      ├─ Border radius: 16px
      │  ├─ User: rounded-tr-sm (tail effect)
      │  └─ AI: rounded-tl-sm (tail effect)
      │
      ├─ User Bubble:
      │  ├─ Align: Right (flex-row-reverse)
      │  ├─ Background: linear-gradient(135deg, #10A37F 0%, #0D8C6F 100%)
      │  ├─ Color: white
      │  └─ Shadow: 0 2px 8px rgba(0, 0, 0, 0.15)
      │
      └─ AI Bubble:
         ├─ Align: Left
         ├─ Background: rgba(52, 53, 65, 0.5)
         ├─ Backdrop blur: 10px
         ├─ Border: 1px solid rgba(255, 255, 255, 0.1)
         ├─ Color: #E5E5E5
         └─ Shadow: 0 8px 32px rgba(0, 0, 0, 0.37)
```

### 4. Message Actions

```
┌──────────────────────────────────┐
│ Message content here...          │
│                                  │
└──────────────────────────────────┘
[Copy][Regenerate][Delete] 3:45 PM
 ▲─── Actions (appear on hover)

Specifications:
├─ Position: Below message bubble
├─ Display: Flex, align-center, gap 8px
├─ Opacity: 0 (visible on hover: opacity 1)
├─ Transition: 0.2s ease
│
├─ Timestamp:
│  ├─ Font size: 12px
│  ├─ Color: gray-500
│  └─ Format: "h:mm a"
│
└─ Action Buttons:
   ├─ Size: 28px × 28px
   ├─ Padding: 6px
   ├─ Border radius: 6px
   ├─ Background: transparent
   │  └─ Hover: rgba(255, 255, 255, 0.1)
   │
   ├─ Icons: 14px
   │  ├─ Copy: Gray-400 (green when copied)
   │  ├─ Regenerate: Gray-400 (AI only)
   │  └─ Delete: Red-400
   │
   └─ Transition: all 0.2s ease
```

### 5. Code Blocks

```
┌─────────────────────────────────────┐
│  JavaScript               [Copy]    │ Header bar
├─────────────────────────────────────┤
│  1  function example() {            │
│  2    const message = "Hello";      │
│  3    console.log(message);         │
│  4    return message;               │
│  5  }                               │
└─────────────────────────────────────┘

Specifications:
├─ Container:
│  ├─ Background: rgba(0, 0, 0, 0.5)
│  ├─ Border radius: 8px
│  ├─ Padding: 16px
│  ├─ Margin: 16px 0
│  └─ Overflow: auto
│
├─ Header:
│  ├─ Display: Flex, justify-between
│  ├─ Font size: 12px
│  ├─ Color: gray-400
│  ├─ Margin bottom: 8px
│  │
│  └─ Copy Button:
│     ├─ Position: Absolute, top-right
│     ├─ Size: 32px × 32px
│     ├─ Background: #2D2D2D
│     │  └─ Hover: #3D3D3D
│     ├─ Icon: 14px, gray-300
│     ├─ Opacity: 0 (visible on hover)
│     └─ Transition: 0.2s
│
└─ Code Content:
   ├─ Font family: Fira Code, Monaco, monospace
   ├─ Font size: 14px
   ├─ Line height: 1.6
   ├─ Color: Various (VS Code Dark Plus theme)
   ├─ Line numbers: gray-600, right-aligned
   └─ Syntax highlighting: Full Prism support
```

### 6. Typing Indicator

```
🤖 ┌──────────────┐
   │  ● ● ●       │
   └──────────────┘

Specifications:
├─ Container: Same as AI message bubble
│  ├─ Background: rgba(52, 53, 65, 0.5)
│  ├─ Backdrop blur: 10px
│  ├─ Padding: 16px 20px
│  └─ Border radius: 16px, rounded-tl-sm
│
├─ Dots Container:
│  ├─ Display: Flex, gap 6px
│  └─ Align: center
│
└─ Dots:
   ├─ Size: 8px × 8px
   ├─ Background: gray-400
   ├─ Border radius: Full circle
   ├─ Animation: bounce 1.4s infinite ease-in-out
   │
   └─ Animation delays:
      ├─ Dot 1: -0.32s
      ├─ Dot 2: -0.16s
      └─ Dot 3: 0s

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
```

### 7. Input Bar

```
┌──────────────────────────────────────────────┐
│  [😊] [📎] Type your message... [🎤] [➤]    │
└──────────────────────────────────────────────┘
    Auto-height (56px - 200px)

Specifications:
├─ Container:
│  ├─ Background: #202123
│  ├─ Border top: 1px solid rgba(255, 255, 255, 0.1)
│  ├─ Padding: 16px
│  └─ Position: Sticky bottom
│
├─ Inner Container:
│  ├─ Max width: 900px
│  ├─ Margin: 0 auto
│  ├─ Background: rgba(52, 53, 65, 0.5)
│  ├─ Backdrop blur: 10px
│  ├─ Border: 1px solid rgba(255, 255, 255, 0.1)
│  ├─ Border radius: 16px
│  ├─ Padding: 12px
│  ├─ Display: Flex, align-end, gap 8px
│  └─ Shadow: 0 8px 32px rgba(0, 0, 0, 0.37)
│
├─ Action Buttons (Left):
│  ├─ Size: 40px × 40px
│  ├─ Icon: 20px, gray-400
│  ├─ Border radius: 8px
│  ├─ Background: transparent
│  │  └─ Hover: rgba(255, 255, 255, 0.1)
│  │
│  ├─ Emoji Button: Smile icon
│  └─ Attach Button: Paperclip icon
│
├─ Textarea:
│  ├─ Flex: 1
│  ├─ Background: transparent
│  ├─ Border: none
│  ├─ Color: white
│  ├─ Font size: 16px
│  ├─ Line height: 1.5
│  ├─ Padding: 8px 0
│  ├─ Resize: none (auto-grow)
│  ├─ Min height: 24px (1 line)
│  ├─ Max height: 120px (4 lines)
│  ├─ Placeholder: "Message ChatAI...", gray-500
│  └─ Scrollbar: Custom thin, gray
│
├─ Voice Button:
│  ├─ Size: 40px × 40px
│  ├─ Icon: Mic 20px
│  ├─ Normal: gray-400
│  │  └─ Hover: rgba(255, 255, 255, 0.1)
│  │
│  └─ Recording:
│     ├─ Background: #EF4444 (red)
│     ├─ Icon: Square (stop)
│     └─ Animation: pulse
│
└─ Send Button:
   ├─ Size: 42px × 42px
   ├─ Background: #3099FF
   │  └─ Hover: #2680E0, scale(1.1)
   │     Active: scale(0.95)
   ├─ Icon: Send 20px, white
   ├─ Border radius: 8px
   ├─ Shadow: 0 4px 12px rgba(48, 153, 255, 0.3)
   │  └─ Hover: 0 6px 16px rgba(48, 153, 255, 0.4)
   ├─ Transition: all 0.2s ease
   │
   └─ Disabled:
      ├─ Background: #565869
      ├─ Cursor: not-allowed
      ├─ Opacity: 0.5
      └─ No hover effects
```

### 8. Welcome Screen

```
┌───────────────────────────────────────┐
│                                       │
│            🟢                         │ 80px icon
│                                       │
│         Welcome to ChatAI             │ 32px title
│     How can I help you today?         │ 16px subtitle
│                                       │
│   ┌────────┐  ┌────────┐             │
│   │ Write  │  │ Get    │             │ 2×2 grid
│   │ Code   │  │ Ideas  │             │ on desktop
│   └────────┘  └────────┘             │
│                                       │
│   ┌────────┐  ┌────────┐             │
│   │Summarize│ │ Solve  │             │
│   │  Text  │  │Problems│             │
│   └────────┘  └────────┘             │
│                                       │
│   • Real-time  • Code  • Multi-lang  │ Features
│                                       │
└───────────────────────────────────────┘

Specifications:
├─ Container:
│  ├─ Display: Flex, center, vertical
│  ├─ Max width: 800px
│  ├─ Margin: 0 auto
│  └─ Padding: 24px
│
├─ Hero Icon:
│  ├─ Size: 80px × 80px
│  ├─ Background: linear-gradient(135deg, #10A37F 0%, #3099FF 100%)
│  ├─ Border radius: 24px
│  ├─ Icon: MessageSquarePlus 40px, white
│  ├─ Shadow: 0 16px 32px rgba(16, 163, 127, 0.3)
│  └─ Margin bottom: 24px
│
├─ Heading:
│  ├─ Font size: 32px
│  ├─ Font weight: 700
│  ├─ Color: white
│  ├─ Text align: center
│  └─ Margin bottom: 12px
│
├─ Subheading:
│  ├─ Font size: 16px
│  ├─ Color: gray-400
│  ├─ Text align: center
│  └─ Margin bottom: 48px
│
├─ Suggestion Grid:
│  ├─ Display: Grid
│  ├─ Columns: 2 (1 on mobile)
│  ├─ Gap: 16px
│  └─ Margin bottom: 32px
│
├─ Suggestion Card:
│  ├─ Background: rgba(52, 53, 65, 0.5)
│  ├─ Backdrop blur: 10px
│  ├─ Border: 1px solid rgba(255, 255, 255, 0.1)
│  │  └─ Hover: border-color #10A37F/50
│  ├─ Border radius: 16px
│  ├─ Padding: 24px
│  ├─ Transition: all 0.3s ease
│  ├─ Cursor: pointer
│  │  └─ Hover: scale(1.05), shadow
│  │
│  ├─ Icon Container:
│  │  ├─ Size: 40px × 40px
│  │  ├─ Background: rgba(16, 163, 127, 0.1)
│  │  │  └─ Hover: rgba(16, 163, 127, 0.2)
│  │  ├─ Border radius: 12px
│  │  └─ Icon: 20px, #10A37F
│  │
│  ├─ Title:
│  │  ├─ Font size: 16px
│  │  ├─ Font weight: 600
│  │  ├─ Color: white
│  │  │  └─ Hover: #10A37F
│  │  └─ Margin bottom: 4px
│  │
│  └─ Description:
│     ├─ Font size: 14px
│     └─ Color: gray-400
│
└─ Features Row:
   ├─ Display: Flex, center, wrap, gap 24px
   ├─ Font size: 14px
   ├─ Color: gray-500
   │
   └─ Feature Item:
      ├─ Display: Flex, align-center, gap 8px
      │
      ├─ Dot:
      │  ├─ Size: 8px × 8px
      │  ├─ Border radius: Full circle
      │  └─ Background: Various colors
      │     ├─ Green: #10A37F
      │     ├─ Blue: #3099FF
      │     └─ Purple: #A855F7
      │
      └─ Text: 14px, gray-500
```

---

## 🎭 Interaction States

### Hover Effects

```css
/* Buttons */
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px color/30;
}

.button:active {
  transform: scale(0.95);
}

/* Chat Items */
.chat-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Message Actions */
.message:hover .actions {
  opacity: 1;
}

/* Code Copy Button */
.code-block:hover .copy-button {
  opacity: 1;
}
```

### Focus States

```css
/* Input/Textarea */
.input:focus {
  outline: none;
  border-color: #10a37f;
  box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.1);
}

/* Buttons */
.button:focus-visible {
  outline: 2px solid #10a37f;
  outline-offset: 2px;
}
```

### Active States

```css
/* Chat Item */
.chat-item.active {
  background: rgba(16, 163, 127, 0.1);
  border-left: 2px solid #10a37f;
}

/* Send Button */
.send-button:disabled {
  background: #565869;
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Loading States

```css
/* Typing Indicator */
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

.typing-dot {
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: -0.32s;
}
.typing-dot:nth-child(2) {
  animation-delay: -0.16s;
}
.typing-dot:nth-child(3) {
  animation-delay: 0s;
}
```

---

## 📱 Responsive Breakpoints

### Mobile (<768px)

```css
/* Adjustments */
- Sidebar: Overlay with backdrop
- Header: Compact (remove text labels)
- Input: Full width, smaller buttons
- Messages: 95% max width
- Font sizes: 14px → 15px for readability
- Padding: Reduced to 12px
```

### Tablet (768px - 1024px)

```css
/* Adjustments */
- Sidebar: 240px width
- Messages: 80% max width
- Grid: 2 columns maintained
- Comfortable touch targets
```

### Desktop (>1024px)

```css
/* Full features */
- Sidebar: 260px width
- Messages: 70% max width
- All hover effects active
- Keyboard shortcuts enabled
```

---

## 🌈 Color System

### Base Colors

```css
/* Dark Theme */
--primary-bg: #0f0f23;
--surface: #202123;
--surface-light: #343541;
--surface-lighter: #444654;

/* Accent Colors */
--accent-green: #10a37f;
--accent-green-hover: #0d8c6f;
--accent-blue: #3099ff;
--accent-blue-hover: #2680e0;
--accent-red: #ef4444;
--accent-purple: #a855f7;

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: #e5e5e5;
--text-muted: #b4b4b4;
--text-disabled: #6b6c7b;

/* UI Colors */
--border: rgba(255, 255, 255, 0.1);
--hover: rgba(255, 255, 255, 0.05);
--active: rgba(16, 163, 127, 0.1);
```

### Gradients

```css
/* Message Bubbles */
--gradient-user: linear-gradient(135deg, #10a37f 0%, #0d8c6f 100%);
--gradient-ai: linear-gradient(135deg, #3099ff 0%, #2680e0 100%);

/* Background */
--gradient-surface: linear-gradient(135deg, #343541 0%, #202123 100%);

/* Logo */
--gradient-logo: linear-gradient(135deg, #10a37f 0%, #3099ff 100%);
```

### Shadows

```css
/* Elevation */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.25);

/* Accent Shadows */
--shadow-green: 0 4px 12px rgba(16, 163, 127, 0.3);
--shadow-blue: 0 4px 12px rgba(48, 153, 255, 0.3);

/* Glassmorphism */
--shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.37);

/* Message */
--shadow-message: 0 2px 8px rgba(0, 0, 0, 0.15);
```

---

## 📏 Spacing System

```css
/* Spacing Scale */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

---

## 🔤 Typography Scale

```css
/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 32px;
--text-4xl: 40px;

/* Line Heights */
--leading-tight: 1.2;
--leading-snug: 1.3;
--leading-normal: 1.5;
--leading-relaxed: 1.6;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

**This visual reference ensures pixel-perfect implementation of the ChatAI UI!**

_Use these specifications when customizing or extending the application._
