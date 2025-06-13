/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                muli: ["Muli", "sans-serif"],
            },
        },
    },
    plugins: [],
};
