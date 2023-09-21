/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			wed_white: '#fffcf0',
			wed_grey: '#a3b0ae',
			wed_blue: '#cadddd',
			wed_black: '#292929',
			wed_tan: '#f0d5bb',
			black: colors.black,
			white: colors.white,
		},
		extend: {
			fontFamily: {
				'roboto': ['Roboto', 'sans-serif'],
				'vibes': ['Great Vibes', 'cursive']
			},
		},
	},
	plugins: [
		require('tailwindcss'),
	],
}

