import state from "../state/state.js";
import renderTodos from "./renderTodos.js";
import renderCounters from "./renderCounters.js";
import renderEmptyState from "./renderEmptyState.js";
import renderFilters from "./renderFilters.js";
import renderDatalist from "./renderDatalist.js";

const renderApp = () => {
  // console.log('Render app triggered');
  
  // Рендерим счетчики
  renderCounters();
  
  // Обновляем визуал фильтров по выбранному
  renderFilters();
  
  // 3. Проверяем пустое состояние и рендерим список задач
  const todo = document.querySelector('[data-js-todo]');
  const deleteAllButton = todo.querySelector('[data-js-delete-all-button]');
  const filteredTodos = getFilteredTodos();
  
  if (filteredTodos.length === 0) {
    renderEmptyState();
    deleteAllButton.classList.remove('is-visible');
  } else {
    deleteAllButton.classList.add('is-visible');
    renderTodos(filteredTodos);
  }

  // Рендерим подсказки
  renderDatalist();
};

// Вспомогательная функция для получения отфильтрованных задач
export const getFilteredTodos = () => {
  let todos = [...state.todos]

  switch(state.currentFilter) {
    case 'active':
      todos = todos.filter(todo => todo.taskStatus === 'active');
      break;
    case 'complete':
      todos = todos.filter(todo => todo.taskStatus === 'complete');
      break;
    case 'all':
    default:
      break;
  }

  // Поиск по searchQuery
  if (state.searchQuery) {
    todos = todos.filter(todo =>
      todo.title.toLowerCase().includes(state.searchQuery)
    );
  }

  return todos;
};

export default renderApp;