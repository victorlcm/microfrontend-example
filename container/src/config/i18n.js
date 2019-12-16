import XHR from 'i18next-xhr-backend';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BASE_MICROFRONTEND_URL } from './index';

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: `${BASE_MICROFRONTEND_URL}/locales/{{lng}}/{{ns}}.json`,
      crossDomain: true,
    },

    lng: 'pt-BR',
    load: 'currentOnly',
    fallbackLng: 'pt-BR',

    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
