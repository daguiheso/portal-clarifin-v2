/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  "rules": {
	  "vue/multi-word-component-names": ["error", {
	    "ignores": string
	  }]
  }
}
