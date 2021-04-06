const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "class",
  purge: {
    enabled: false,
    content: [
      "./src/components/**/**/*.tsx",
      "./src/components/**/*.tsx",
      "./src/pages/*.tsx",
      "./src/*.tsx",
    ],
  },
  theme: {
    maxHeight: {
      content: "max-content",
    },
    maxWidth: {
      "1/2": "50%",
      "3/4": "70%",
      content: "max-content",
    },
    minWidth: {
      96: "24em",
      full: "100%",
    },
    flexGrow: {
      0: 0,
      1: 1,
      2: 2,
      DEFAULT: 1,
    },
    extend: {
      spacing: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "full-96": "calc(100% - 24rem)",
        screen: "100vh",
        full: "100%",
        ...defaultTheme.spacing,
      },
      colors: {
        primary: {
          100: "#a2deff",
          200: "#8ecaff",
          300: "#7ab6ff",
          400: "#66a2ff",
          500: "#528eff",
          600: "#3e7aff",
          700: "#2a66ff",
          800: "#1652f0",
        },
        yellow: "#fec14a",
        darkBlue: {
          900: "#113355",
        },
        "dark-grey": "#121212",
      },
      zIndex: {
        "-1": "-1",
      },
      transitionProperty: {
        position: "top, right, bottom, left",
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
  },
}
