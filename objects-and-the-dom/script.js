// content for the main section

function createMenuListItem (menuItem) {
  const listItem = document.createElement('li')
  // create an image element
  const figure = document.createElement('figure')
  const img = document.createElement('img')
  img.src = menuItem.img
  img.alt = menuItem.description

  const caption = document.createElement('figcaption')
  caption.textContent = menuItem.title

  figure.appendChild(img)
  figure.appendChild(caption)
  listItem.appendChild(figure)

  return listItem
}

function showMenuItems () {
  const list = document.querySelector('#menu-items')

  for (const item of menuItems) {
    const listItem = createMenuListItem(item)
    list.appendChild(listItem)
  }
}

showMenuItems()
