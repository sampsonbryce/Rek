module.exports = {
    "extends": [
        "airbnb-base",
        "prettier",
    ],
    "env": {
        "es6": true,
        "browser": true
    },
    "plugins": [
        "prettier",
    ],
    
    "rules": {
        "camelcase":0,
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 100,
                "tabWidth": 4
            }
        ],
        "eqeqeq": 2,
        "no-unused-vars": [
            "warn"
        ],
    }
}