/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"app/**/*.tsx"
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
}
