// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';


export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,mjs}'],
    rules: {
      // Formatting and style
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'always-multiline'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'space-before-blocks': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'arrow-spacing': 'error',
      'brace-style': ['error', '1tbs'],

      // Empty lines and spacing
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'function' },
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'class' },
        { blankLine: 'always', prev: 'class', next: '*' },
        { blankLine: 'always', prev: '*', next: 'export' },
        { blankLine: 'always', prev: 'export', next: '*' },
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: '*', next: 'for' },
        { blankLine: 'always', prev: '*', next: 'while' },
        { blankLine: 'always', prev: '*', next: 'try' },
      ],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],

      // Code quality
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // handled by TypeScript

      // TypeScript specific
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['tests/**/*.{js,ts}', '**/*.spec.{js,ts}', '**/*.test.{js,ts}'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'error',
      'playwright/no-conditional-in-test': 'error',
      'playwright/prefer-web-first-assertions': 'error',
    },
  },
);
