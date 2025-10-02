/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["content/**/*.md", "themes/myTheme/layouts/**/*.html", "themes/myTheme/assets/js/search.js",],
  darkMode: 'class', 
  theme: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
