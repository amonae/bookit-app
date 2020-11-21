const addBookBtn = document.querySelector(".add-book-btn");
const modalContainer = document.querySelector(".modal-container");
const bookList = document.querySelector(".book-list");
const closeModalBtn = document.querySelector(".close-modal-btn");
let booksArr = [];

addBookBtn.addEventListener("click", function (e) {
  bookModal(e);
});

function bookModal(e) {
  // create the modal when the addBookBtn button is clicked
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

  // display the modal by appending it to the document body
  document.body.insertBefore(modal, document.body.childNodes[0]);

  modal.addEventListener("click", (e) => addBookToDom(e));

  // add book to the DOM/book list div
  function addBookToDom(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;

    if (e.target.classList.contains("submit-btn")) {
      function Book(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
      }
      // take the inputs and use them to create a new book (book obj)
      let book = new Book(
        `${title}`,
        `${author}`,
        `${Math.floor(Math.random() * 10000)}`
      );
      // then, push that book obj into an array
      booksArr.push(book);
      // loop through the array and display the new book to the dom
      let lastBook = booksArr[booksArr.length - 1];

      book = document.createElement("div");
      console.log(booksArr);
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
      removeModal();
    }
  }

  // listen for a click on the modal. if the close modal btn is clicked, remove the modal from the doc body
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-times")) {
      removeModal();
    }
  });

  // remove the modal
  function removeModal() {
    modal.parentNode.removeChild(modal);
  }
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash")) {
    let parent = e.target.parentNode.parentNode.parentNode;
    booksArr = booksArr.filter((book) => book.id !== parent.id);
    console.log(booksArr);
    bookList.removeChild(parent);
  }
});
