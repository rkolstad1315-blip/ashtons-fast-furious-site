/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      colors: {
        navy: "#0B1220",
        // [BRAND BLUE from logo, default #1E90FF]
        brand: "#1E90FF",
        // [ACCENT, default #FF7A1A]
        accent: "#FF7A1A",
        white: "#FFFFFF",
        slate: {
          100: "#F1F5F9",
          200: "#E2E8F0",
          400: "#94A3B8",
          600: "#475569",
          700: "#334155",
        },
      },
      borderRadius: {
        card: "12px",
        pill: "999px",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
};

export default config;
