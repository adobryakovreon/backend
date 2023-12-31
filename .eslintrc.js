module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'linebreak-style': 0,
    'indent': ['error', 4, { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    'quotes': [2, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'max-len': [1, { code: 140 }],
    'prettier/prettier': ['error', { 'endOfLine': 'auto' }],
    'lines-between-class-members': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
  },
  
};
