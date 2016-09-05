import { createHistory } from 'history';
import { createStore, combineReducers } from './pseudo-redux.js';

import contactForm, { toggleContactForm } from './contact-form.duck';


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const history = createHistory()

const reducer = combineReducers({ contactForm });
const store = createStore(reducer);


history.listen(location => {
  const isContactVisible = location.search.match(/contact=true/i);

  store.dispatch(toggleContactForm(isContactVisible));
});


const $aboutMe = $('.js-about-me');
const $thiago = $('.js-main-image');
const $contactContents = $('.js-contact-contents');

// Reconciler
// This is invoked whenever the route changes, and it's responsible for doing
// all the calculations to ensure things animate correctly.
store.subscribe(() => {
  const isContactVisible = store.getState().contactForm;


  if (isContactVisible) {
    // Figure out how much Thiago needs to be moved over by.
    const thiagoOffset = $thiago.getBoundingClientRect().left * -0.85;
    $thiago.style.transform = `translateX(${thiagoOffset}px)`;
    $aboutMe.style.opacity = 0.25;
    $contactContents.classList.add('active');
  } else {
    $thiago.style.transform = '';
    $aboutMe.style.opacity = 1;
    $contactContents.classList.remove('active');
  }
})



$('.js-click-contact-link').addEventListener('click', ev => {
  ev.preventDefault();
  history.push({ search: '?contact=true' });
})

// TEMP
window.store = store;
