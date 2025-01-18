import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			maskImage: {
				'gradient-to-t': 'linear-gradient(to top, rgba(0, 0, 0, 1) , rgba(0, 0, 0, 0) )'
			},
			backdropBlur: {
				xs: '1px'
			}
		}
	},

	plugins: [
		function ({ addUtilities, theme }) {
			const newUtilities = {
				'.mask-gradient-to-t': {
					maskImage: theme('maskImage.gradient-to-t'),
					webkitMaskImage: theme('maskImage.gradient-to-t') // For WebKit browsers
				}
			};
			addUtilities(newUtilities);
		}
	]
} satisfies Config;
