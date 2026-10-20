// eslint.config.js

const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    js.configs.recommended,
    {
        files: ["_src/script/**/*.js"],
        languageOptions: {
            sourceType: "module",
            ecmaVersion: 2021,
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            "no-unused-vars": ["warn", { "vars": "local" }],
        },
    },
    {
        ignores: ["old_version/**", "node_modules/**", "_src/style/**"],
    },
];
