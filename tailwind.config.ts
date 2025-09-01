import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        slideRepos: 'slideRepos 30s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
