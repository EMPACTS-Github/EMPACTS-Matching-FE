const { heroui } = require("@heroui/react");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        empacts: "#9200FE",
      }
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {
            primary: "#ffffff",
            secondary: "#B8BBC0",
            dark: "#141E2E",
            red: "#E50045",
            green: "#70A75C",
            blue: "#1171FF",
          },
          backgroundColor: {
            white: "#ffffff",
            dark: "#141E2E",
            secondary: "#37404D",
            red: "#E50045",
            darkLight: "#1B273A",
            darkLighter: "#243042",
            green: "#70A75C",
            blue: "#1171FF",
          },
        },
        dark: {
          layout: {},
          colors: {
            primary: "#ffffff",
            secondary: "#B8BBC0",
            dark: "#141E2E",
            red: "#E50045",
            green: "#70A75C",
            blue: "#1171FF",
          },
          backgroundColor: {
            white: "#ffffff",
            dark: "#141E2E",
            secondary: "#37404D",
            red: "#E50045",
            darkLight: "#1B273A",
            darkLighter: "#243042",
            green: "#70A75C",
            blue: "#1171FF",
          },
        },
      },
    }),
  ],
};
export default config;
