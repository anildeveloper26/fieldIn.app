import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--color-background) / <alpha-value>)",
        card: "rgb(var(--color-card) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
        emerald: {
          DEFAULT: "rgb(var(--color-emerald) / <alpha-value>)",
          dark: "rgb(var(--color-emerald-dark) / <alpha-value>)",
        },
        amber: "rgb(var(--color-amber) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      borderRadius: {
        "2xl": "16px",
      },
      spacing: {
        "1u": "8px",
        "2u": "16px",
        "3u": "24px",
        "4u": "32px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "coin-pop": {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.25)" },
          "100%": { transform: "scale(1)" },
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "20%": { opacity: "1", transform: "translateY(0)" },
          "80%": { opacity: "1", transform: "translateY(-16px)" },
          "100%": { opacity: "0", transform: "translateY(-24px)" },
        },
        "live-ping": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
      },
      animation: {
        "coin-pop": "coin-pop 450ms ease-out",
        "float-up": "float-up 1.4s ease-out forwards",
        "live-ping": "live-ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
