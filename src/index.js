import { createHistory } from 'history';
import { createStore, combineReducers } from './pseudo-redux.js';

const history = createHistory()

// Action Types
const TOGGLE_CONTACT_FORM = 'CONTACT_FORM/TOGGLE_CONTACT_FORM';

// Action Creators
const toggleContactForm = isVisible => ({
  type: TOGGLE_CONTACT_FORM,
  isVisible,
});

const contactFormReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_CONTACT_FORM: return !state;
    default: return state;
  }
}

const reducer = combineReducers({ contactForm: contactFormReducer });
const store = createStore(reducer);

history.listen(location => {
  const isContactVisible = location.search.match(/contact=true/i);

  store.dispatch(toggleContactForm(isContactVisible))
})

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


$('.js-click-contact-link').addEventListener('click', ev => {
  ev.preventDefault();
  history.push({ search: '?contact=true' });
})
//
// TEMP
window.store = store;
