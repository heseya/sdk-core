module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      modules: true,
    },
  },

  ignorePatterns: ['build'],

  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
  },

  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],

  plugins: ['prettier'],
}
