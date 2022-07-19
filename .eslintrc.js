/** @format */

module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        getApp: 'readonly',
        wx: 'readonly',
        uni: 'readonly'
    }, //全局变量要在这里添加，避免出现提示
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        'plugin:prettier/recommended'
    ],
    rules: {
        'for-direction': 'error',
        // getter 必须有返回值，并且禁止返回空，比如 return;
        'getter-return': [
            'error',
            {
                allowImplicit: false
            }
        ],
        'no-var': 1,
        // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了
        // @off 要求太严格了，有时需要在循环中写 await
        'no-await-in-loop': 'off',
        // 禁止与负零进行比较
        'no-compare-neg-zero': 'error',
        // 禁止在 if, for, while 里使用赋值语句，除非这个赋值语句被括号包起来了
        'no-cond-assign': ['error', 'except-parens'],
        // 禁止使用 console
        // 禁止将常量作为 if, for, while 里的测试条件，比如 if (true), for (;;)，除非循环内部有 break 语句
        'no-constant-condition': [
            'error',
            {
                checkLoops: false
            }
        ],
        'no-tabs': 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars':
            process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'vue/no-unused-components':
            process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
        // 开启此规则，因为字符串中一般不会出现 Ctrl 键，所以一旦出现了，可能是一个代码错误
        'no-control-regex': 'error',
        // @fixable 禁止使用 debugger
        // 禁止在函数参数中出现重复名称的参数
        semi: ['error', 'always'],
        'no-dupe-args': 'error',
        // 禁止在对象字面量中出现重复名称的键名
        'no-dupe-keys': 'error',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                semi: true,
                trailingComma: 'none',
                bracketSpacing: true,
                jsxBracketSameLine: true,
                tabWidth: 4,
                insertPragma: true,
                requirePragma: false,
                endOfLine: 'auto'
            }
        ]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
