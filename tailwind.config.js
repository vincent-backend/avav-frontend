/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md, mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1368px",
    },
    extend: {
      fontSize: {
        base: "1rem",
        h1: "130px",
        h2: "50px",
        h3: "40px",
        h4: "24px",
        h5: "20px"
      },
      colors: {
        primary: "#ffffff",
        text: "#747272",
        dark: "#747272",
        cred: "#FD2C2F",
        body: "#000000"
      },
      fontFamily: {
        primary: ['var(--font-pingfang)'],
        secondary: ['var(--font-alimama)'],
        third: ['var(--font-mont-bold)']
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
}
