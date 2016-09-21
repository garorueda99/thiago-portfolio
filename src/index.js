import { createHistory } from 'history';
import { createStore, combineReducers } from './pseudo-redux.js';
import { translateAll, bindTranslationHandlers } from './i18n';

import contactForm, { toggleContactForm } from './contact-form.duck';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const history = createHistory()

const reducer = combineReducers({ contactForm });
const store = createStore(reducer);

translateAll('en');
bindTranslationHandlers('.js-translation-control');

// Reconciler
// This is invoked whenever the route changes, and it's responsible for doing
// all the calculations to ensure things animate correctly.
const createReconciler = () => {
  // Making this a factory just so we can cache these selectors.
  const $homeSection = $('.js-home-section');
  const $contactSection = $('.js-contact-section');
  const $aboutMe = $('.js-about-me');
  const $thiago = $('.js-main-image');
  const $contactContents = $('.js-contact-contents');
  const $contactSubmit = $('.js-contact-contents .submit');

  return function reconciler() {
    const isContactVisible = store.getState().contactForm;

    if (isContactVisible) {
      // Figure out how much Thiago needs to be moved over by.
      const thiagoOffset = $thiago.getBoundingClientRect().left * -0.85;

      $thiago.style.transform = `translateX(${thiagoOffset}px)`;
      $aboutMe.style.opacity = 0.25;

      $contactContents.classList.add('active');

      $homeSection.classList.remove('active');
      $contactSection.classList.add('active');
      $contactSubmit.classList.add('active');
    } else {
      $thiago.style.transform = '';
      $aboutMe.style.opacity = 1;

      $contactContents.classList.remove('active');

      $homeSection.classList.add('active');
      $contactSection.classList.remove('active');
      $contactSubmit.classList.remove('active');
    }
  }
}

const reconciler = createReconciler();
store.subscribe(reconciler)


// History integration
function updateStateFromLocation(location) {
  const isContactVisible = location.search.match(/contact=true/i);

  store.dispatch(toggleContactForm(isContactVisible));
}

history.listen(updateStateFromLocation);

// We want to update the state on page-load, but we can't move Thiago until
// the image has resolved.
const $thiagoImg = document.querySelector('.thiago');
if ($thiagoImg.complete) {
  updateStateFromLocation(window.location);
} else {
  $thiagoImg.addEventListener('load', () => {
    updateStateFromLocation(window.location);
  });
}


$$('.js-history-link').forEach(link => {
  link.addEventListener('click', ev => {
    ev.preventDefault();

    const { href } = ev.target;
    const searchStartIndex = href.indexOf('?');
    const search = searchStartIndex !== -1 ? href.slice(searchStartIndex) : '';

    history.push({ search });
  });
});

// TEMP
window.store = store;
