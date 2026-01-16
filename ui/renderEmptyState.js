import state from "../state/state.js";

const renderEmptyState = () => {
  const todo = document.querySelector('[data-js-todo]');
  const todoList = document.querySelector('[data-js-todo-list]');
  
  // Очищаем список задач
  todoList.innerHTML = '';
  
  // Если сообщение уже есть, не создаем новое
  const existingMessage = document.querySelector('[data-js-empty-message]');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Тексты отсутствия задач при разных фильтрах
  const messages = {
    all: 'Задач пока нет...',
    active: 'Активных задач пока нет...',
    complete: 'Завершенных задач пока нет...'
  };

  // Создаем сообщение о пустом списке
  const emptyMessage = document.createElement('div');
  emptyMessage.className = 'todo__empty-message';
  emptyMessage.dataset.jsEmptyMessage = '';
  emptyMessage.setAttribute('role', 'status');
  emptyMessage.setAttribute('aria-live', 'polite');
  const messageText = messages[state.currentFilter] || messages.all;
  
  const p = document.createElement('p');
  p.textContent = messageText;
  emptyMessage.appendChild(p);
  
  todo.appendChild(emptyMessage);
};

export default renderEmptyState;