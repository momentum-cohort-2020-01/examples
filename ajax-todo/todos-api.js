const todosApi = {
  apiUrl: 'http://localhost:3000/todos/',

  makeRequest: function (url, method, data) {
    const options = { method: method }
    if (data) {
      options.headers = { 'Content-Type': 'application/json' }
      options.body = JSON.stringify(data)
    }
    return fetch(url, options).then(response => response.json())
  },

  getAll: function () {
    return this.makeRequest(this.apiUrl, 'GET')
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
