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

  ignorePatterns: ['build', 'dist'],

  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },

  extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],

  plugins: ['prettier'],
}
