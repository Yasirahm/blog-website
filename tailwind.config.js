// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Correct (Include all nested files)
    "./public/index.html",
  ]
  ,
  theme: {
    extend: {},
  },
  plugins: [],
};