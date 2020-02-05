/* globals fetch */

let githubData

const dataSection = document.querySelector('#github-data')

fetch('https://api.github.com/orgs/momentum-cohort-2020-01')
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    const newEl = document.createElement('h2')
    newEl.innerText = data.name
    dataSection.appendChild(newEl)
  })
