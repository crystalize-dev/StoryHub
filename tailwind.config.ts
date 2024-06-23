/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'selector',
    theme: {
        extend: {
            backgroundOpacity: ['active'],
            colors: {
                primary: {
                    hover: 'var(--primary-hover)',
                    DEFAULT: 'var(--primary)',
                    dark: 'var(--primary-dark)'
                },
                light: {
                    bg: 'var(--bg-full)',
                    object: 'var(--bg-object)'
                },
                dark: {
                    bg: 'var(--bg-full-dark)',
                    object: 'var(--bg-object-dark)'
                }
            }
        }
    },
    plugins: ['prettier-plugin-tailwindcss']
};

export default config;
