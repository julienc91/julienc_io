import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

let ready
let readyCallback

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    useCookie: false,
    fallbackLng: 'fr',
    supportedLngs: ['fr'],
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // gatsby doesn't work with suspense...
    },
    detection: {
      lookupLocalStorage: false
    }
  })
  .then(() => {
    ready = true
    if (readyCallback) {
      readyCallback()
    }
  })

export const setCallback = (callback) => {
  readyCallback = callback
  if (ready) {
    readyCallback()
  }
}

export default i18n
