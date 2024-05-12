/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@workify/eslint-config/nest.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
