/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41cc5b",
        secondary:{
          100 :'#E2E2D5',
          200 :'#888883',
        },
        "custom-blue": "#41cc5b",
        "cust-text-descrip": "#799397",
      },
      fontFamily:{
        primary:['sans-serif'],
        secondary:['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
