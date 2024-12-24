export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "140px",
      md: "768px",
      lg: "960px",
      xl: "1500px",
    },
    extend: {
      animation: {
        light: "light 1.5s ease-in-out infinite",
      },
      keyframes: {
        light: {
          "0%": { filter: "brightness(100%)" },
          "50%": { filter: "brightness(200%)" },
          "100%": { filter: "brightness(100%)" },
        },
      },
      colors: {
        "custom-bg": "#030B15",
        col: "#00C4F4",
        btnCol: "rgb(0, 196, 244)",
        circleBit: "#032B5C",
      },
      backgroundImage: {
        vectorImg: `radial-gradient(
          50% 50% at 50% 50%, 
          rgb(0, 91, 236), 
          rgb(0, 73, 190) 12%, 
          rgb(0, 51, 133) 30%, 
          rgb(0, 33, 85) 46%, 
          rgb(0, 19, 48) 62%, 
          rgb(0, 8, 22) 77%, 
          #030B15 100%
        )`,
      },
      bgCircle: "url('/Vector (3).svg')",
    },
  },
  plugins: [],
};
