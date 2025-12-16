/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#0F0F23",
          surface: "#202123",
          surfaceLight: "#343541",
          accent: "#10A37F",
          accentHover: "#0D8C6F",
          blue: "#3099FF",
          blueHover: "#2680E0",
        },
        light: {
          bg: "#F5F5F5",
          surface: "#FFFFFF",
          surfaceLight: "#F9FAFB",
          border: "#9CA3AF",
          text: "#111827",
          textSecondary: "#374151",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "heading-lg": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-dot": "bounceDot 1.4s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
      boxShadow: {
        neumorphic:
          "8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.02)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        message: "0 2px 8px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        glass: "10px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#e5e7eb",
            a: {
              color: "#10A37F",
              "&:hover": {
                color: "#0D8C6F",
              },
            },
            code: {
              color: "#10A37F",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              padding: "0.25rem 0.375rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addVariant }) {
      addVariant("light", ".light &");
    },
  ],
};
