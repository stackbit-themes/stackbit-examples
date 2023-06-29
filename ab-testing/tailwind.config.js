const defaults = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            fontFamily: {
                ...defaults.fontFamily,
                stackbit: ['FK Display', 'sans-serif']
            }
        }
    },
    plugins: []
};
