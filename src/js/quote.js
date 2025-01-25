import { fetchQuote } from './api.js';

const quoteText = document.querySelector('.sidebar-quote');
const quoteAuthor = document.querySelector('.sidebar-quote-author');

const storedQuoteDate = localStorage.getItem('quoteDate');
const todayDate = new Date();

const displayQuote = async () => {
  if (storedQuoteDate !== todayDate.toLocaleDateString()) {
    const quoteData = await fetchQuote();
    quoteText.innerHTML = quoteData.quote;
    quoteAuthor.innerHTML = quoteData.author;
    const quoteDate = new Date();
    localStorage.setItem('quoteText', quoteData.quote);
    localStorage.setItem('quoteAuthor', quoteData.author);
    localStorage.setItem('quoteDate', quoteDate.toLocaleDateString());
  } else {
    quoteText.innerHTML = localStorage.getItem('quoteText');
    quoteAuthor.innerHTML = localStorage.getItem('quoteAuthor');
  }
};

displayQuote();
