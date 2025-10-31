import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        // Keeps existing breakpoints: sm, md, lg, xl, 2xl
      },
      colors: {
        primary: {
          DEFAULT: "#FDB927",
          hover: "#e5a620",
        },
      },
    },
  },
  plugins: [],
};
export default config;
