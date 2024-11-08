import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api'
type ElemType = 'input'

export default (monaco: typeof Monaco, elemType: ElemType): Monaco.languages.CompletionItemProvider => {
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