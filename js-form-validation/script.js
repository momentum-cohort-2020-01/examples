document.addEventListener("submit", function(e) {
  e.preventDefault();
  validate();
});

function markValid(inputField) {
  inputField.classList.remove("input-invalid");
  inputField.classList.add("input-valid");
  clearErrorMsgs(inputField);
}

function markInvalid(inputField, errorMessages) {
  formIsValid = false;
  inputField.classList.remove("input-valid");
  inputField.classList.add("input-invalid");

  clearErrorMsgs(inputField);

  for (let errorMessage of errorMessages) {
    let errorDiv = document.createElement("div");
    errorDiv.innerText = errorMessage;
    errorDiv.classList.add("error-message");
    errorDiv.classList.add("text-danger");
    inputField.appendChild(errorDiv);
  }
}

function clearErrorMsgs(inputField) {
  let errorMessages = inputField.querySelectorAll(".error-message");

  for (let errorMessage of errorMessages) {
    errorMessage.remove();
  }
}

function validate() {
  formIsValid = true;
  validateName();
  validateCar();
  validateStartDate();
  validateNumberOfDays();
  validateCardNumber();
  validateCVV();
  validateExpirationDate();
  if (formIsValid) {
    showPrice();
  } else {
    clearPrice();
  }
}

function validateName() {
  let input = document.querySelector("#name");
  let field = document.querySelector("#name-field");
  if (input.value === "") {
    markInvalid(field, ["Name is required."]);
  } else {
    markValid(field);
  }
}

function validateCar() {
  let field = document.querySelector("#car-field");
  let carYear = document.querySelector("#car-year");
  let carMake = document.querySelector("#car-make");
  let carModel = document.querySelector("#car-model");

  let errorMessages = [];
  if (carYear.value === "") {
    errorMessages.push("Car year is required.");
  }
  if (carMake.value === "") {
    errorMessages.push("Car make is required.");
  }
  if (carModel.value === "") {
    errorMessages.push("Car model is required.");
  }

  if (errorMessages.length > 0) {
    markInvalid(field, errorMessages);
  } else {
    markValid(field);
  }
}

function validateStartDate() {
  let input = document.querySelector("#start-date");
  let field = document.querySelector("#start-date-field");
  if (input.value === "") {
    markInvalid(field, ["Date parking is required."]);
    return false;
  } else {
    let startDate = new Date(input.value + "T00:00");
    let now = new Date();
    if (startDate < now) {
      markInvalid(field, ["Date parking must be in the future."]);
      return false;
    } else {
      markValid(field);
      return true;
    }
  }
}

function validateNumberOfDays() {
  let input = document.querySelector("#days");
  let field = document.querySelector("#days-field");
  if (input.value === "") {
    markInvalid(field, ["Number of days is required."]);
    return false;
  } else {
    let days = parseInt(input.value, 10);
    if (isNaN(days)) {
      markInvalid(field, ["Number of days must be a number."]);
      return false;
    } else if (days < 1 || days > 30) {
      markInvalid(field, ["Number of days must be between 1 and 30."]);
      return false;
    } else {
      markValid(field);
      return true;
    }
  }
}

function validateCardNumber() {
  let input = document.querySelector("#credit-card");
  let field = document.querySelector("#credit-card-field");
  if (input.value === "") {
    markInvalid(field, ["Credit card is required."]);
    return false;
  } else {
    if (!isValidCardNumber(input.value)) {
      markInvalid(field, ["Credit card format is not valid."]);
      return false;
    } else {
      markValid(field);
      return true;
    }
  }
}

function validateCVV() {
  let input = document.querySelector("#cvv");
  let field = document.querySelector("#cvv-field");
  if (input.value === "") {
    markInvalid(field, ["CVV is required."]);
    return false;
  } else {
    let cvv = input.value;
    let invalid = false;
    if (cvv.length !== 3) {
      invalid = true;
    }
    for (let idx = 0; idx < 3; idx++) {
      if (isNaN(parseInt(cvv[idx]), 10)) {
        invalid = true;
      }
    }

    if (invalid) {
      markInvalid(field, ["CVV must be a three digit number."]);
      return false;
    } else {
      markValid(field);
      return true;
    }
  }
}

function validateExpirationDate() {
  let input = document.querySelector("#expiration");
  let field = document.querySelector("#expiration-field");
  if (input.value === "") {
    markInvalid(field, ["Expiration date is required."]);
    return false;
  }

  let month, year;
  let expiration = input.value;
  let slashPos = expiration.indexOf("/");
  if (slashPos === -1) {
    markInvalid(field, ["Expiration date must be in the format MM/YY."]);
    return false;
  }

  month = parseInt(expiration.slice(0, slashPos), 10);
  year = parseInt(expiration.slice(slashPos + 1), 10);

  if (isNaN(month) || isNaN(year)) {
    markInvalid(field, ["Expiration date must be in the format MM/YY."]);
    return false;
  }

  if (month < 1 || month > 12 || year < 1 || year > 99) {
    markInvalid(field, ["Expiration date must be a valid month and year."]);
    return false;
  }

  year += 2000;
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayYear = today.getFullYear();

  if (year < todayYear || (year === todayYear && month < todayMonth)) {
    markInvalid(field, ["Expiration date must not be in the past."]);
    return false;
  }

  markValid(field);
  return true;
}

function isValidCardNumber(number) {
  let regex = new RegExp("^[0-9]{16}$");
  if (!regex.test(number)) {
    return false;
  }

  return luhnCheck(number);
}

function luhnCheck(val) {
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return sum % 10 === 0;
}

function calculatePrice(startDate, numberOfDays) {
  let days = [];
  for (let i = 0; i < numberOfDays; i++) {
    console.log(days, i);
    days.push(i);
  }
  let year = startDate.getFullYear();
  let month = startDate.getMonth();
  let date = startDate.getDate();

  days = days.map(function(day) {
    return new Date(year, month, date + day);
  });

  let isWeekend = days.map(function(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  });

  let price = isWeekend.reduce(function(total, weekend) {
    if (weekend) {
      return total + 7;
    } else {
      return total + 5;
    }
  }, 0);

  return price;
}

function clearPrice() {
  let priceEl = document.querySelector("#total");
  priceEl.innerText = "";
}

function showPrice() {
  let dateInput = document.querySelector("#start-date");
  let date = new Date(dateInput.value + "T00:00Z");
  let daysInput = document.querySelector("#days");
  let days = parseInt(daysInput.value, 10);

  let price = calculatePrice(date, days);

  let priceEl = document.querySelector("#total");
  priceEl.innerText = `Your total cost is $${price}.`;
}
