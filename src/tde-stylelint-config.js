const IDENTIFIER = '[a-z][a-z0-9]*'; // foo
const IDENTIFIER_FOLLOWING = '[a-z0-9]+'; // 0foo
const VARIABLE_NAME = `#{\\$${IDENTIFIER}}`;
const ROOT_VARIABLE = '#{\\$root}';

const BLOCK_NAME = `${IDENTIFIER}(-${IDENTIFIER_FOLLOWING})*`; // foo-bar, foo, foo-bar-baz
const ELEMENT_NAME = `${IDENTIFIER_FOLLOWING}(?:-${IDENTIFIER_FOLLOWING})*`; // foo-bar, foo, foo-bar-baz, 0foo-bar
const MODIFIER_NAME = `(?:(?:${VARIABLE_NAME}-)?${ELEMENT_NAME}(?:-${VARIABLE_NAME})?|${VARIABLE_NAME})` ; // #{$var}-foo-#{$var}, #{$var}-foo, #{$var}
const NO_NAMESPACE_MODIFIERS = `(?:is|has)-(${ELEMENT_NAME})`; // is-bar, has-baz, is-foo-bar
const SUFFIX = `(?:--${MODIFIER_NAME})?(?:\\.-${NO_NAMESPACE_MODIFIERS})?`;
const PREFIX = `(?:\\.|(?=%))`; // component starts with a dot, placeholder needs a %

const FILE_NAME = `^%?${BLOCK_NAME}$`;
const INITIAL_SELECTOR = `^(((${PREFIX}([lcsou]-)?{componentName})|${ROOT_VARIABLE})(?:__${ELEMENT_NAME})?)${SUFFIX}(\\1${SUFFIX})?$`;
const COMBINED_SELECTOR = `^(\\.([lcsou]-)?{componentName}|${ROOT_VARIABLE})__${ELEMENT_NAME}${SUFFIX}$`;

module.exports = {
  "plugins": [
    "stylelint-scss",
    "stylelint-selector-bem-pattern",
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
  ],
  "rules": {
    "max-empty-lines": 2,
    "no-eol-whitespace": true,
    "no-missing-end-of-source-newline": true,
    "declaration-colon-newline-after": "always-multi-line",
    "declaration-empty-line-before": null,
    "value-list-max-empty-lines": 0,

    "selector-pseudo-element-colon-notation": "double",
    "selector-list-comma-newline-after": null,
    "color-named": "never",

    "declaration-no-important": true,
    "declaration-block-no-duplicate-properties": true,
    "no-duplicate-selectors": null,

    "property-case": "lower",
    "value-keyword-case": "lower",
    "unit-case": "lower",
    "color-hex-case": "lower",
    "selector-pseudo-element-case": "lower",

    "selector-no-vendor-prefix": true,
    "property-no-vendor-prefix": true,
    "value-no-vendor-prefix": true,
    "media-feature-name-no-vendor-prefix": true,
    "at-rule-no-vendor-prefix": true,

    "number-leading-zero": "never",
    "number-no-trailing-zeros": true,
    "function-calc-no-unspaced-operator": true,
    "scss/operator-no-newline-before": true,
    "scss/operator-no-newline-after": true,
    "scss/operator-no-unspaced": true,

    "rule-empty-line-before": ["always-multi-line", {
      "except": [
        "after-single-line-comment"
      ],
      "ignore": [
        "first-nested"
      ]
    }],
    "at-rule-empty-line-before": ["always", {
      "except": [
        "first-nested",
        "blockless-after-same-name-blockless",
      ],
      "ignore": [
        "after-comment",

      ],
      "ignoreAtRules": [
        "import",
        "include",
        "else",
        "extend",
      ],
    }],
    "block-closing-brace-empty-line-before": null,
    "block-closing-brace-newline-before": null,
    "block-closing-brace-newline-after": [
      "always", {
        "ignoreAtRules": ["if", "else"]
      }
    ],
    "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
    "scss/at-else-closing-brace-space-after": "always-intermediate",
    "scss/at-else-empty-line-before": "never",
    "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
    "scss/at-if-closing-brace-space-after": "always-intermediate",

    "plugin/selector-bem-pattern": {
      "implicitComponents": true,
      "componentName": FILE_NAME,
      "componentSelectors": {
        "initial": INITIAL_SELECTOR,
        "combined": COMBINED_SELECTOR,
      },
      "utilitySelectors": /^\.u-[a-z]+$/,
      "ignoreSelectors": [
        /^(svg|img)$/
      ],
    },
  }
};
