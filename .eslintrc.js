module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: [
    // add more generic rulesets here, such as:
    'standard',
    'plugin:vue/essential'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'indent': 'off',
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    'comma-dangle': ['error', 'only-multiline'],
    'import/first': 'off',
    'space-before-function-paren': 'off',
    'semi': 'off',
    'eqeqeq': 'off',
  },
  globals: {
    '$router': false,
  }
}
