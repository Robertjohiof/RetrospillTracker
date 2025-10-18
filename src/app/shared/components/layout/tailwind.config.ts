import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "retro-grid": "url('/images/RetroZoneBackground.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
