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
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
      },
      screens: {
        sm: "852px", // Screens **equal to or above** 852px
        lg: "1024px", // Screens **equal to or above** 1024px (e.g., 1024px+)
      },
    },
  },
  darkMode: "media",
  plugins: [],
};

export default config;