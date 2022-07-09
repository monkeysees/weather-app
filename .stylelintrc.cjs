const namingPattern = "^([a-zA-Z][a-zA-Z0-9]*)([-_]{0,2}[a-zA-Z0-9]+)*$";

module.exports = {
  extends: [
    "stylelint-config-standard-scss",
    "stylelint-config-recommended-scss",
    "stylelint-config-prettier-scss",
  ],
  overrides: [
    {
      files: ["**/*.html"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "selector-class-pattern": namingPattern,
    "custom-property-pattern": namingPattern,
    "scss/dollar-variable-pattern": namingPattern,
  },
};
