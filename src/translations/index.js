import I18n from 'react-native-i18n';
import en from './en';
import sq from './sq';

I18n.fallbacks = true;

I18n.translations = {
  en,
  sq,
};

export const switchLanguage = lang => {
  I18n.locale = lang;
};

export const switchLanguageFunctions = lang => {
  I18n.locale = lang;
};

export default I18n;
