import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        marquee: "marquee 5s linear infinite alternate",
      },
      keyframes: {
        marquee: {
          "0%": { textIndent: "0%" },
          "10%": { textIndent: "0%" },
          "90%": { textIndent: "-10%" },
          "100%": { textIndent: "-10%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
