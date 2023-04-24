import { parserWithMetaData as sourcifyParser } from 'codemirror-lang-sourcify-expression';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { javascriptLanguage } from '@codemirror/lang-javascript';

import { sourcifyCompletionSources } from './completions/addCompletions';

const sourcifyParserWithNestedJsParser = sourcifyParser.configure({
	wrap: parseMixed((node) => {
		if (node.type.isTop) return null;

		return node.name === 'Resolvable'
			? { parser: javascriptLanguage.parser, overlay: (node) => node.type.name === 'Resolvable' }
			: null;
	}),
});

const sourcifyLanguage = LRLanguage.define({ parser: sourcifyParserWithNestedJsParser });

export function sourcifyLang() {
	return new LanguageSupport(sourcifyLanguage, [
		sourcifyLanguage.data.of({ closeBrackets: { brackets: ['{', '('] } }),
		...sourcifyCompletionSources().map((source) => sourcifyLanguage.data.of(source)),
	]);
}
