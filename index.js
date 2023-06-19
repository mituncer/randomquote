const randomItemDisplay = document.getElementById('randomItemDisplay');
const quoteDisplay = document.getElementById('quoteDisplay');

const btnEl = document.getElementById("btn01");

const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

let todos = [];

const apiURL = "https://api.quotable.io/random";

// Function to get a random item
const getRandomItem = () => {
  // Retrieve the updated todos array
  let todos = JSON.parse(localStorage.getItem('todos'));

  if (!todos || todos.length === 0) {
    return 'No items found. Go to "Edit / Remove" button to add item'; // Return a message if there are no items
  }

  // Generate a random index within the range of the todos array
  const randomIndex = Math.floor(Math.random() * todos.length);

  // Retrieve the random item
  const randomItem = todos[randomIndex];

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




// Function to navigate to the revision page
const navigateToRevisionPage = () => {
  window.location.href = 'revList.html';

};

// Execute renderTodos() on page load
document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});

// Display the random item on the landing page
document.addEventListener('DOMContentLoaded', () => {
  randomItemDisplay.textContent = getRandomItem();
  fetchRandomQuote();
});


const getTodos = () => {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}

const getRandomTodo = () => {
  // Retrieve updated todos array
  let todos = getTodos();

  if (todos.length === 0) {
    return ''; // Return empty string if there are no todos
  }

  // Generate a random index within the range of the todos array
  const randomIndex = Math.floor(Math.random() * todos.length);

  // Retrieve the random todo item
  const randomTodo = todos[randomIndex];

  return randomTodo;
}

// Retrieve the elements from the HTML
const inputText = document.getElementById('inputText');
const saveButton = document.getElementById('saveButton');
const todoList = document.getElementById('todoList');

// Function to render the todos list
const renderTodos = () => {
  todoList.innerHTML = ''; // Clear the existing list

  // Retrieve updated todos array
  let todos = getTodos();

  // Iterate over the todos array and create list items
  todos.forEach((todo, index) => {
    const listItem = document.createElement('li');

    // Create a container div for the todo item and remove button
    const container = document.createElement('div');
    container.classList.add('todo-item');

    // Create a span for the todo item text
    const todoText = document.createElement('span');
    todoText.textContent = `${index + 1}. ${todo}`;
    todoText.classList.add('todo-item-text');

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => {
      removeTodoItem(index);
    });

    // Append the todo item text and remove button to the container
    container.appendChild(todoText);
    container.appendChild(removeButton);

    // Append the container to the list item
    listItem.appendChild(container);

    // Append the list item to the todo list
    todoList.appendChild(listItem);
  });
  


  // Display the random todo at the top of the container
  const randomTodoDisplay = document.getElementById('randomTodoDisplay');
  randomTodoDisplay.textContent = getRandomTodo();
}

// Function to remove a todo item
const removeTodoItem = (index) => {
  const confirmation = confirm('Are you sure you want to remove this item?');

  if (confirmation) {
    // Retrieve existing array from localStorage
    let todos = getTodos();

    // Remove the item at the specified index
    todos.splice(index, 1);

    // Store the updated array in localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Re-render the todos list
    renderTodos();
  }
};


  // Return to Landing Page
  const returnButton = document.getElementById('returnButton');
  returnButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });


const closeTab = () => {
  window.close();
};



// Add event listener to the close button
const closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', closeTab);

// Add event listener to the save button
saveButton.addEventListener('click', () => {
  const data = inputText.value; // Get the value from the input field

  if (data.trim() !== '') {
    // Retrieve existing array from localStorage or create a new empty array
    let todos = getTodos();

    // Add the new data to the array
    todos.push(data);

    // Store the updated array in localStorage
    localStorage.setItem('todos', JSON.stringify(todos));

    // Clear the input field
    inputText.value = '';

    // Render the updated todos list
    renderTodos();
  }
});





