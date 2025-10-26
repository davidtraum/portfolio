import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'

// Detect browser language
function getBrowserLocale(): string {
  const browserLang = navigator.language.toLowerCase()
  
  // Check if the browser language starts with 'de' (German)
  if (browserLang.startsWith('de')) {
    return 'de'
  }
  
  // Default to English
  return 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || getBrowserLocale(),
  fallbackLocale: 'en',
  messages: {
    de,
    en
  }
})

export default i18n
