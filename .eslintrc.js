module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/airbnb'],
    rules: {
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                vue: 'never'
            }
        ],
        'comma-dangle': ['error', 'never'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'max-len': 'off',
        indent: ['error', 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            },
            rules: {
                'import/no-extraneous-dependencies': 'off'
            }
        }
    ]
};
