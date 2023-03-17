/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "eslint-config-standard",
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  env: {
    "vue/setup-compiler-macros": true
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-unused-vars": "error",
    "vue/multi-word-component-names": 0,
    "vue/singleline-html-element-content-newline": 0,
    quotes: ["error", "double"],
    "func-call-spacing": 0,
    "vue/max-attributes-per-line": ["error", {
      singleline: {
        max: 3
      },
      multiline: {
        max: 1
      }
    }]
    // "prettier/prettier": [
    //   "error",
    //   {
    //     endOfLine: "auto"
    //   }
    // ]
  }
}
