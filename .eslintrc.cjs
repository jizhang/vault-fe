module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-undef': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    // TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    // Vue
    'vue/multi-word-component-names': 'off',
  }
}
