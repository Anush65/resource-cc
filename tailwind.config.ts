import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        bg: {
          DEFAULT: "#0a0a0f",
          surface: "#111118",
          surface2: "#16161f",
          elevated: "#1c1c28",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          hover: "rgba(255,255,255,0.14)",
          strong: "rgba(255,255,255,0.2)",
        },
        accent: {
          DEFAULT: "#7c6af7",
          dim: "rgba(124,106,247,0.12)",
          glow: "rgba(124,106,247,0.25)",
        },
        teal: {
          DEFAULT: "#4fd1c5",
          dim: "rgba(79,209,197,0.1)",
        },
        coral: {
          DEFAULT: "#f7936a",
          dim: "rgba(247,147,106,0.12)",
        },
        green: {
          DEFAULT: "#5de0a4",
          dim: "rgba(93,224,164,0.1)",
        },
        ink: {
          DEFAULT: "#e8e8f0",
          muted: "#6b6b80",
          faint: "#3a3a4a",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;