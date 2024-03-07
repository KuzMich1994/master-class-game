module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['react-app', 'plugin:react/recommended', 'airbnb', 'plugin:storybook/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'kuzmich-plugin', 'unused-imports'],
  rules: {
    indent: 'off',
    'react/jsx-indent': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    'no-undef': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': [2],
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': [2],
    'import/no-extraneous-dependencies': [1],
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'max-len': [
      'error',
      {
        ignoreComments: true,
        code: 120,
        ignoreStrings: true,
      },
    ],
    'react/function-component-definition': 'off',
    'linebreak-style': 0,
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'kuzmich-plugin/path-checker': [
      'error',
      {
        alias: '@',
      },
    ],
    'kuzmich-plugin/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/store-provider', '**/testing'],
      },
    ],
    'kuzmich-plugin/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilePatterns: ['**/*.test.*', '**/*.stories.*', '**/store-decorator.tsx'],
      },
    ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 3,
      },
    ],
    'no-plusplus': 'off',
    'prefer-destructuring': 'off',
    'no-extra-boolean-cast': 'off',
    'no-unused-expressions': 'off',
    'prefer-object-spread': 'off',
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
};
