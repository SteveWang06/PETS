import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from './translations/en.json'
import zh_tw from './translations/zh_tw.json'

const resources = {
  en: {
    translation: en,
  },
  zh_tw: {
    translation: zh_tw,
  },
  
}

i18next
.use(initReactI18next)
.init({
  debug: true,
  lng: 'en',
  compatibilityJSON: 'v3',
  //language to use if translation in user language is not available
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18next;