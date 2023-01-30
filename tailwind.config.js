/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'white': '#ffffff',
      'black': '#000000',
      'gray': '#dddddd',
      'blue': '#166fb9',
    },
    extend: {
      backgroundImage: {
        "bg-login": "url('images/bg-login.jpg')",
        "logo": "url('images/logo.svg')",
      },
    },
  },
  plugins: [],
};
