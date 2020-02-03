let formIsValid

document.addEventListener('submit', function (e) {
  e.preventDefault()
  validate()
})

function markValid (inputField) {
  inputField.classList.remove('input-invalid')
  inputField.classList.add('input-valid')
  clearErrorMsgs(inputField)
}

function markInvalid (inputField, errorMessages) {
  formIsValid = false
  inputField.classList.remove('input-valid')
  inputField.classList.add('input-invalid')

  clearErrorMsgs(inputField)

  for (const errorMessage of errorMessages) {
    const errorDiv = document.createElement('div')
    errorDiv.innerText = errorMessage
    errorDiv.classList.add('error-message')
    errorDiv.classList.add('text-danger')
    inputField.appendChild(errorDiv)
  }
}

function clearErrorMsgs (inputField) {
  const errorMessages = inputField.querySelectorAll('.error-message')

  for (const errorMessage of errorMessages) {
    errorMessage.remove()
  }
}

function validate () {
  formIsValid = true
  validateName()
  validateCar()
  validateStartDate()
  validateNumberOfDays()
  validateCardNumber()
  validateCVV()
  validateExpirationDate()
  if (formIsValid) {
    showPrice()
  } else {
    clearPrice()
  }
}

function validateName () {
  const input = document.querySelector('#name')
  const field = document.querySelector('#name-field')
  if (input.value === '') {
    markInvalid(field, ['Name is required.'])
  } else {
    markValid(field)
  }
}

function validateCar () {
  const field = document.querySelector('#car-field')
  const carYear = document.querySelector('#car-year')
  const carMake = document.querySelector('#car-make')
  const carModel = document.querySelector('#car-model')

  const errorMessages = []
  if (carYear.value === '') {
    errorMessages.push('Car year is required.')
  }
  if (carMake.value === '') {
    errorMessages.push('Car make is required.')
  }
  if (carModel.value === '') {
    errorMessages.push('Car model is required.')
  }

  if (errorMessages.length > 0) {
    markInvalid(field, errorMessages)
  } else {
    markValid(field)
  }
}

function validateStartDate () {
  const input = document.querySelector('#start-date')
  const field = document.querySelector('#start-date-field')
  if (input.value === '') {
    markInvalid(field, ['Date parking is required.'])
    return false
  } else {
    const startDate = moment(input.value)
    const now = moment()
    if (startDate.isBefore(now)) {
      markInvalid(field, ['Date parking must be in the future.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateNumberOfDays () {
  const input = document.querySelector('#days')
  const field = document.querySelector('#days-field')
  if (input.value === '') {
    markInvalid(field, ['Number of days is required.'])
    return false
  } else {
    const days = parseInt(input.value)
    if (isNaN(days)) {
      markInvalid(field, ['Number of days must be a number.'])
      return false
    } else if (days < 1 || days > 30) {
      markInvalid(field, ['Number of days must be between 1 and 30.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateCardNumber () {
  const input = document.querySelector('#credit-card')
  const field = document.querySelector('#credit-card-field')
  if (input.value === '') {
    markInvalid(field, ['Credit card is required.'])
    return false
  } else {
    if (!isValidCardNumber(input.value)) {
      markInvalid(field, ['Credit card format is not valid.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateCVV () {
  const input = document.querySelector('#cvv')
  const field = document.querySelector('#cvv-field')
  if (input.value === '') {
    markInvalid(field, ['CVV is required.'])
    return false
  } else {
    const cvv = input.value
    let invalid = false
    if (cvv.length !== 3) {
      invalid = true
    }
    for (let idx = 0; idx < 3; idx++) {
      if (isNaN(parseInt(cvv[idx]))) {
        invalid = true
      }
    }

    if (invalid) {
      markInvalid(field, ['CVV must be a three digit number.'])
      return false
    } else {
      markValid(field)
      return true
    }
  }
}

function validateExpirationDate () {
  const input = document.querySelector('#expiration')
  const field = document.querySelector('#expiration-field')
  if (input.value === '') {
    markInvalid(field, ['Expiration date is required.'])
    return false
  }

  let month, year
  const expiration = input.value
  const slashPos = expiration.indexOf('/')
  if (slashPos === -1) {
    markInvalid(field, ['Expiration date must be in the format MM/YY.'])
    return false
  }

  month = parseInt(expiration.slice(0, slashPos), 10)
  year = parseInt(expiration.slice(slashPos + 1), 10)

  if (isNaN(month) || isNaN(year)) {
    markInvalid(field, ['Expiration date must be in the format MM/YY.'])
    return false
  }

  if (month < 1 || month > 12 || year < 1 || year > 99) {
    markInvalid(field, ['Expiration date must be a valid month and year.'])
    return false
  }

  year += 2000
  const today = new Date()
  const todayMonth = today.getMonth() + 1
  const todayYear = today.getFullYear()

  if (year < todayYear || (year === todayYear && month < todayMonth)) {
    markInvalid(field, ['Expiration date must not be in the past.'])
    return false
  }

  markValid(field)
  return true
}

function isValidCardNumber (number) {
  const regex = new RegExp('^[0-9]{16}$')
  if (!regex.test(number)) {
    return false
  }

  return luhnCheck(number)
}

function luhnCheck (val) {
  let sum = 0
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1))
    if (i % 2 === 0) {
      intVal *= 2
      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }
    sum += intVal
  }
  return sum % 10 === 0
}

function calculatePrice (startDate, numberOfDays) {
  let days = []
  for (let i = 0; i < numberOfDays; i++) {
    console.log(days, i)
    days.push(i)
  }
  const year = startDate.getFullYear()
  const month = startDate.getMonth()
  const date = startDate.getDate()

  days = days.map(function (day) {
    return new Date(year, month, date + day)
  })

  const isWeekend = days.map(function (date) {
    return date.getDay() === 0 || date.getDay() === 6
  })

  const price = isWeekend.reduce(function (total, weekend) {
    if (weekend) {
      return total + 7
    } else {
      return total + 5
    }
  }, 0)

  return price
}

function clearPrice () {
  const priceEl = document.querySelector('#total')
  priceEl.innerText = ''
}

function showPrice () {
  const dateInput = document.querySelector('#start-date')
  const date = new Date(dateInput.value + 'T00:00Z')
  const daysInput = document.querySelector('#days')
  const days = parseInt(daysInput.value, 10)

  const price = calculatePrice(date, days)

  const priceEl = document.querySelector('#total')
  priceEl.innerText = `Your total cost is $${price}.`
}
