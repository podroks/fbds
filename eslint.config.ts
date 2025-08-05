import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { Linter } from 'eslint';
import { globalIgnores } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import noRelPath from 'eslint-plugin-no-relative-import-paths';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginVue from 'eslint-plugin-vue';

const importOrderConfig: Linter.Config = {
  files: ['**/*.{ts,tsx,vue}'], // ✅ obligatoire pour flat config
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
        'groups': [
          ['builtin', 'external', 'type'],
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
        ],
        'pathGroups': [
          { pattern: '@/assets{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/plugins{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/stories{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/{constants,types}{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/{composables,utils}{,/**}', group: 'internal', position: 'before' },
          { pattern: '@/components{,/**}', group: 'internal', position: 'before' },
        ],
        'pathGroupsExcludedImportTypes': ['builtin', 'external'],
        'alphabetize': { order: 'asc', caseInsensitive: true },
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
  files: ['**/*.{ts,tsx,vue}'],
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

export default defineConfigWithVueTs(
  // 👇 La config de base
  {
    name: 'lint',
    files: ['**/*.{ts,tsx,vue}'],
  },
  // 👇 Ignorer des dossiers / fichiers
  globalIgnores(['**/dist/**', '**/coverage/**', '**/.storybook/**', 'vitest.config.ts']),

  // 👇 Plugins de librairies
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,

  // 👇 Plugins global de style
  stylistic.configs.recommended,
  stylisticConfigCustomized,

  // 👇 plugin alternatif
  noRelativeImportPathsConfig,
  importOrderConfig,
);
