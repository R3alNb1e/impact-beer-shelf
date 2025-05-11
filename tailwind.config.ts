/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'beer-jonquil': '#FDC700',    // Vibrant Yellow (Primary Accent)
                'beer-chamoisee': '#A47864',  // Muted Brownish-Pink (Secondary)
                'beer-beaver': '#B09382',    // Grayish-Brown (Secondary / Muted Backgrounds)
                'beer-cafe-noir': '#533527', // Deep Dark Brown (Your "Light Mode" BG, "Dark Mode" Text)
                'beer-timberwolf': '#CBC4B9', // Light Grayish-Beige (Your "Light Mode" Text, "Dark Mode" BG)
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 10s linear infinite',
                'bounce-slow': 'bounce_custom 3s infinite',
            },
            keyframes: {
                pulse: {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 0.8 },
                },
                bounce_custom: {
                    '0%, 100%': {
                        transform: 'translateY(-15%)',
                        animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
                    },
                    '50%': {
                        transform: 'none',
                        animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
                    },
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};