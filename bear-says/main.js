// Select the dom element we want to use in our event handler
// what happens if you change the order of these two lines?
let bear = document.querySelector(".bear");
console.log("Here's a bear element: ", bear);

// here is an anonymous function stored in a variable
// anonymous just means that it does not have a name
// we can call it using the variable name though:
// This is called a function expression.
let showHearts = function(event) {
  console.log(event);
  let msgDiv = document.querySelector(".message");
  if (msgDiv.innerText === "") {
    msgDiv.innerText = "❤️❤️❤️";
    console.log("HEARTS!");
  } else {
    msgDiv.innerText = "";
  }
};

// Here is the event listener.
// Try giving it either one of the functions defined here.
bear.addEventListener("click", bearSays);

// Here is a named function (it has a name after the function keyword and before the parens)
// Unlike variables, we can call functions before they are declared,
// so the event listener on a previous line above can call this function.
// This is because of something called hoisting.
function bearSays() {
  const bearMessages = [
    "Hello there friend",
    "I love you",
    "Do you have any honey?",
    "Have you seen my hat?"
  ];
  let msg = bearMessages[Math.floor(Math.random() * bearMessages.length)];
  document.querySelector(".message").innerText = msg;
}
