/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main': '250px 1fr',
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      backgroundColor: {
        'popup_overlay': 'rgba(0, 0, 0,0.5)'
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

