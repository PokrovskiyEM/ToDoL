import renderApp from "./ui/renderApp.js";
import addToDo from "./actions/addToDo.js";
import removeToDo from "./actions/removeToDo.js";
import switchToDoStatus from "./actions/switchToDoStatus.js";
import expandDescription from "./actions/expandDescription.js";
import setFilter from "./actions/setFilter.js";
import { subscribe } from "./state/notify.js"

subscribe(renderApp)
renderApp() // первый рендер

// Быстрое добавление задачи
const quickAddButton = document.querySelector('[data-js-quick-add-button]')
const quickAddInput = document.querySelector('[data-js-quick-add-input]')

quickAddButton.addEventListener('click', (event) => {
  event.preventDefault()

  addToDo(quickAddInput.value)
  quickAddInput.value = ''
})

// Изменение фильтра задач
const filterButtons = document.querySelectorAll('[data-js-filter]')

filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const selectedFilter = event.target.getAttribute('data-js-filter')
    setFilter(selectedFilter)

    // Лишнее, тоже самое в методе renderFilters() // Переключаем стили
    // filterButtons.forEach(filter => {
    //   filter.classList.remove('is-current')
    // })
    // event.target.classList.add('is-current')
  })
})

// Обработка нажатий по задачам
const todoList = document.querySelector('[data-js-todo-list]')

todoList.addEventListener('click', (event) => {
  const taskWrapper = event.target.closest('[data-js-task-id]');
  if (!taskWrapper) return

  const taskId = taskWrapper.getAttribute('data-js-task-id');

  // Удаление задачи
  if (event.target.hasAttribute('data-js-delete-task-button')) {
    removeToDo(taskId)
  }

  // Переключение чекбокса задачи
  if (event.target.hasAttribute('data-js-task-checkbox')) {
    switchToDoStatus(taskId)
  }

  // Раскрытие описания задачи
  if (event.target.hasAttribute('data-js-expand')) {
    expandDescription(taskId)
  }
})
