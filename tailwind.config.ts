import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "3rem",
        "2xl": "3rem",
      },
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    extend: {
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      minHeight: {
        "screen": "100vh",
        "screen-90": "90vh",
        "screen-80": "80vh",
      },
      minWidth: {
        "screen": "100vw",
      },
      maxWidth: {
        "xs": "20rem",
        "sm": "24rem",
        "md": "28rem",
        "lg": "32rem",
        "xl": "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        "prose": "65ch",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          gold: "#B8860B",
          goldDark: "#704214",
          goldLight: "#DAA520",
          goldRich: "#996515",
          goldMetallic: "linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
          cream: "#FDF6E3",
          forest: "#2D6A4F",
          leaf: "#52B788",
          brown: "#3B2412",
          black: "#1A1A1A",
        },
        primary: {
          DEFAULT: "#2D6A4F",
          foreground: "#FDF6E3",
        },
        secondary: {
          DEFAULT: "#B8860B",
          foreground: "#1A1A1A",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#FDF6E3",
          foreground: "#2D6A4F",
        },
        accent: {
          DEFAULT: "#B8860B",
          foreground: "#FDF6E3",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgba(253, 246, 227, 0.8)",
          foreground: "#1A1A1A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "serif"],
        sans: ["Inter", "DM Sans", "sans-serif"],
        hindi: ["Tiro Devanagari Hindi", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        scroll: "scroll var(--speed) var(--direction) linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;