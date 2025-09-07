import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { Linter } from 'eslint';
import { globalIgnores } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import noRelPath from 'eslint-plugin-no-relative-import-paths';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginVue from 'eslint-plugin-vue';

const importOrderConfig: Linter.Config = {
  files: ['**/*.{ts,vue}'], // ✅ obligatoire pour flat config
  plugins: { import: pluginImport },
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'type'], 'internal', ['parent', 'sibling', 'index'], 'object'],
        pathGroups: [
          { pattern: '@/assets{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/plugins{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/stories{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/{constants,types}{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/{composables,utils}{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/components{,/**}', group: 'internal', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'external'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'] },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.app.json',
      },
    },
  },
};

const noRelativeImportPathsConfig: Linter.Config = {
  files: ['**/*.{ts,vue}'],
  plugins: {
    'no-relative-import-paths': noRelPath,
  },
  rules: {
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        rootDir: 'src',
        prefix: '@',
        allowSameFolder: false,
      },
    ],
  },
};

const stylisticConfigCustomized: Linter.Config = {
  files: ['**/*.{js,ts,vue}'],
  plugins: {
    '@stylistic': stylistic,
  },
  rules: {
    '@stylistic/semi': ['error', 'always'],
  },
};

const vueTemplateConfig: Linter.Config = {
  files: ['**/*.{vue,ts}'],
  rules: {
    'vue/html-indent': ['error', 2],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'beside',
        multiline: 'below',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/object-curly-spacing': ['error', 'never'],
    'vue/space-in-parens': ['error', 'never'],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
  },
};

const prettierConfig: Linter.Config = {
  files: ['**/*.{js,ts,vue}'],
  plugins: { prettier: pluginPrettier },
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        trailingComma: 'all',
        bracketSpacing: true,
        arrowParens: 'always',
        singleAttributePerLine: true,
      },
    ],
  },
};

export default defineConfigWithVueTs(
  // 👇 La config de base
  {
    name: 'lint',
    files: ['**/*.{ts,tsx,vue}'],
  },
  // 👇 Ignorer des dossiers / fichiers
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/.storybook/**',
    '**/storybook-static/**',
    'vitest.config.ts',
  ]),

  // 👇 Plugins de librairies
  pluginVue.configs['flat/recommended'],
  pluginVue.configs['flat/essential'],
  vueTemplateConfig,
  vueTsConfigs.recommended,
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  ...pluginOxlint.configs['flat/recommended'],

  // 👇 Plugins global de style
  stylistic.configs.recommended,
  stylisticConfigCustomized,
  configPrettier, // 👈 désactive les règles stylistic en conflit avec Prettier

  // 👇 plugin alternatif
  noRelativeImportPathsConfig,
  importOrderConfig,
  prettierConfig,
);
