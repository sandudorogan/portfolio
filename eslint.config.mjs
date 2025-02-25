// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt([
  {
    // Global rules that apply to all files
    rules: {
      // Error prevention
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',

      // Best practices
      'vue/multi-word-component-names': 'off', // Allow single-word component names
      'vue/no-v-html': 'warn', // Warn about potential XSS vulnerabilities
      'vue/require-default-prop': 'error', // Require default values for props
      'vue/require-prop-types': 'error', // Require type definitions for props

      // Style consistency
      'vue/html-indent': ['error', 2],
      'vue/html-closing-bracket-newline': ['error', {
        'singleline': 'never',
        'multiline': 'always',
      }],
      'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': 1,
      }],

      // Modern JavaScript features
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': 'error',
    },
  },
  {
    plugins: {
      stylistic,
    },
    rules: {
      'stylistic/semi': ['error', 'never'],
      'stylistic/quotes': ['error', 'single'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/indent': ['error', 2],
      'stylistic/eol-last': ['error', 'always'],
    },
  },
])
