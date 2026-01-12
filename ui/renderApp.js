import state from "../state/state.js";

const renderApp = () => {
  const tasksList = document.querySelector('.todo__list')
  const tasksCount = document.querySelector('[data-js-tasks-count]')

  tasksList.innerHTML = '' // Очищаем DOM перед рендером
  tasksCount.textContent = state.todos.length // Устанавливаем счетчик по длине массива задач

  state.todos.forEach(todo => { // Создание и добавление элементов в список задач
    let toDoItem = document.createElement('li')
    toDoItem.className = 'todo__item'
    toDoItem.innerHTML =
    `<div class="todo__item-wrapper" data-js-task-id=${todo.id}>
      <input
        class="todo__item-checkbox"
        type="checkbox"
        data-js-task-checkbox
        ${todo.taskStatus === 'complete' ? 'checked' : ''}
      />
      <p class="todo__item-title">${todo.title}</p>
      ${todo.description !== null ? `<p class="todo__item-description">${todo.description}</p>` : ''} 
      <div class="todo__item-controls">
        <button class="todo__button button delete-button" data-js-delete-task-button>Del</button>
      </div>
    </div>`
    tasksList.appendChild(toDoItem)
  });
}

export default renderApp