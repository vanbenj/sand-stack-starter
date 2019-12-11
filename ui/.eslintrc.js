module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: [
    'svelte3',
    'prettier',
    'json'
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'camelcase': 0,
    'comma-dangle': 0,
    'linebreak-style': ['error', 'unix'],
    'space-before-function-paren': 0,
    'prettier/prettier': ['error', {
			trailingComma: 'es5',
			semi: false,
			singleQuote: true,
			bracketSpacing: true,
			printWidth: 80,
			tabWidth: 2,
			useTabs: false
		}]
  }
}
