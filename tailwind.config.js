/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'gradient-custom': 'linear-gradient(to right, #EF4444, #C084FC, #FBCFE8)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#EF4444",
          "secondary": "#C084FC",
          "accent": "#FBCFE8",
          "neutral": "#F3F4F6",
          "base-100": "#ffffff",
        },
      },
    ],
  },
}
