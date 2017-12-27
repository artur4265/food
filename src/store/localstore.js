
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem('vue-js-todo-P7oZi9sL') || '[]')
    return todos
  },
  save: function (todos) {
    localStorage.setItem('vue-js-todo-P7oZi9sL', JSON.stringify(todos))
  }
}

export { todoStorage }
