import stylistic from '@stylistic/eslint-plugin';
import pluginVitest from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { Linter } from 'eslint';
import { globalIgnores } from 'eslint/config';
import configPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginVue from 'eslint-plugin-vue';
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

  // 👇 Plugins global de style
  stylistic.configs.recommended,
  stylisticConfigCustomized,
  configPrettier, // 👈 désactive les règles stylistic en conflit avec Prettier

  // 👇 plugin alternatif
  prettierConfig,
);
