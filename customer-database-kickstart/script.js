function capitalizeFirstLetter (string) {
  return string[0].toUpperCase() + string.slice(1)
}

const customerNames = customers.map(function (customer) {
  return capitalizeFirstLetter(customer.name.first) +
    ' ' +
    capitalizeFirstLetter(customer.name.last)
})

const customerListItems = customerNames.map(function (name) {
  const li = document.createElement('li')
  li.textContent = name
  return li
})

const ul = document.createElement('ul')
for (const li of customerListItems) {
  ul.appendChild(li)
}
document.querySelector('#customers').appendChild(ul)
