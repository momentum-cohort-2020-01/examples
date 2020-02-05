/* globals fetch */

let githubData

const dataSection = document.querySelector('#github-data')

fetch('https://api.github.com/orgs/momentum-cohort-2020-01')
  // fetch will return a JS promise as a response
  // to access the data returned when the promise resolves, we use the .then method
  // to transform the data to json, we have to call the .json method
  // arrow function syntax will automatically return the value instead of having to use the return keyword
  .then(response => response.json())
  // we chain another .then because this one above here returns a promise
  // we do this so we can access the data from the response
  .then(function(data) {
    githubData = data
    renderH2()
    // This next line may seem a little weird. I want the url to get the repos for this org
    // So I'm using data from this JSON response in order to construct another fetch request
    // Here I am only returning the url I need for that request
    return data.repos_url
  })
  // The argument to the next .then method is the repos_url
  // I immediately use that to make the next fetch request
  // I can return the value of calling the fetch method (remember, arrow syntax has an implicit return)
  .then(url => fetch(url))
  // because that return value is a promise, I can chain another .then on top of that
  // now I'm doing the same thing as above, making sure I have json to work with
  .then(response => response.json())
  // then chaining another .then to get the json data so I can use it.
  .then(function(data) {
    // helpful to give yourself a console.log to confirm you have what you need here
    console.log(data)
    // now that I have the data to use for values, I can construct my DOM elements
    // I could do this in a separate function, but I'll just show you how to do it here.
    const repoList = document.createElement('ul')
    dataSection.appendChild(repoList)
    // These classes are coming from Tachyons CSS
    repoList.classList.add(
      'list',
      'pl0',
      'ml0',
      'center',
      'mw6',
      'ba',
      'b--light-silver',
      'br3'
    )
    // Loop over the list of repos in that json data
    for (const repo of data) {
      // and for each one, create a new li element
      const listItem = document.createElement('li')
      listItem.innerText = repo.name
      listItem.classList.add('ph3', 'pv2', 'bb', 'b--light-silver')
      repoList.appendChild(listItem)
    }
  })

// this is a named function that creates and inserts an h2 element
// I didn't have to put it in a function, but it can clean up the code above
function renderH2() {
  const h2El = document.createElement('h2')
  h2El.innerText = githubData.name
  dataSection.appendChild(h2El)
}
