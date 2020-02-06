/* globals fetch */
const profileDiv = document.querySelector('#profile')

fetch('https://swapi.co/api/people/14/')
  .then(res => res.json())
  .then(data => {
    console.log('The data we get back from the first fetch:', data)
    const h2 = document.createElement('h2')
    h2.innerText = data.name
    profileDiv.appendChild(h2)
    return data.films
  })
  .then(filmURLs => {
    // console.log(filmURLs)
    const fetches = filmURLs.map(url => fetch(url))
    console.log(
      'Here are the return values from the fetches we created by mapping over the film urls:',
      fetches
    )
    return Promise.all(fetches)
  })
  .then(responses => {
    console.log('Promise.all returns these responses:', responses)
    return Promise.all(responses.map(res => res.json()))
  })
  .then(dataArray => {
    console.log(
      'Once we call .json() on the above, we get back this array of json objects',
      dataArray
    )
    const ul = document.createElement('ul')
    for (const film of dataArray) {
      const li = document.createElement('li')
      li.innerText = film.title
      ul.appendChild(li)
    }
    profileDiv.appendChild(ul)
  })
