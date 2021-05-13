const plugin = require("tailwindcss/plugin");
const selectorParser = require("postcss-selector-parser");

module.exports = {
  purge: {
    mode: "all",
    content: ["./**/*.html"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      screens: {
        'dark': { 'raw': '(prefers-color-scheme: dark)' },
        // => @media (prefers-color-scheme: dark) { ... }
      }
    },
  }, variants: {
    textColor: ['dark', 'responsive', 'hover', 'focus'],
    backgroundColor: ['dark', 'responsive', 'hover', 'focus']
  },
  plugins: [
    plugin(function ({ addVariant, prefix }) {
      addVariant('dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ selector }) => {
          return selectorParser((selectors) => {
            selectors.walkClasses((sel) => {
              sel.value = `dark${separator}${sel.value}`
              sel.parent.insertBefore(sel, selectorParser().astSync(prefix('.scheme-dark ')))
            })
          }).processSync(selector)
        })
      })
    })
  ]
}
