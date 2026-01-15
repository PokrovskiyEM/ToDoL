import renderApp from "./ui/renderApp.js";
import setSearchQuery from "./actions/setSearchQuery.js";
import addToDo from "./actions/addToDo.js";
import removeToDo from "./actions/removeToDo.js";
import switchToDoStatus from "./actions/switchToDoStatus.js";
import expandDescription from "./actions/expandDescription.js";
import setFilter from "./actions/setFilter.js";
import deleteAll from "./actions/deleteAll.js";
import { subscribe } from "./state/notify.js"
import { loadState } from "./state/localeStorage.js"

subscribe(renderApp)
loadState() // Смотрим хранилище
renderApp() // первый рендер

// Поиск задач
const searchInput = document.querySelector('[data-js-search-input]');

searchInput.addEventListener('input', (event) => {
  setSearchQuery(event.target.value);
});

searchInput.addEventListener('change', (event) => {
  setSearchQuery(event.target.value);
});

// Ручное добавление задачи
const manualInputElement = document.querySelector('[data-js-manual-add-title-input]')
const manualDescriptionElement = document.querySelector('[data-js-manual-add-description-input]')
const manualAddButton = document.querySelector('[data-js-quick-manual-button]')

manualAddButton.addEventListener('click', () => {
  addToDo(manualInputElement.value, manualDescriptionElement.value)
  manualInputElement.value = ''
  manualDescriptionElement.value = ''
})


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

    // const searchInput = document.querySelector('[data-js-search-input]');
    // if (searchInput) searchInput.value = '';

    // setSearchQuery('');
  
    setFilter(selectedFilter)
  })
})

// Удалить все
const deleteAllButton = document.querySelector('[data-js-delete-all-button]')
deleteAllButton.addEventListener('click', (event) => {
  deleteAll()
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
