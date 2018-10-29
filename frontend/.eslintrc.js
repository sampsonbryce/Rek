module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "rules": {
    "camelcase": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 100,
        "tabWidth": 4
      }
    ],
    "no-use-before-define": [
      "error",
      {
        "variables": false
      }
    ]
  },
  "plugins": [
    "prettier",
    "react",
    "react-native"
  ],
  "settings": {
    "import/resolver": 'reactnative'
  }
}