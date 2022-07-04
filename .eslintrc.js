module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
  ],
  globals: {
    $router: false,
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    eqeqeq: 'off',
    indent: 'off',
    semi: 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'import/first': 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
  }
}
