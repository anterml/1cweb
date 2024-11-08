export const LANGS = {
  ru: "Русский",
  eng: "Английский",
}

const engLangData = {
  requisite: "Requisite",
  requisites: "Requisites",
  document: "Document",
  documents: "Documents",
  record: "Record",
  records: "Records",
  tablePart: "TablePart",
  tableParts: "TableParts",
  form: "Form",
  forms: "Forms",
}

type EntityNames = keyof typeof engLangData
export type LangName = keyof typeof LANGS
export type LangsData = Record<LangName, Record<EntityNames, string>>

export const langsData: LangsData = {
  eng: engLangData,
  ru: {
    requisite: "Реквизит",
    requisites: "Реквизиты",
    document: "Документ",
    documents: "Документы",
    record: "Справочник",
    records: "Справочники",
    tablePart: "Табличная часть",
    tableParts: "Табличные части",
    form: "Форма",
    forms: "Формы",
  },
}

function createLangStore(name: LangName = 'ru') {
  let store = $state<LangName>(name)

  return {
    get name() { return store },
    set name(name: LangName) {
      if(store !== name && langsData[name])
        store = name
    }
  }
}

export const langStore = createLangStore()