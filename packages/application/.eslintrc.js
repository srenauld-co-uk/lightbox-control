module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base"
  ],
  plugins: ['jest'],
  rules: {
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/require-default-props': ['error'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
}
