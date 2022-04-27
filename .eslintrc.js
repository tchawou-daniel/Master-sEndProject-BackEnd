module.exports = {
    env: {
        'es2021': true,
        'node': true,
        'jest/globals': true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'jest'],
    settings: {
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js", ".jsx", ".ts", ".tsx"
                ],
                "moduleDirectory": [
                    "node_modules", "src/"
                ]
            }
        },
        jest: {
            "version": 27
        }

    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        "max-len": ["error", { "code": 150 }],
        "arrow-parens": ["error", "always"],
        "no-restricted-syntax": "off",
        "class-methods-use-this": "off",
        "no-lonely-if": "off",
        "no-plusplus": "off",
        "consistent-return": "off",
        "no-nested-ternary": "off",
        "default-case": "off",
        "import/no-cycle": "off",
        "import/prefer-default-export": "off",
        "import/no-absolute-path": "off",
        ///
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        ///////
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",

        "import/order": ["error",
            {
                "groups": [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                    "object"
                ],
                "newlines-between": "always",
                "pathGroups": [
                    {"pattern": "@api/config/**", "group": "internal", "position": "before"},
                    {"pattern": "@api/common/**", "group": "internal"},
                    {"pattern": "@api/modules/**", "group": "internal", "position": "after"}
                ],
                "pathGroupsExcludedImportTypes": ["builtin"],
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                }
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        '@typescript-eslint/no-unused-vars': [2, { "argsIgnorePattern": "^_"}],
        'no-await-in-loop': 'warn',
        'import/no-extraneous-dependencies': 'off'
    },

};
