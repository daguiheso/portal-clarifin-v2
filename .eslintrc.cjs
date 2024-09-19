module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/base",
    "eslint:recommended",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential"
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
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "vue"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "off",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    "vue/max-len": [
      "error",
      {
        code: 300,
        template: 150,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreHTMLTextContents: true,
        ignoreRegExpLiterals: true,
      }
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: 1
      }
    ],
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "below"
      }
    ],
    "vue/html-indent": [
      "error",
      2,
      {}
    ],
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignores: ["pre", "textarea"],
        allowEmptyLines: true
      }
    ],
    "vue/script-indent": [
      "error",
      2,
      {
        baseIndent: 0,
        switchCase: 1
      }
    ],
    "vue/multi-word-component-names": 0,
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION",
          "LIST_RENDERING",
          "CONDITIONALS",
          "RENDER_MODIFIERS",
          "GLOBAL",
          ["UNIQUE", "SLOT"],
          "TWO_WAY_BINDING",
          "OTHER_DIRECTIVES",
          [
            "ATTR_STATIC",
            "ATTR_DYNAMIC",
            "ATTR_SHORTHAND_BOOL"
          ],
          "EVENTS",
          "CONTENT"
        ],
        alphabetical: false
      }
    ],
    "vue/component-tags-order": [
      "error",
      {
        order: [
          "template",
          "script",
          "style"
        ]
      }
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never",
        "selfClosingTag": {
          "singleline": "never",
          "multiline": "never"
        }
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: [
          "try",
          "return",
          "function"
        ]
      },
      {
        blankLine: "always",
        prev: [
          "const",
          "let",
          "var"
        ],
        next: "*"
      },
      {
        blankLine: "any",
        prev: [
          "const",
          "let",
          "var"
        ],
        next: [
          "const",
          "let",
          "var"
        ]
      }
    ],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "always"
    }]
  }
}