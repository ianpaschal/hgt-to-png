module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			modules: true,
			jsx: true
		},
		ecmaVersion: 6,
		sourceType: 'module',
	},
	plugins: [],
	rules: {
		'array-bracket-spacing':     [ 'error', 'always' ],
		'arrow-parens':              [ 'error', 'always' ],
		'arrow-spacing':             [ 'error', { 'before': true, 'after': true } ],
		'array-bracket-newline':     [ 'error', {'multiline': true} ],
		'array-element-newline':     [ 'error', {'multiline': true, 'minItems': 2}],
		'brace-style':               [ 'error', '1tbs' ],
		'comma-dangle':              [ 'error', 'always-multiline'],
		'comma-spacing':             [ 'error', { 'before': false, 'after': true } ],
		'comma-style':               [ 'error', 'last' ],
		'complexity':                [ 'warn', 8 ],
		'computed-property-spacing': [ 'error', 'always' ],
		'dot-notation':              [ 'error' ],
		'eol-last':                  [ 'error', 'always' ],
		'indent':                    [ 'error', 'tab', { 'SwitchCase': 1 } ],
		'max-len':                   [ 'error', { 'code': 100, 'comments': 100, 'tabWidth': 4, 'ignoreTrailingComments': true, 'ignoreUrls': true, 'ignoreTemplateLiterals': true, 'ignoreRegExpLiterals': true, 'ignoreStrings': true } ],
		'max-lines':                 [ 'error', { 'max': 250, 'skipBlankLines': true, 'skipComments': true } ],
		'max-statements':            [ 'error', 30 ],
		'no-confusing-arrow':        [ 'error', { 'allowParens': false } ],
		'no-const-assign':           [ 'error' ],
		'no-dupe-class-members':     [ 'error' ],
		'no-duplicate-imports':      [ 'error' ],
		'no-unexpected-multiline':   [ 'error' ],
		'no-multiple-empty-lines':   [ 'error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 } ],
		'no-new-object':             [ 'error' ],
		'no-undef':                  [ 'error' ],
		'no-unused-vars':            [ 'warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false } ],
		'no-use-before-define':      [ 'error', { 'functions': false } ],
		'no-useless-constructor':    [ 'error' ],
		'no-var':                    [ 'error' ],
		'object-curly-spacing':      [ 'error', 'always' ],
		'one-var':                   [ 'error', 'never' ],
		'operator-linebreak':        [ 'error', 'after', { 'overrides': { '+': 'before' } } ],
		'prefer-arrow-callback':     [ 'error' ],
		'prefer-const':              [ 'warn' ],
		'quotes':                    [ 'error', 'single' ],
		'semi':                      [ 'error', 'always' ],
		'semi-style':                [ 'error', 'last'],
		'space-before-blocks':       [ 'error', 'always' ],
		'space-in-parens':           [ 'error', 'never' ],
		'space-infix-ops':           [ 'error' ],
		'template-curly-spacing':    [ 'error', 'never' ]
	},
	overrides: [
		{
			files: [
				'**/*.ts',
				'**/*.tsx'
			],
			rules: {
				'no-unused-vars':        [ 'off' ],
				'no-undef':              [ 'off' ]
			}
		}
	]
}
