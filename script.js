let quotesList = [];

//Generate random quote
const newQuote = function () {
  //Pick random index from quotesList array
  let randomIndex = Math.floor( Math.random() * quotesList.length );
  const quote = quotesList[randomIndex];
  console.log( quote );
}

//Generate a Quote from a local array in case of error
const backupQuote = function () {
  let randomIndex = Math.floor( Math.random() * localQuotes.length );
  const quote = localQuotes[randomIndex];
  console.log( quote );
}

// Get Quotes from API
const getQuotes = async function () {
  const apiUrl = 'https://type.fit/api/quotes2';
  try {
    const response = await fetch( apiUrl );
    quotesList = await response.json();
    newQuote();
  } catch ( error ) {
    backupQuote();
    console.log( error );
  }
}

// On load!
getQuotes();