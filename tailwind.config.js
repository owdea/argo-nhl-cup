/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        Onest: ['Onest', 'sans-serif']  // ⬅️ Tady Tailwindu řekneš, co je font-Onest
      },
      colors: {
        primary: {
          10: "#E5E6E6",
          20: "#F5F5F5",
          30: "#767676",
          40: "#F6F6F6"
        }
      }
    },
  },
  plugins: [],
}

