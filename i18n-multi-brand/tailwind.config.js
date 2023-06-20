/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const { getCurrentBrandSlug } = require('./utils/common');
const fs = require('fs');

const brandSlug = getCurrentBrandSlug();
//sss
const allBrandThemes = JSON.parse(fs.readFileSync('./brand-themes.json').toString());
console.log('Tailwind config initializing for brand:', brandSlug);
const brandTheme = allBrandThemes[brandSlug] || allBrandThemes['fallback'];

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: brandTheme.colors,
    },
  },
  plugins: [],
};
