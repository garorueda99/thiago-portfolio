import translations from './data/translations';


const getTranslation = language => key => translations[language][key];

export function translateAll(language) {
  const getTranslationInLanguage = getTranslation(language);

  $('[data-translate-key]').each(function() {
    const key = $(this).attr('data-translate-key');
    const translatedContents = getTranslationInLanguage(key);

    $(this).text(translatedContents);
  });
}

export function bindTranslationHandlers(selector) {
  $(selector).on('click', function(arg) {
    const language = $(this).attr('data-language');
    translateAll(language);
  });
}
