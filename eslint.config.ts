// @ts-ignore
import featureSlicedPlugin from '@conarti/eslint-plugin-feature-sliced';
import figmaPluginsPlugin from '@figma/eslint-plugin-figma-plugins';
import pluginRouter from '@tanstack/eslint-plugin-router';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import checkFilePlugin from 'eslint-plugin-check-file';
import noSecretsPlugin from 'eslint-plugin-no-secrets';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

export default [
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules/**', './src/global-shared'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
          experimentalObjectRestSpread: true,
        },
        project: ['./src/iframe/tsconfig.json', './src/widget/tsconfig.json'],
      },
      globals: {
        figma: 'readonly',
        browser: true,
        es6: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      prettier: prettierPlugin,
      '@conarti/feature-sliced': featureSlicedPlugin,
      react: reactPlugin,
      'unused-imports': unusedImportsPlugin,
      'check-file': checkFilePlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'no-secrets': noSecretsPlugin,
      '@figma/figma-plugins': figmaPluginsPlugin,
    },
    rules: {
      // Prettier rules
      'prettier/prettier': [
        'error',
        {
          trailingComma: 'es5',
          printWidth: 100,
        },
      ],

      // ESLint core rules
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'linebreak-style': ['error', 'unix'],
      'max-classes-per-file': 'off',
      'no-case-declarations': 'off',
      'no-continue': 'off',
      'no-empty': 'error',
      'no-empty-function': 'off',
      'no-param-reassign': 'off',
      'no-prototype-builtins': 'off',
      'no-shadow': 'off',
      'no-restricted-syntax': 'off',
      'no-underscore-dangle': 'off',
      'no-useless-constructor': 'off',
      'no-useless-escape': 'off',
      'no-use-before-define': ['error', { functions: false, classes: false }],
      'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      'no-plusplus': 'off',
      'no-nested-ternary': 'off',
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['error', 3],
      'no-confusing-arrow': 'error',
      'no-div-regex': 'error',
      'no-else-return': 'error',
      'no-magic-numbers': [
        'warn',
        { ignoreArrayIndexes: true, ignoreDefaultValues: true, ignore: [1] },
      ],
      // "id-denylist": ["error", "data", "err", "e", "cb", "callback"],
      'id-length': ['error', { properties: 'never', min: 1 }],
      'one-var': 'off',
      'prefer-promise-reject-errors': 'off',
      'prefer-regex-literals': 'off',
      'prefer-destructuring': 'off',
      'global-require': 'off',
      'guard-for-in': 'off',
      'func-names': 'off',
      strict: 'off',
      'class-methods-use-this': 'off',

      // JSX accessibility rules
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/sort-comp': 1,
      'react/prop-types': 'off',

      // TypeScript rules
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

      // Plugin-specific rules
      'no-secrets/no-secrets': [
        'error',
        {
          ignoreContent: [
            /clip-path="url\(#clip0_/,
            /id="clip0_/,
            /clip0_\d+_/,
            /<svg[\s\S]*<\/svg>/,
          ],
        },
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/*.{js,ts,jsx,tsx}': 'KEBAB_CASE',
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      'import/order': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^.*\\u0000$'],
            ['^react', '^@?\\w'],
            ['^next', '^@?\\w'],
            ['^\\u0000'],
            ['^node:'],
            ['^@?\\w'],
            ['^'],
            ['^\\.'],
          ],
        },
      ],
      'unused-imports/no-unused-imports': 'error',
    },
    settings: {
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@figma/figma-plugins/recommended',
        'plugin:@conarti/feature-sliced/recommended',
        'prettier',
      ],
    },
  },
  {
    files: ['./src/iframe/app/routing/**'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
  prettierRecommended,
  ...pluginRouter.configs['flat/recommended'],
];
