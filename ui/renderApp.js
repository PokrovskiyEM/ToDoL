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
    `<div class="todo__item-wrapper ${todo.isExpanded === false ? "" : "is-expanded"}" data-js-task-id=${todo.id}>
      <input
        class="todo__item-checkbox"
        type="checkbox"
        data-js-task-checkbox
        ${todo.taskStatus === 'complete' ? 'checked' : ''}
      />
      ${todo.description !== null ? `<p class="todo__item-title ${todo.taskStatus === 'complete' ? 'complete-line' : ''}" data-js-task-title>${todo.title} <span class="cursor-pointer" data-js-expand>. . .</span></p>
      <p class="todo__item-description" data-js-task-description ${todo.isExpanded === false ? "hidden" : ""}>${todo.description}</p>` : `<p class="todo__item-title" data-js-task-title>${todo.title}</p>`} 
      <div class="todo__item-controls">
        <button class="todo__button button delete-button" data-js-delete-task-button>Del</button>
      </div>
    </div>`
    tasksList.appendChild(toDoItem)
  });
}

export default renderApp