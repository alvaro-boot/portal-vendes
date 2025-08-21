import type { Config } from "tailwindcss"

const config: Config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta de colores oficial de Vendes
        vendes: {
          purple: "#551BB3",   // Púrpura profundo - Color PRINCIPAL
          green: "#A9F04D",    // Verde lima vibrante - Color SECUNDARIO
          neutral: {
            light: "#E2DDD9",  // Gris claro cálido
            medium: "#666666", // Gris medio
            dark: "#292522",   // Gris muy oscuro
          },
          white: "#FFFFFF",    // Blanco puro
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // Familia de fuente principal de Vendes
        sans: ['Inter', 'system-ui', 'sans-serif'],
        vendes: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        // Pesos específicos de Vendes
        'vendes-bold': '700',
        'vendes-semibold': '600',
        'vendes-regular': '400',
      },
      fontSize: {
        // Tamaños específicos para la jerarquía tipográfica de Vendes
        'vendes-title': ['2rem', { 
          lineHeight: '2.5rem', 
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }],
        'vendes-subtitle': ['1.5rem', { 
          lineHeight: '2rem', 
          fontWeight: '600',
          letterSpacing: '-0.025em'
        }],
        'vendes-body': ['1rem', { 
          lineHeight: '1.5rem', 
          fontWeight: '400',
          letterSpacing: '0'
        }],
        'vendes-caption': ['0.875rem', { 
          lineHeight: '1.25rem', 
          fontWeight: '400',
          letterSpacing: '0'
        }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'vendes-gradient': '#551BB3',
        'vendes-gradient-reverse': '#551BB3',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-vendes": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-vendes": "pulse-vendes 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
