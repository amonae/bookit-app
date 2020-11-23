const addBookBtn = document.querySelector(".add-book-btn");
const bookList = document.querySelector(".book-list");
const search = document.querySelector(".search-bar");
let booksArr = [];

if (localStorage.getItem("books")) {
  let books = JSON.parse(localStorage.getItem("books"));
  books.forEach((book) => {
    createBook(book, book);
  });
}

addBookBtn.addEventListener("click", function (e) {
  bookModal(e);
});

function bookModal(e) {
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

  document.body.insertBefore(modal, document.body.childNodes[0]);

  // won't work unless nested inside of the addBookBtn event listener
  modal.addEventListener("click", (e) => addBookToDom(e));

  function addBookToDom(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;

    if (e.target.classList.contains("submit-btn")) {
      function Book(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
      }

      let book = new Book(
        `${title}`,
        `${author}`,
        `${Math.floor(Math.random() * 10000)}`
      );

      // !!! Put this inside of a function !!!
      if (localStorage.getItem("books")) {
        booksArr.push(book);

        let lastBook = booksArr[booksArr.length - 1];
        createBook(book, lastBook);
        localStorage.setItem("books", JSON.stringify(booksArr));
      } else if (!localStorage.getItem("books")) {
        booksArr.push(book);
        let lastBook = booksArr[booksArr.length - 1];
        createBook(book, lastBook);
        localStorage.setItem("books", JSON.stringify(booksArr));
      }

      removeModal();
    }
  }

  // also won't work unless nested inside of addBookBtn event listener
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-times")) {
      removeModal();
    }
  });

  function removeModal() {
    modal.parentNode.removeChild(modal);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    let parent = e.target.parentNode.parentNode.parentNode;
    booksArr = localStorage.getItem("books");
    booksArr = JSON.parse(booksArr);

    booksArr = booksArr.filter((book) => book.id !== parent.id);
    localStorage.setItem("books", JSON.stringify(booksArr));
    bookList.removeChild(parent);
  }
});

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

// Search bar functionality
function searchBooks(searchText) {
  let books = JSON.parse(localStorage.getItem("books"));

  let matches = books.filter((book) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return book.title.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    html = books
      .map(
        (book) => `<div class="book-card">
    <div class="book-cover"></div>
    <div class="book-container">
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
      </div>
      <div class="remove-btn"><i class="fas fa-trash"></i></div>
    </div>
  </div>`
      )
      .join("");
    bookList.innerHTML = html;
  }

  outputHtml(matches);
}

function outputHtml(matches) {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
          <div class="book-card">
            <div class="book-cover"></div>
            <div class="book-container">
              <div class="book-info">
                <div class="book-title">${match.title}</div>
                <div class="book-author">${match.author}</div>
              </div>
              <div class="remove-btn"><i class="fas fa-trash"></i></div>
            </div>
          </div>
      `
      )
      .join("");

    bookList.innerHTML = html;
  }
}

search.addEventListener("input", () => searchBooks(search.value));
