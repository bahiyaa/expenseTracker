/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A67B5B',             // Soft Brown
        'primary-accent': '#D8BFAA',    // Lighter Brown Accent
        secondary: '#EFE6DD',           // Light Beige
        'secondary-accent': '#CBBBA0',
        background: '#F9F6F1',          // Background Beige
        'card-bg': '#FFFFFF',
        'text-main': '#3E2C1C',         // Dark Coffee Text
        'text-muted': '#7D6E57',
        success: '#A3C9A8',             // Muted Success Green
        warning: '#EAC696',             // Muted Warning
        error: '#D87C6A',               // Muted Error Red
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 10px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      // Optional: custom spacing if needed
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
    },
    // Responsive breakpoints (optional, Tailwind already provides these by default)
    screens: {
      sm: '640px',   // Mobile
      md: '768px',   // Tablet
      lg: '1024px',  // Laptop
      xl: '1280px',  // Desktop
      '2xl': '1536px',
    },
  },
  plugins: [],
};
