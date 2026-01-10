import state from "../state/state.js";

const renderApp = () => {
  const tasksList = document.querySelector('.todo__list')
  const tasksCount = document.querySelector('.todo__total-tasks > span')

  tasksList.innerHTML = '' // Очищаем DOM перед рендером
  tasksCount.textContent = state.todos.length // Устанавливаем счетчик по длине массива задач

  state.todos.forEach(todo => { // Создание и добавление элементов в список задач
    let toDoItem = document.createElement('li')
    toDoItem.className = 'todo__item'
    toDoItem.innerHTML =
      // `<p class="todo__item-title">${todo.title}</p>
      // ${todo?.description ? `<p class="todo__item-description">${todo.description}</p>` : ''}` // Если у объекта todo есть поле description - то добавляем его // Старая версия

      `<p class="todo__item-title">${todo.title}</p>
            ${todo.description !== null ? `<p class="todo__item-description">${todo.description}</p>` : ''}` // Если у объекта todo поле description не null - то добавляем его

    tasksList.appendChild(toDoItem)
  });
}

export default renderApp