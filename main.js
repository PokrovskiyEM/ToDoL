import renderApp from "./ui/renderApp.js";
import addToDo from "./actions/addToDo.js";
import removeToDo from "./actions/removeToDo.js";
import switchToDoStatus from "./actions/switchToDoStatus.js";
import expandDescription from "./actions/expandDescription.js";
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

const tasksList = document.querySelector('.todo__list')

tasksList.addEventListener('click', (event) => {
  // Удаление задачи
  if (event.target.hasAttribute('data-js-delete-task-button')) {
    const taskId = event.target.closest('.todo__item-wrapper').getAttribute('data-js-task-id')
    removeToDo(taskId)
  }

  // Переключение чекбокса задачи
  if (event.target.hasAttribute('data-js-task-checkbox')) {
    const taskId = event.target.closest('.todo__item-wrapper').getAttribute('data-js-task-id')
    switchToDoStatus(taskId)
  }

  // Раскрытие описания задачи
  if (event.target.hasAttribute('data-js-expand')) {
    const taskId = event.target.closest('.todo__item-wrapper').getAttribute('data-js-task-id')
    expandDescription(taskId)
  }
})
