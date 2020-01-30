// Complete the callback function in the javascript event handler below
// We want the page to show an error message when the button is clicked
// It should be something like red text telling the user that they need to register first

// Don't worry about checking any conditions to show the error.
// Just for practice, we'll assume that the user is not registered

let el = document.querySelector("form");

el.addEventListener("submit", function(e) {
  e.preventDefault(); // This prevents the form from actually submitting (normally we wouldn't do this)

  let emailInput = document.querySelector("#email-input");
  let emailAddress = emailInput.value;
  let parentDiv = emailInput.parentNode;

  if (emailAddress !== "") {
    parentDiv.classList.remove("input-invalid");
    parentDiv.classList.add("input-valid");
  } else {
    parentDiv.classList.remove("input-valid");
    parentDiv.classList.add("input-invalid");
  }
});
