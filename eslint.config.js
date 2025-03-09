import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginImport from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["node_modules/", "build/", "dist/", "path/to/ignored/folder/"],
  },
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Built-in modules and external dependencies
            ["internal"], // Internal modules
            ["sibling", "parent"], // Sibling and parent imports
            ["index"], // Index imports
          ],
          "newlines-between": "always", // Add newline between different groups
        },
      ],
    },
  },
];
