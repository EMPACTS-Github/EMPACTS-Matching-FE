const { heroui } = require("@heroui/react");
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      textColor: {
        empacts: "#9200FE",
      },
      backgroundColor: {
        empacts: "#9200FE",
      },
      borderColor: {
        empacts: "#9200FE",
      },
      colors: {
        primary: "#9200FE",
        secondary: "#010B23",
        tertiary: "#FF00D6",
        empacts: "#9200FE",
        "empacts-light": "#E8D9FF",
        "empacts-dark": "#5B00A3",
        "empacts-lighter": "#F2E9FF",
        "empacts-darker": "#7B3FFF",
      },
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
    }),
  ],
};
export default config;
