// index.js
import VueI18n from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  }
}

const i18n = new VueI18n({
  // locale: getLanguage(),
  messages
})

export default i18n
