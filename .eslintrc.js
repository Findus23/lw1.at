module.exports = {
    root: true,
    "parser": "vue-eslint-parser",
    plugins: [
        '@typescript-eslint',
        "html"
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:vue/essential",
        "plugin:vue/base",
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',

        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        semi: "error",
        "no-mixed-spaces-and-tabs": 0,
        "vue/no-side-effects-in-computed-properties": 0,
        "vue/no-unused-vars": 0, //maybe warn instead
        "no-undef": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-var-requires": 0
    },
};
