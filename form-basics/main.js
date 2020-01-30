let el = document.querySelector(".example-form");

el.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(e);
  console.log(e.target);
});
