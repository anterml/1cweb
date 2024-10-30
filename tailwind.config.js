/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'main': '250px 1fr',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      backgroundColor: {
        'myoverlay': 'rgba(0, 0, 0,0.5)'
      },
      borderRadius: {
        'primary': '3px',
        'secondary': '50%',
      },
      padding: {
        'top': '15px 0 0'
      }
    },
  },
  plugins: [],
}

