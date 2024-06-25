import type {Config} from "tailwindcss";

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
                marquee: "marquee 5s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": {transform: "translate(0, 0)"},
                    "100%": {transform: "translate(-100%, 0)"},
                },
            },
            colors: {
                "dark-background": "#121212",
                "gray-button": "#b2b2b2",
                "gray-button-2": "#ffffff12",
                "hover-gray-button": "#ffffff33",
                "gray-text": "#a7a7a7",
                "hover-gray-background": "#2a2a2a",
            }
        },
    },
    plugins: [],
};
export default config;
