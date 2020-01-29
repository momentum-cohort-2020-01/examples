// this javascript is going to run immediately on the page
let el = document.querySelector(".kitten-header");

newEl = document.createElement("h1");

textEl = document.createTextNode("This is Otis");

newEl.appendChild(textEl);

el.appendChild(newEl);
