const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let quotesList = [];

// Loader
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const loadComplete = function () {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Check if author is blank and replace it with 'unknown'
const checkAuthor = function (quote) {
  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }
};

// Reduce the size of the quote text if exceeds 120 char
const checkQuoteText = function (quote) {
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
};

// Generate random quote
const newQuote = function (quotes) {
  loading();

  // Pick random index from quotesList array
  let randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  checkAuthor(quote);
  checkQuoteText(quote);
  loadComplete();
};

// Get Quotes from API
const getQuotes = async function () {
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    quotesList = await response.json();
    newQuote(quotesList);
  } catch (error) {
    console.log(error);

    // If fetch fails, we use local array quotes from quotes.js
    quotesList = localQuotes;
    newQuote(quotesList);
  }
};

// Tweet quote
const tweetQuote = function () {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(tweetUrl, '_blank');
};

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', () => {
  newQuote(quotesList);
});

// On load!
getQuotes();
