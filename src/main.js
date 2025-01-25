import { initializeSubscribeEmail } from './js/subscribeEmail.js';
import { homePageCategoriesLayout } from './js/categories.js';

document.addEventListener('DOMContentLoaded', () => {
  initializeSubscribeEmail();
  homePageCategoriesLayout();
});

localStorage.setItem('favorites', JSON.stringify([]))

import './js/storage.js';
import './js/mobilemenu.js';
import './js/header-toggle.js';
import './js/categories.js';
import './js/quote.js';
import './js/scroll-up.js';
import './js/search.js';
import './js/modal.js';
