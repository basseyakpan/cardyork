import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-bright": "var(--surface-bright)",
        "surface-variant": "var(--surface-variant)",
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          dim: "var(--primary-dim)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
          dim: "var(--secondary-dim)",
        },
        tertiary: "var(--tertiary)",
        error: "var(--error)",
        "on-primary": "var(--on-primary)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        "on-secondary": "var(--on-secondary)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "on-background": "var(--on-background)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-hero": "var(--gradient-hero)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        "glow-primary": "var(--glow-primary)",
        "ambient": "var(--ambient-shadow)",
      },
      fontFamily: {
        inter: ["var(--font-family)", "sans-serif"],
      },
      transitionProperty: {
        base: "var(--transition-base)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 1.8s infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { "background-position": "-200% 0" },
          "100%": { "background-position": "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(151,169,255,0.2)" },
          "50%": { "box-shadow": "0 0 40px rgba(151,169,255,0.4)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
