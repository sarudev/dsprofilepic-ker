module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: [
      './tsconfig.json'
    ]
  },
  rules: {
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
