import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agribridge: {
          field: "#047857",
          leaf: "#10b981",
          mint: "#d1fae5",
          soil: "#7c5e3c",
          wheat: "#facc15",
        },
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
