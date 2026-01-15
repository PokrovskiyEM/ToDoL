import { getFilteredTodos } from '../ui/renderApp.js';

const renderDatalist = () => {
  const datalist = document.querySelector('[data-js-datalist-options]');
  if (!datalist) return;

  // Очищаем список подсказок
  datalist.innerHTML = '';

  // Берём текущие задачи с учётом фильтров и поиска
  const todos = getFilteredTodos();

  // Добавляем новые
  todos.forEach(todo => {
    const option = document.createElement('option');
    option.value = todo.title;
    datalist.appendChild(option);
  });
}

export default renderDatalist;