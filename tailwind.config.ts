import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        "theme-bg": "var(--color-bg)",
        "theme-dark": "var(--color-dark)",
        "rose-gold": {
          DEFAULT: "#B76E79",
          light: "#D4A574",
          dark: "#2C1810",
          bg: "#FDF6F0",
        },
        "royal-blue": {
          DEFAULT: "#1B3A6B",
          accent: "#C9A84C",
          dark: "#0D1B33",
          bg: "#F8F6FF",
        },
        emerald: {
          DEFAULT: "#2D5A27",
          accent: "#D4AF37",
          dark: "#1A3A15",
          bg: "#F0F8F0",
        },
        midnight: {
          DEFAULT: "#1A1A2E",
          accent: "#C9A84C",
          dark: "#080812",
          bg: "#0F0F1E",
        },
        blush: {
          DEFAULT: "#E8739A",
          accent: "#F4C2D0",
          dark: "#5C1A35",
          bg: "#FFF5F8",
        },
        saffron: {
          DEFAULT: "#FF6B35",
          accent: "#FFD700",
          dark: "#8B1A00",
          bg: "#FFF8F0",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        script: ["var(--font-great-vibes)", "cursive"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        tamil: ["var(--font-noto-tamil)", "sans-serif"],
        mono: ["var(--font-fira-code)", "monospace"],
      },
      animation: {
        "float": "float 4s ease-in-out infinite",
        "petal-fall": "petalFall var(--petal-duration, 10s) linear var(--petal-delay, 0s) infinite",
        "bounce-slow": "bounce 1.5s infinite",
        "spin-slow": "spin 80s linear infinite",
        "spin-slower": "spin 40s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        petalFall: {
          "0%": {
            transform: "translateY(-10vh) translateX(0) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(110vh) translateX(var(--petal-sway, 40px)) rotate(360deg)",
            opacity: "0.3",
          },
        },
        pulseRing: {
          "0%": { transform: "scale(1)", opacity: "0.5" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
