import renderApp from "./ui/renderApp.js";
import setSearchQuery from "./actions/setSearchQuery.js";
import addToDo from "./actions/addToDo.js";
import removeToDo from "./actions/removeToDo.js";
import switchToDoStatus from "./actions/switchToDoStatus.js";
import expandDescription from "./actions/expandDescription.js";
import setFilter from "./actions/setFilter.js";
import deleteAll from "./actions/deleteAll.js";
import { subscribe } from "./state/notify.js"
import { loadState } from "./state/localStorage.js"
import state from "./state/state.js";

subscribe(renderApp)
loadState() // Смотрим хранилище
renderApp() // первый рендер

// Поиск задач
const searchInput = document.querySelector('[data-js-search-input]');

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    setSearchQuery(event.target.value);
  });

  searchInput.addEventListener('change', (event) => {
    setSearchQuery(event.target.value);
  });
}

// Ручное добавление задачи
const manualInputElement = document.querySelector('[data-js-manual-add-title-input]')
const manualDescriptionElement = document.querySelector('[data-js-manual-add-description-input]')
const manualAddButton = document.querySelector('[data-js-quick-manual-button]')
const addManualButton = document.querySelector('[data-js-add-manual-button]')
const addTaskPopover = document.querySelector('[data-js-task-popover]')

// Обновление aria-expanded при открытии/закрытии popover
if (addTaskPopover) {
  addTaskPopover.addEventListener('toggle', (event) => {
    if (addManualButton) {
      addManualButton.setAttribute('aria-expanded', event.target.matches(':popover-open') 
        ? 'true' 
        : 'false');
    }
  });
}

if (manualAddButton) {
  manualAddButton.addEventListener('click', () => {
    addToDo(manualInputElement.value, manualDescriptionElement.value)
    manualInputElement.value = ''
    manualDescriptionElement.value = ''
    // Закрываем popover после добавления
    if (addTaskPopover && addTaskPopover.matches(':popover-open')) {
      addTaskPopover.hidePopover();
    }
  });
  
  // Поддержка Enter для добавления задачи
  [manualInputElement, manualDescriptionElement].forEach(input => {
    if (input) {
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          manualAddButton.click();
        }
      });
    }
  });
}

// Быстрое добавление задачи
const quickAddButton = document.querySelector('[data-js-quick-add-button]')
const quickAddInput = document.querySelector('[data-js-quick-add-input]')

if (quickAddButton && quickAddInput) {
  quickAddButton.addEventListener('click', (event) => {
    event.preventDefault()

    addToDo(quickAddInput.value)
    quickAddInput.value = ''
    quickAddInput.focus(); // Возвращаем фокус в поле ввода
  });
  
  // Поддержка Enter в форме быстрого добавления
  quickAddInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      quickAddButton.click();
    }
  });
}

const isAddingTask = document.querySelector('.adding')
if (isAddingTask) isAddingTask.classList.remove('adding')

// Изменение фильтра задач
const filterButtons = document.querySelectorAll('[data-js-filter]')

filterButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const selectedFilter = button.getAttribute('data-js-filter')
    // Проверяем, что клик был именно по кнопке, а не по дочернему элементу
    if (!selectedFilter) {
      const parentButton = event.target.closest('[data-js-filter]');
      if (parentButton) {
        setFilter(parentButton.getAttribute('data-js-filter'));
      }
      return;
    }
  
    setFilter(selectedFilter);
    announceToScreenReader(`Фильтр изменен: ${selectedFilter === 'all' ? 'Все задачи' : selectedFilter === 'active' ? 'Активные задачи' : 'Завершенные задачи'}`);
  });
  
  // Поддержка клавиатуры для фильтров
  button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      button.click();
    }
  });
})

// Удалить все
const deleteAllButton = document.querySelector('[data-js-delete-all-button]')
if (deleteAllButton) {
  deleteAllButton.addEventListener('click', (event) => {    
    deleteAll()
  });
  
  // Поддержка клавиатуры
  deleteAllButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      deleteAll();
    }
  });
}

// Обработка нажатий по задачам
const todoList = document.querySelector('[data-js-todo-list]')

if (todoList) {
  todoList.addEventListener('click', (event) => {
    const taskWrapper = event.target.closest('[data-js-task-id]');
    if (!taskWrapper) return

    const taskId = taskWrapper.getAttribute('data-js-task-id');

    // Удаление задачи
    if (event.target.hasAttribute('data-js-delete-task-button')) {
      const todoItem = taskWrapper.closest('.todo__item');
      todoItem.classList.add('removing');

      setTimeout(() => {
        removeToDo(taskId)
        announceToScreenReader(`Задача удалена`);
      }, 300);
      
      return;
    }

    // Переключение чекбокса задачи
    if (event.target.hasAttribute('data-js-task-checkbox')) {
      switchToDoStatus(taskId)
      const todo = state.todos.find(t => t.id === taskId);
      if (todo) {
        const status = todo.taskStatus === 'complete' ? 'выполнена' : 'активна';
        announceToScreenReader(`Задача отмечена как ${status}`);
      }
      return;
    }

    // Раскрытие описания задачи
    if (event.target.hasAttribute('data-js-expand')) {
      expandDescription(taskId)
      const todo = state.todos.find(t => t.id === taskId);
      if (todo) {
        const action = todo.isExpanded ? 'Описание показано' : 'Описание скрыто';
        announceToScreenReader(action);
      }
      return;
    }
  });
  
  // Поддержка клавиатурной навигации
  todoList.addEventListener('keydown', (event) => {
    const taskWrapper = event.target.closest('[data-js-task-id]');
    if (!taskWrapper) return;

    const taskId = taskWrapper.getAttribute('data-js-task-id');
    const deleteButton = taskWrapper.querySelector('[data-js-delete-task-button]');
    const expandButton = taskWrapper.querySelector('[data-js-expand]');
    const checkbox = taskWrapper.querySelector('[data-js-task-checkbox]');

    // Escape для закрытия расширенного описания
    if (event.key === 'Escape' && expandButton && expandButton.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      expandDescription(taskId);
      expandButton.focus();
    }

    // Enter/Space на чекбоксе
    if ((event.key === 'Enter' || event.key === ' ') && event.target === checkbox) {
      event.preventDefault();
      switchToDoStatus(taskId);
    }

    // Enter/Space на кнопке раскрытия
    if ((event.key === 'Enter' || event.key === ' ') && event.target === expandButton) {
      event.preventDefault();
      expandDescription(taskId);
    }

    // Delete/Backspace для удаления задачи (когда фокус на элементе задачи)
    if ((event.key === 'Delete' || event.key === 'Backspace') && deleteButton) {
      if (event.target === taskWrapper || event.target === deleteButton || event.target === checkbox || event.target === expandButton) {
        event.preventDefault();
        removeToDo(taskId);
        announceToScreenReader(`Задача удалена`);
      }
    }
  });
}

// Функция для объявления изменений скринридерам
const announceToScreenReader = (message) => {
  const statusEl = document.getElementById('aria-live-status');
  if (statusEl) {
    statusEl.textContent = message;
    // Очищаем через некоторое время, чтобы сообщение можно было прочитать снова при повторении
    setTimeout(() => {
      statusEl.textContent = '';
    }, 1000);
  }
};
