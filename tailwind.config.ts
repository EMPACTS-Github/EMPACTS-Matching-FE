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
      textColor: {
        empacts: "#9200FE",
      },
    },
  },
  plugins: [
    heroui(
    // PLEASE DON'T UNCOMMMENT THESE LINES OF CODE
    // AND DON'T DELETE IT ALSO
    // THE REASON I COMMENT IS TO MAKE THE TOAST OF HEROUI WORK
    // I KNOW IT MIGHT AFFECT STYLING OF SOME PARTS BUT JUST KEEP
    // THIS THAT WAY, I WILL FIX STYLING OF EVERY SINGLE ONE OF THEM
    // - Phuc Dao -
    // {
    //   themes: {
    //     light: {
    //       layout: {},
    //       colors: {
    //         primary: "#ffffff",
    //         secondary: "#B8BBC0",
    //         dark: "#141E2E",
    //         red: "#E50045",
    //         green: "#70A75C",
    //         blue: "#1171FF",
    //         success: "#70A75C",
    //         warning: "#FFC107",
    //         danger: "#E50045",
    //       },
    //       backgroundColor: {
    //         white: "#ffffff",
    //         dark: "#141E2E",
    //         secondary: "#37404D",
    //         red: "#E50045",
    //         darkLight: "#1B273A",
    //         darkLighter: "#243042",
    //         green: "#70A75C",
    //         blue: "#1171FF",
    //       },
    //     },
    //     dark: {
    //       layout: {},
    //       colors: {
    //         primary: "#ffffff",
    //         secondary: "#B8BBC0",
    //         dark: "#141E2E",
    //         red: "#E50045",
    //         green: "#70A75C",
    //         blue: "#1171FF",
    //         success: "#70A75C",
    //         warning: "#FFC107",
    //         danger: "#E50045",
    //       },
    //       backgroundColor: {
    //         white: "#ffffff",
    //         dark: "#141E2E",
    //         secondary: "#37404D",
    //         red: "#E50045",
    //         darkLight: "#1B273A",
    //         darkLighter: "#243042",
    //         green: "#70A75C",
    //         blue: "#1171FF",
    //       },
    //     },
    //   },
    // }
    ),
  ],
};
export default config;
