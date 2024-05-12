/** @type {import('tailwindcss').Config} */
const sharedConfig = {
	theme: {
		extend: {
			fontFamily: {
				montserrat: ['var(--font-montserrat)'],
				santello: ['var(--font-santello)'],
			},
			colors: {
				'primary-dark': '#181515',
				'primary-light': '#FFFEF4',
			},
			screens: {
				mobile: '320px',
				tablet: '481px',
				laptop: '769px',
				desktop: '1025px',
				'large-desktop': '1201px',
				'2k': '2048px',
				'4k': '3840px',
			},
			backgroundImage: {
				'card-bg': 'linear-gradient(180deg, #fff 0%, #fff 100%)',
			},
		},
	},
	plugins: [],
}

export default sharedConfig
