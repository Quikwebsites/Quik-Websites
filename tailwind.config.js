/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-futura-pt)",
      },
      colors: {
        darkGreen: "var(--darkGreen)",
        lightGreen: "var(--lightGreen)",
        midGreen: "var(--midGreen)",
        textDark: "var(--textDark)",
        background: "var(--background)",

        greenGradientColor1: "var(--greenGradientColor1)",
        greenGradientColor2: "var(--greenGradientColor2)",

        success5: "var(--success5)",
        success50: "var(--success50)",
        destructive5: "var(--destructive5)",
        destructive50: "var(--destructive50)",
        warning5: "var(--warning5)",
        warning50: "var(--warning50)",
        brand5: "var(--brand5)",
        brand50: "var(--brand50)",

        gray5: "var(--gray5)",
        gray10: "var(--gray10)",
        gray20: "var(--gray20)",
        gray30: "var(--gray30)",
        gray40: "var(--gray40)",
        gray60: "var(--gray60)",
        gray80: "var(--gray80)",
        gray200: "var(--gray200)",
        gray300: "var(--gray300)",
        gray500: "var(--gray500)",
        gray600: "var(--gray600)",
        gray900: "var(--gray900)",

        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "10px": "0px 0px 10px 0px rgba(115, 154, 136, 0.15)",
        "4px-i": "0px 0px 4px 0px rgba(0, 0, 0, 0.10) inset",
      },
      backgroundImage: {
        "gradient-green1":
          "radial-gradient(var(--greenGradientColor2), var(--greenGradientColor1))",
        "gradient-green2":
          "radial-gradient(var(--greenGradientColor1), var(--greenGradientColor2))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
