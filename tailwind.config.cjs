/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./pages/**/*.sh'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Manrope Variable', 'sans-serif']
			}
		}
	},

	plugins: []
};

module.exports = config;
