import state from "../state/state.js";
import renderTodos from "./renderTodos.js";
import renderCounters from "./renderCounters.js";
import renderEmptyState from "./renderEmptyState.js";
import renderFilters from "./renderFilters.js";

const renderApp = () => {
  console.log('Render app triggered');
  
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
};

// Вспомогательная функция для получения отфильтрованных задач
const getFilteredTodos = () => {
  switch(state.currentFilter) {
    case 'active':
      return state.todos.filter(todo => todo.taskStatus === 'active');
    case 'complete':
      return state.todos.filter(todo => todo.taskStatus === 'complete');
    case 'all':
    default:
      return state.todos;
  }
};

export default renderApp;