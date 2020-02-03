let books = [
  { title: "Middlemarch", author: "George Eliot", read: false },
  { title: "Song of Solomon", author: "Toni Morrison", read: true },
  { title: "Tropic of Cancer", author: "Henry Miller", read: false },
  {
    title: "Oranges Are Not the Only Fruit",
    author: "Jeanette Winterson",
    read: true
  }
];

// there is a bug in this code.
function createReadingList(bookList) {
  let booksToRead = [];
  for (let book of bookList) {
    if (book.read !== true) {
      booksToRead.push(book.title);
    }
    return booksToRead;
  }
}
