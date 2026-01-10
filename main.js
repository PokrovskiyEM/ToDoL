import renderApp from "./ui/renderApp.js";
import addToDo from "./actions/addToDo.js";
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