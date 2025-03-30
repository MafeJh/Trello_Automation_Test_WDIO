import { defineConfig } from "eslint/config";
import { configs as wdioConfig } from "eslint-plugin-wdio";
import globals from "globals";
import js from "@eslint/js";
import "chai";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        process: "readonly",
        assert: "readonly",
        browser: "readonly",
        expect: "readonly",
        $: "readonly",
      },
    },
    extends: ["js/recommended", wdioConfig['flat/recommended']],
    rules: {
      "wdio/no-pause": "warn", // ✅ Allow `browser.pause()` with a warning
      "no-console": "off",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export const scripts = {
  lint: "eslint . --ext .js,.mjs,.cjs",
  format: "prettier --write .",
};
