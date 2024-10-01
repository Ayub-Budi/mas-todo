/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/views/**/*.vue',
        './src/views/*.vue',
        './src/components/*.vue',
        './src/components/**/*.vue',
        './src/views/*.vue',
        './src/views/**/*.vue',
        './src/layouts/*.vue',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ], 
    plugins: [],
    theme: {
        extend:{
            fontFamily:{
                poppins: ['Poppins','sans-serif']
            }
        }
    },
    fontSize: {
        'h1': ['28px', {lineHeight:'28px', letterSpacing:'-0.5px'}],  
        'h2': ['24px', {lineHeight:'24px', letterSpacing:'-0.25px'}],  
        'h3': ['24px', {lineHeight:'21px', letterSpacing:'-0.5px'}],  
        'body_1': ['18px', {lineHeight:'21.6px', letterSpacing:'-0.5px'}],
        'body_2': ['16px', {lineHeight:'22.4px', letterSpacing:'-0.5px'}],
        'body_3': ['14px', {lineHeight:'22.4px', letterSpacing:'-0.5px'}],
        'sub_title_1': ['28px', {lineHeight:'28px', letterSpacing:'-0.6px'}], 

        'sub-title-3': ['14px', {lineHeight:'22.4px', letterSpacing:'-0.5px'}], 
    },
    fontWeight: {
        regular:"400",
        medium: "500", 
        semiBold: "600",     
        bold: "700",
        bolder: "bolder", 
        lighter: "lighter", 
        w100: "100",
        w200: "200",
        w300: "300",
        w400: "400",
        w500: "500",
        w600: "600",
        w700: "700",
        w800: "800",
        w900: "900",
    }
};
