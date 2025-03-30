const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        santello: ['var(--font-santello)']
      },
      boxShadow: {
        toggleSwitch: '0 0 7px 0 rgba(254, 253, 243, 0.22)'
      },
      backgroundImage: {
        'layout-lines': "url('/images/layout-bg-lines.svg')"
      },
      backgroundSize: {
        'layout-lines': '100% auto'
      }
    }
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({})
      addComponents({
        '.foreground': {
          backgroundColor: 'rgba(232, 202, 189, 0.08)',
          backdropFilter: 'blur(44.4px)'
        },
        '.text-stroke': {
          textShadow:
            '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }
      })
      addUtilities({
        '.flex-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        '.skip-ink-none': {
          textDecorationSkipInk: 'none'
        }
      })
    })
  ],
  presets: [require('@workify/tailwind-config')]
}
