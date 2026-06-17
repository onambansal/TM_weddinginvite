import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#6B0F1A",
          dark: "#4A0A12",
          light: "#8B1A2A",
        },
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8C97A",
          dark: "#A07830",
        },
        cream: {
          DEFAULT: "#FFF8F0",
          dark: "#F5EDE0",
        },
        ivory: "#FFFDF7",
        rose: "#E8A0A0",
        haldi: "#F5C518",
        mehendi: "#2D6A4F",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C, #E8C97A, #C9A84C)",
        "maroon-gradient": "linear-gradient(135deg, #4A0A12, #6B0F1A, #8B1A2A)",
        "cream-gradient": "linear-gradient(180deg, #FFF8F0, #F5EDE0)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "petal-fall": "petalFall 8s linear infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(201, 168, 76, 0.4)" },
          "50%": { boxShadow: "0 0 30px rgba(201, 168, 76, 0.8)" },
        },
      },
      boxShadow: {
        "gold": "0 4px 20px rgba(201, 168, 76, 0.3)",
        "gold-lg": "0 8px 40px rgba(201, 168, 76, 0.4)",
        "maroon": "0 4px 20px rgba(107, 15, 26, 0.3)",
        "luxury": "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(201,168,76,0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
