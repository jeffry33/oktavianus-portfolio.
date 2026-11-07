import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#080b12', panel: '#101622', accent: '#8b9cff' } } },
  plugins: [],
};
export default config;
