module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ["react-refresh", "@typescript-eslint", "css-import-order"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:css-import-order/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/react-in-jsx-scope": 0,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "unknown",
        ],
        pathGroups: [
          {
            pattern: "~/**/*",
            group: "internal",
            position: "after",
          },
          {
            pattern: "*.{svg,png,jpg}",
            patternOptions: {
              dot: true,
              nocomment: true,
              matchBase: true,
            },
            group: "unknown",
            position: "before",
          },
          {
            pattern: "*.{scss,css}",
            patternOptions: {
              dot: true,
              nocomment: true,
              matchBase: true,
            },
            group: "unknown",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "unknown"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
