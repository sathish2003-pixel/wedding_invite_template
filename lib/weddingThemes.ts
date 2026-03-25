import { ThemeColors, ThemeName } from "@/types/wedding";

export const weddingThemes: Record<ThemeName, ThemeColors> = {
  "rose-gold": {
    primary: "#B76E79",
    accent: "#D4A574",
    bg: "#FDF6F0",
    dark: "#2C1810",
    name: "Rose Gold",
    description: "Rose petals, Indian romance aesthetic",
  },
  "royal-blue": {
    primary: "#1B3A6B",
    accent: "#C9A84C",
    bg: "#F8F6FF",
    dark: "#0D1B33",
    name: "Royal Blue",
    description: "North Indian royal / Mughal wedding aesthetic",
  },
  emerald: {
    primary: "#2D5A27",
    accent: "#D4AF37",
    bg: "#F0F8F0",
    dark: "#1A3A15",
    name: "Emerald Garden",
    description: "South Indian traditional wedding",
  },
  midnight: {
    primary: "#1A1A2E",
    accent: "#C9A84C",
    bg: "#0F0F1E",
    dark: "#080812",
    name: "Midnight Luxe",
    description: "Modern dark luxury, urban couples",
  },
  blush: {
    primary: "#E8739A",
    accent: "#F4C2D0",
    bg: "#FFF5F8",
    dark: "#5C1A35",
    name: "Blush Pink",
    description: "Modern romantic, spring/summer weddings",
  },
  saffron: {
    primary: "#FF6B35",
    accent: "#FFD700",
    bg: "#FFF8F0",
    dark: "#8B1A00",
    name: "Saffron Festival",
    description: "Vibrant, festive celebrations",
  },
};

export const themeNames = Object.keys(weddingThemes) as ThemeName[];

export function getThemeCSSVars(theme: ThemeName): Record<string, string> {
  const colors = weddingThemes[theme];
  return {
    "--color-primary": colors.primary,
    "--color-accent": colors.accent,
    "--color-bg": colors.bg,
    "--color-dark": colors.dark,
  };
}
