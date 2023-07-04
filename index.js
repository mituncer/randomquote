const randomItemDisplay = document.getElementById('randomItemDisplay');
const quoteDisplay = document.getElementById('quoteDisplay');

var keepYes="The daily idea will be kept until next day giving you time to fulfill the related actions. <br>If you want to change teh item at every loading of the page, you need to click the 'Revolve Idea' button below"
var keepNo="The daily idea will be changed at every reload of page. <br>If you want to keep teh idea until next day, you need to click the 'Keep Idea' button below"

const btnEl = document.getElementById("btn01");

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

let todos = [];

const apiURL = "https://api.quotable.io/random";

const currentDate = new Date();
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

var tarih = currentDate.toLocaleDateString('tr-TR');


if (localStorage.getItem('keeptheIdea') === null) {
  localStorage.setItem("keeptheIdea", "no");
  keepOrNot  = "no"


} else {
  keepOrNot = localStorage.getItem('keeptheIdea');
//  if (keepOrNot=="yes") {
//    document.getElementById("myButt1").innerHTML="Revolve Idea";
//  } else {
//    document.getElementById("myButt1").innerHTML="Keep Idea";
//  }
  
}



if (localStorage.getItem('tarihKayit') === null) {
  localStorage.setItem("tarihKayit", tarih);

} else {
tarihRead = localStorage.getItem('tarihKayit');

}


if (localStorage.getItem('keeptheIdea')=="yes") {
  document.getElementById("keepText").innerHTML=keepYes;
  document.getElementById("myButt1").value="Revolve Idea";
  document.getElementById("myButt1").innerHTML="Revolve Idea";
} else {
  document.getElementById("keepText").innerHTML=keepNo;
  document.getElementById("myButt1").value="Keep Idea";
  document.getElementById("myButt1").innerHTML="Keep Idea";
}

// ---------------------------------------------


// Function to keep or change the idea item
function keepIdea()  {
  var elem = document.getElementById("myButt1");
  console.log("at top - elem : ",elem, elem.value);

  if (elem.value=="Keep Idea") {
    // make changes to keep the idea
    keepOrNot = "yes";
    localStorage.setItem('keeptheIdea',keepOrNot);
    document.getElementById("myButt1").value="Revolve Idea";
    document.getElementById("myButt1").innerHTML="Revolve Idea";
    document.getElementById("keepText").innerHTML=keepYes;
    
    console.log("elem value : ", document.getElementById("myButt1").value);
    console.log("3.icerdeyim",keepOrNot, Date());
    console.log("satır");

    
  } else {
    // make changes to revolve ideas
    keepOrNot = "no";
    localStorage.setItem('keeptheIdea',keepOrNot);
    document.getElementById("myButt1").value="Keep Idea";
    document.getElementById("myButt1").innerHTML="Keep Idea";
    document.getElementById("keepText").innerHTML=keepNo;
    
    console.log("elem value : ", document.getElementById("myButt1").value);
    console.log("4.icerdeyim",keepOrNot, Date());
    console.log("satır");

  
  }
};


// ---------------------------------------------







// Function to get a random item
const getRandomItem = () => {
  // Retrieve the updated todos array
  let todos = JSON.parse(localStorage.getItem('todos'));

  if (!todos || todos.length === 0) {
    return 'No items found. Click "Edit/Delete" button to add items.'; // Return a message if there are no items
  }

  var kontrol = ((tarihRead.toString() == tarih.toString()) && keepOrNot=="yes");
  console.log("kontrol=",kontrol);
  console.log("satır");

  if ((tarihRead.toString() == tarih.toString()) && keepOrNot=="yes") {
    var randomIndex = localStorage.getItem('keepIndex');
  }  else {
  // Generate a random index within the range of the todos array
  var randomIndex = Math.floor(Math.random() * todos.length);
  localStorage.setItem('keepIndex',randomIndex);
  localStorage.setItem("tarihKayit", tarih);
  }

  console.log(randomIndex);
  console.log("satır");

  // Retrieve the random item
  const randomItem = todos[randomIndex];

  console.log(randomItem)

  return randomItem;
};


// Function to display the quote
const displayQuote = (quote) => {
  quoteDisplay.textContent = `"${quote.content}" - ${quote.author}`;
};

// Function to fetch a random quote
const fetchRandomQuote = () => {
  fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      displayQuote(data);
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
    });
};


// Function to reload a new quote
const reloadQuote = () => {
  fetchRandomQuote();
};

// Display the random item and fetch the quote on the landing page
document.addEventListener('DOMContentLoaded', () => {
  randomItemDisplay.textContent = getRandomItem();
  fetchRandomQuote();

  // Reload a new quote
  const newQuoteButton = document.getElementById('newQuoteButton');
  newQuoteButton.addEventListener('click', reloadQuote);
});



//---------------------------------------------------
// Function to navigate to the revision page
const navigateToRevisionPage = () => {
  window.location.href = 'revList.html';

};






