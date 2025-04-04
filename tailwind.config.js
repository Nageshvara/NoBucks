export default {
	darkMode: "class",
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
	  extend: {
		colors: {
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		},
	  },
	},
	plugins: [],
  };
  