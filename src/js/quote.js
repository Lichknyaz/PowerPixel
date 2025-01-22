import {fetchQuote} from './api.js';

const quoteText = document.querySelector(".sidebar-quote");
const quoteAuthor = document.querySelector(".sidebar-quote-author")

const displayQuote = async () => {
  const quoteData = await fetchQuote();
  quoteText.innerHTML = quoteData.quote;
  quoteAuthor.innerHTML = quoteData.author
};

displayQuote();
