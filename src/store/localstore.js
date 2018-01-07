
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem('vue-js-todo-P7oZi9sL') || '[]')
    return todos
  },
  save: function (todos) {
    localStorage.setItem('vue-js-todo-P7oZi9sL', JSON.stringify(todos))
  }
}

var recipeStorage = {
  fetch: function () {
    var recipe = JSON.parse(localStorage.getItem('vue-js-recipe-P7oZi9sL') || '[]')
    return recipe
  },
  save: function (recipe) {
    localStorage.setItem('vue-js-recipe-P7oZi9sL', JSON.stringify(recipe))
  }
}

export { todoStorage, recipeStorage }
