import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme:{
    extend:{
      colors:{
        primary:"#A09364",
        secondary:"#ED75AB",
        accent:"#222727",
        blue:"#54C9CC"
      }
    }
   
  }
};
