module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'space-before-function-paren': 'off',
    'prefer-const': 'off',
    'vue/multi-word-component-names': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser'
  }
}
