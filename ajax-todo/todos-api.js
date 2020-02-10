const todosApi = {
  apiUrl: 'http://localhost:3000/todos/',
  todos: [],

  makeRequest: function (url, method, data) {
    const options = { method: method }
    if (data) {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(data)
    }
    return fetch(url, options)
      .then(response => response.json())
  },

  getAll: function () {
    const setTodos = (todos) => {
      todosApi.todos = todos
      console.log('this', this)
      console.log('this.todos', this.todos)
      return todos
    }

    return this.makeRequest(this.apiUrl, 'GET')
      .then(setTodos)
  },

  create: function (todoText) {
    return this.makeRequest(
      this.apiUrl,
      'POST',
      { todo: todoText, done: false, created: moment().format() }
    )
  },

  update: function (todoId, todoText) {
    return this.makeRequest(
      `${this.apiUrl}/${todoId}/`,
      'PATCH',
      { todo: todoText }
    )
  },

  delete: function (todoId) {
    return this.makeRequest(`${this.apiUrl}/${todoId}/`, 'DELETE')
  }
}
