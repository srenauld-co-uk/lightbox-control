module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "airbnb-base"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "eslint-plugin-import", "@typescript-eslint", "jest"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".d.ts",
          ".android.js",
          ".android.jsx",
          ".android.ts",
          ".android.tsx",
          ".ios.js",
          ".ios.jsx",
          ".ios.ts",
          ".ios.tsx",
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
        ],
      },
    },
  },
  rules: {
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
      },
    ],
    "max-len": ["error", 120],
    "@typescript-eslint/ban-ts-comment": 2,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "import/no-extraneous-dependencies": 2,
    "import/extensions": ["error", "never", { svg: "always" }],
    "import/no-named-as-default-member": 2,
    "import/order": 0,
    "import/no-duplicates": 2,
    "import/no-useless-path-segments": 2,
    "import/no-cycle": 2,
    "import/prefer-default-export": 0,
    "import/no-anonymous-default-export": 0,
    "import/named": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "import/namespace": 0,
    "import/default": 0,
    "import/no-named-as-default": 0,
    "import/no-unused-modules": 0,
    "import/no-deprecated": 0,
    "@typescript-eslint/indent": 0,
    "jest/no-identical-title": 2,
    "jest/valid-expect": 2,
    camelcase: 2,
    "prefer-destructuring": 2,
    "no-nested-ternary": 2
  },
};
