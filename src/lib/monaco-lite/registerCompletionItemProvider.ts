import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'
type ElemType = 'input'

export default (monaco: typeof Monaco, elemType: ElemType): Monaco.languages.CompletionItemProvider => {

  // Monaco.languages.CompletionItem
  const values: Record<ElemType, Record<string, any>> = {
    input: [
      {
        documentation: 'efoninput',
        insertText: 'export function oninput(current: Input, inputs: Inputs) {\n\t$1\n}\n',
        kind: monaco.languages.CompletionItemKind.Function,
        label: 'efoninput',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
      {
        documentation: 'efonchange',
        insertText: 'export function efonchange(current: Input, inputs: Inputs) {\n\t$1\n}\n',
        kind: monaco.languages.CompletionItemKind.Function,
        label: 'efonchange',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
      {
        documentation: 'ig',
        insertText: "import { $1 } from 'file:///src/lib/snippets/base'${2}",
        kind: monaco.languages.CompletionItemKind.Keyword,
        label: 'ig',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
      {
        documentation: 'efonforminput',
        insertText: 'export const onforminput: OnFormInput = {\n\tobserveFields: [$1],\n\thandle(current, inputs, triggerInput) {\n\t\t$2\n\t}\n}',
        kind: monaco.languages.CompletionItemKind.Keyword,
        label: 'efonforminput',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
      {
        documentation: 'efsum',
        insertText: 'export const \\$sum: OnlyNumberName[] = [$1]',
        kind: monaco.languages.CompletionItemKind.Keyword,
        label: 'efsum',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
      {
        documentation: 'efproduct',
        insertText: 'export const \\$product: OnlyNumberName[] = [$1]',
        kind: monaco.languages.CompletionItemKind.Keyword,
        label: 'efproduct',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      },
    ]
  }

  return {
    // @ts-ignore
    provideCompletionItems: function (model, position) {
      return {
        suggestions: values[elemType] || [],
      }
    }
  }
}



/*
export default (type: 'input' | 'checkbox' | 'button' | 'select'): Monaco.languages.CompletionItemProvider => {

  return {
    // @ts-ignore
    provideCompletionItems: function (model, position) {
    // Get the text before the cursor
    const word = model.getWordUntilPosition(position)
    const range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    }

      return {
        suggestions: [
          {
            documentation: 'faster',
            insertText: 'fsut',
            kind: monaco.languages.CompletionItemKind.Keyword,
            label: 'faster',
            range: range
          },
          {
            label: 'myif',
            kind: monaco.languages.CompletionItemKind.Function,
            documentation: 'Describe your library here',
            insertText: 'myif(${1:my-third-party-library}){$2}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            documentation: 'efoninput',
            insertText: 'export function oninput(current: Input, inputs: Inputs) {\n\t$1\n}\n',
            kind: monaco.languages.CompletionItemKind.Function,
            label: 'efoninput',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            documentation: 'efonchange',
            insertText: 'export function efonchange(current: Input, inputs: Inputs) {\n\t$1\n}\n',
            kind: monaco.languages.CompletionItemKind.Function,
            label: 'efonchange',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            documentation: 'ig',
            insertText: "import { $1 } from 'file:///src/lib/snippets/base'${2}",
            kind: monaco.languages.CompletionItemKind.Keyword,
            label: 'ig',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            documentation: 'efonforminput',
            insertText: 'export const onforminput: OnFormInput = {\n\tobserveFields: [$1],\n\thandle(current, inputs, triggerInput) {\n\t\t$2\n\t}\n}',
            kind: monaco.languages.CompletionItemKind.Keyword,
            label: 'efonforminput',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
        ],
      }
    }
  }
}
*/