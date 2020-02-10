/* globals todosApi */

function print (value) {
  console.log(value)
  return value
}

function q (selector) {
  return document.querySelector(selector)
}

function createTodosHTML (todos) {
  let todosStr = '<ul id="todos-list">'
  for (const todo of todos) {
    todosStr += createTodoHTML(todo)
  }
  todosStr += '</ul>'
  return todosStr

  // same as
  // return `<ul id="todos-list">${todos.map(todo => `<li>${todo.todo}</li>`).join('')}</ul>`
}

function createTodoHTML (todo) {
  return `<li id="todo-${todo.id}" data-todo-id="${todo.id}">${todo.todo} <button class="delete">Delete</button></li>`
}

function renderTodosList (todos) {
  const todosHTML = createTodosHTML(todos)
  const todosSection = document.querySelector('#todos')
  todosSection.innerHTML = todosHTML
}

function renderNewTodo (todo) {
  const todoHTML = createTodoHTML(todo)
  const todosList = document.querySelector('#todos-list')
  todosList.insertAdjacentHTML('beforeend', todoHTML)
}

todosApi.getAll().then(renderTodosList)

q('#new-todo-form').addEventListener('submit', event => {
  event.preventDefault()
  const todoTextField = q('#todo-text')
  const todoText = todoTextField.value
  todoTextField.value = ''
  todosApi.create(todoText).then(renderNewTodo)
})

q('#todos').addEventListener('click', event => {
  event.preventDefault()
  if (event.target.matches('.delete')) {
    const todoId = event.target.parentElement.dataset.todoId
    print('delete ' + todoId)
    todosApi.delete(todoId).then(() => {
      q(`#todo-${todoId}`).remove()
    })
  }
})
