/* eslint-disable quotes */
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    ignorePatterns: ['.next/', 'node_modules/', 'out/', 'dist/', 'build/'],
    plugins: ['prettier', 'sort-class-members', 'unused-imports'],
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // TypeScript Type Check
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
            properties: 'off',
          },
        },
      ],

      // Import
      'import/default': 'error',
      'import/namespace': 'error',
      'import/export': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-duplicates': 'error',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'next/navigation',
              importNames: ['useRouter'],
              message: "Please use '@/plugins/i18n/navigation' instead.",
            },
            {
              name: 'next/router',
              importNames: ['useRouter'],
              message: "Please use '@/plugins/i18n/navigation' instead.",
            },
            {
              name: 'process',
              importNames: ['env'],
              message: "Please use '@/configs/env' instead.",
            },
            {
              name: 'node:process',
              importNames: ['env'],
              message: "Please use '@/configs/env' instead.",
            },
          ],
        },
      ],

      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],

      // Class Sort Order
      'sort-class-members/sort-class-members': [
        'error',
        {
          order: [
            '[static-properties]',
            '[static-methods]',
            '[conventional-private-properties]',
            '[private-properties]',
            '[properties]',
            '[abstract-methods]',
            'constructor',
            '[conventional-private-methods]',
            '[private-methods]',
            '[methods]',
          ],
          groups: {
            'private-properties': [
              { type: 'property', accessibility: 'private' },
            ],
            'private-methods': [{ type: 'method', accessibility: 'private' }],
            'abstract-methods': [{ type: 'method', abstract: true }],
          },
          accessorPairPositioning: 'getThenSet',
        },
      ],

      'comma-dangle': ['error', 'only-multiline'],
      curly: ['error', 'multi-line', 'consistent'],
      eqeqeq: ['error', 'always'],
      'no-else-return': [
        'error',
        {
          allowElseIf: false,
        },
      ],
      'no-fallthrough': 'warn',
      'no-useless-return': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      yoda: 'error',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  }),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parserOptions: {
        // Enable type-aware linting
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default eslintConfig;
