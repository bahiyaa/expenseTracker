/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
    },
    extend: {
      colors: {
        primary: '#A67B5B',          // Soft Brown
        'primary-accent': '#D8BFAA', // Lighter Brown Accent
        secondary: '#EFE6DD',        // Light Beige
        'secondary-accent': '#CBBBA0',
        background: '#F9F6F1',       // Background Beige
        'card-bg': '#FFFFFF',
        'text-main': '#3E2C1C',      // Dark Coffee Text
        'text-muted': '#7D6E57',
        success: '#A3C9A8',          // Muted Success Green
        warning: '#EAC696',          // Muted Warning
        error: '#D87C6A',            // Muted Error Red
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 4px 10px rgba(28, 5, 5, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      screens: {
        sm: '640px',   // Mobile
        md: '768px',   // Tablet
        lg: '1024px',  // Laptop
        xl: '1280px',  // Desktop
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
