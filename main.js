const addBookBtn = document.querySelector(".add-book-btn");
const bookList = document.querySelector(".book-list");
let booksArr = [];

// When the page loads, check if 'books' exists in local storage
if (localStorage.getItem("books")) {
  // If so: parse it, and run the createBook func for each obj within
  let books = JSON.parse(localStorage.getItem("books"));
  books.forEach((book) => {
    createBook(book, book);
  });
}

// Listen for a click on addBookBtn. run bookModal func when clicked
addBookBtn.addEventListener("click", function (e) {
  bookModal(e);
});

// Displays a modal on the page and handles the logic of the elems WITHIN the modal
function bookModal(e) {
  // Create the modal when the addBookBtn button is clicked
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-bg">
    <div class="modal-wrapper">
      <div class="modal-content">
        <h1>Add A Book</h1>
        <form>
        <label for="title">Title:</label><br>
        <input type="text" id="title" name="title"><br>
        <label for="author">Author:</label><br>
        <input type="text" id="author" name="author"><br><br>
      </form>
        <button class="submit-btn">Add book</button>
        
        <div class="close-modal-btn"><i class="fas fa-times"></i></div>
      </div>
    </div>
  </div>
    `;

  // Display/append modal to the document body
  document.body.insertBefore(modal, document.body.childNodes[0]);

  // Listen for a click on the modal. run addBookToDom func when clicked
  modal.addEventListener("click", (e) => addBookToDom(e));

  // Adds book to the DOM/book-list div
  function addBookToDom(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    // If click target is the submit btn...
    if (e.target.classList.contains("submit-btn")) {
      // Create Book constructor
      function Book(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
      }

      // Take the input values and use them to create a new book obj
      let book = new Book(
        `${title}`,
        `${author}`,
        `${Math.floor(Math.random() * 10000)}`
      );

      // Add booksArr to local storage
      // If 'books' is in local storage: retrieve it then update it
      // !!! Put this inside of a function !!!
      if (localStorage.getItem("books")) {
        booksArr.push(book);
        // LastBook is needed for createBook func
        let lastBook = booksArr[booksArr.length - 1];
        createBook(book, lastBook);
        localStorage.setItem("books", JSON.stringify(booksArr));
        //  If 'books' is not in local storage: create 'books' based on booksArr and add to local storage
      } else if (!localStorage.getItem("books")) {
        booksArr.push(book);
        let lastBook = booksArr[booksArr.length - 1];
        createBook(book, lastBook);
        localStorage.setItem("books", JSON.stringify(booksArr));
      }

      // Remove the modal
      removeModal();
    }
  }

  // Listen for a click on the modal. if the close modal btn is clicked, remove the modal from the doc body
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-times")) {
      removeModal();
    }
  });

  // Func that removes the modal
  function removeModal() {
    modal.parentNode.removeChild(modal);
  }
}

// Listen for a click on the document
document.addEventListener("click", (e) => {
  // If trash icon is clicked...
  if (e.target.classList.contains("fa-trash")) {
    // Find 3rd parent of trash icon (the book card) and get 'books' from local storage
    let parent = e.target.parentNode.parentNode.parentNode;
    booksArr = localStorage.getItem("books");
    booksArr = JSON.parse(booksArr);

    // Set booksArr to all of the books that do NOT have matching ID
    booksArr = booksArr.filter((book) => book.id !== parent.id);
    // Set 'books' to updated booksArr
    localStorage.setItem("books", JSON.stringify(booksArr));
    // Remove book card from the book list
    bookList.removeChild(parent);
  }
});

// 'createBook' function
function createBook(book, lastBook) {
  book = document.createElement("div");
  book.classList.add("book-card");
  book.id = lastBook.id;
  book.innerHTML = `
    <div class="book-cover"></div>
            <div class="book-container">
              <div class="book-info">
                <div class="book-title">${lastBook.title}</div>
                <div class="book-author">${lastBook.author}</div>
              </div>
              <div class="remove-btn"><i class="fas fa-trash"></i></div>
            </div>
      `;
  bookList.appendChild(book);
}
