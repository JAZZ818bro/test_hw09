/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B1220',
          sidebar: '#111B2B',
          card: '#131E30',
          border: '#2A3A50',
          hover: '#1B2940',
        },
        cyber: {
          text: '#E8EEF7',
          muted: '#9CAEC3',
          accent: '#5AB7FF',
          accentDark: '#2563EB',
          warning: '#F5B84B',
          success: '#10B981',
          danger: '#EF4444',
          tagFact: '#10B981',
          tagInference: '#60A5FA',
          tagTbc: '#F5B84B',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
