export function handleAnimatedHeading(currentLanguage) {
  // The main heading holds 3 phrases, one for each language.
  // When the language changes, we want to animate it so that the currently
  // active language is moved to the start of the line, and made opaque.
  const enWidth = $('.main-heading-en').getBoundingClientRect();
  const frWidth = $('.main-heading-fr').getBoundingClientRect();
  const ptWidth = $('.main-heading-pt').getBoundingClientRect();

  let offset;
  if (currentLanguage === 'en') {
    offset = 0;
  } else if (currentLanguage === 'fr') {
    offset = enWidth;
  } else if (currentLanguage === 'pt') {
    offset = enWidth + frWidth;
  }

  console.log("OFFSET", offset);
}
