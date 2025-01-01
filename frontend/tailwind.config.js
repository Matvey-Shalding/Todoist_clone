export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
	extend: {
		colors: {
			text: '#fff',
			red: '#fa4343',
			blue: '#1e3a8a',
		},
		backgroundColor: {
			nav: '#141414',
			main: '#0c0e0d',
			btn: '#f0f0f0',
			red: '#ff3636',
			blue: '#1e3a8a',
			hover: '#2b2b2b',
			white: '#fff',
		},
		borderRadius: {
			classic: '10px',
		},
		borderColor: {
			main: '#fff',
		},
		boxShadow: {
			large: '0 10px 15px -3px #fff, 0 4px 6px -4px #fff',
			small: '0 4px 6px -1px #fff, 0 2px 4px -2px #fff',
			light: '0 2px 4px -1px #fff, 0 2px 4px -2px #fff',
			tiny: '0 2px 2px -1px #fff, 0 2px 2px -2px #fff',
			task: '0 6px 12px -3px rgb(63, 63, 70), 0 4px 6px -4px rgb(63, 63, 70)'
		},
		keyframes: {
			appear: {
				'0%': { opacity: '0' },
				'100%': { opacity: '1' },
			},
		},
		animation: {
			appear: 'appear 1s ease-in-out',
		},
	},
};
export const plugins = [];
