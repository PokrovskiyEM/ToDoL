import renderApp from "./ui/renderApp.js";
import addToDo from "./actions/addToDo.js";
import removeToDo from "./actions/removeToDo.js";
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

// Удаление задачи
const tasksList = document.querySelector('.todo__list')

tasksList.addEventListener('click', (event) => {
  if (event.target.hasAttribute('data-js-delete-task-button')) {
    const taskId = event.target.closest('.todo__item-wrapper').getAttribute('data-js-task-id')
    removeToDo(taskId)
  }
})