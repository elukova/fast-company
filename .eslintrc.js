module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": 0,
    semi: ["error", "always"],
    // "react/prop-types": [0],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
  },
};
