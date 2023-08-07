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
        blue:"#54C9CC",
        mobile_backDrop_color:"rgba(0, 0, 0, 0.54)",
        headerBar_bgColor:"#54C9CC",
        newlatter_border_color:"#DED9C6",
        color_beige:"#F9F9F5"
      },
      keyframes:{
        fadeInLeft:{
          from:{
            opacity: 0,
            transform: "translate3d(-100%, 0, 0)",
          },
          to: {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          }
        },
        fadeOutLeft:{
          from :{
            opacity: 1
          },
        
          to: {
            opacity: 0,
            transform: "translate3d(-100%, 0, 0)"
          }
        }
      },
      animation:{
        fade_In_Left:"fadeInLeft 1s 0.3s backwards",
        fade_Out_Left:"fadeOutLeft 1s 0.3s forwards"
      }
    }
   
  }
};
