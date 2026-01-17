// Функция для экранирования HTML (защита от XSS)
const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

const renderToDos = (todosToRender, lastAddedTodoId) => {
  const todoList = document.querySelector('[data-js-todo-list]')
  const emptyMessage = document.querySelector('[data-js-empty-message]')

  // Удаляем сообщение о пустом списке, если оно есть
  if (emptyMessage) {
    emptyMessage.remove();
  }

  // Очищаем список задач перед рендером
  todoList.innerHTML = ''

  // Рендерим каждую задачу
  todosToRender.forEach(todo => {
    const toDoItem = document.createElement('li');
    toDoItem.className = 'todo__item';
    toDoItem.innerHTML = createTodoHTML(todo);

    // Анимация добавления задачи
    if (todo.id === lastAddedTodoId) {
      toDoItem.classList.add('adding');
      
      toDoItem.addEventListener(
        'animationend', 
        () => toDoItem.classList.remove('adding'),
        { once: true }
      );
    }

    todoList.appendChild(toDoItem);
  });
  
  // Обновляем aria-label списка с количеством задач
  const count = todosToRender.length;
  todoList.setAttribute('aria-label', `Список задач. Найдено задач: ${count}`);
}

const createTodoHTML = (todo) => {
  const isExpandedClass = todo.isExpanded ? "is-expanded" : "";
  const isCompleteClass = todo.taskStatus === 'complete' ? "complete-line" : "";
  const isChecked = todo.taskStatus === 'complete' ? 'checked' : '';
  const isHidden = todo.isExpanded ? "" : "hidden";
  const taskId = todo.id;
  const checkboxId = `checkbox-${taskId}`;
  const titleId = `title-${taskId}`;
  const descriptionId = `description-${taskId}`;
  const expandButtonId = `expand-${taskId}`;
  const escapedTitle = escapeHTML(todo.title);
  const escapedDescription = todo.description ? escapeHTML(todo.description) : '';
  
  if (todo.description) {
    return `
      <div class="todo__item-wrapper ${isExpandedClass}" data-js-task-id="${taskId}" role="group" aria-label="Задача: ${escapedTitle}">
        <input 
          class="todo__item-checkbox" 
          type="checkbox" 
          id="${checkboxId}"
          data-js-task-checkbox 
          ${isChecked} 
          aria-labelledby="${titleId}"
          aria-describedby="${todo.description ? descriptionId : ''}"
          aria-label="Отметить задачу как ${todo.taskStatus === 'active' ? 'выполненную' : 'невыполненную'}"
        />
        <p class="todo__item-title" data-js-task-title id="${titleId}">
          <span class="${isCompleteClass}">${escapedTitle}</span>
          <button 
            class="cursor-pointer" 
            type="button" 
            id="${expandButtonId}"
            data-js-expand
            aria-label="${todo.isExpanded ? 'Скрыть описание' : 'Показать описание'}"
            aria-expanded="${todo.isExpanded}"
            aria-controls="${descriptionId}"
          >. . .</button>
        </p>
        <p 
          class="todo__item-description ${isHidden}" 
          data-js-task-description 
          id="${descriptionId}"
          role="region"
          aria-labelledby="${titleId}"
        >
          ${escapedDescription}
        </p>
        <div class="todo__item-controls">
          <button 
            class="todo__button button delete-button" 
            data-js-delete-task-button 
            aria-label="Удалить задачу: ${escapedTitle}"
          >Del</button>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="todo__item-wrapper" data-js-task-id="${taskId}" role="group" aria-label="Задача: ${escapedTitle}">
      <input 
        class="todo__item-checkbox" 
        type="checkbox" 
        id="${checkboxId}"
        data-js-task-checkbox 
        ${isChecked} 
        aria-labelledby="${titleId}"
        aria-label="Отметить задачу как ${todo.taskStatus === 'active' ? 'выполненную' : 'невыполненную'}"
      />
      <p class="todo__item-title ${isCompleteClass}" data-js-task-title id="${titleId}">${escapedTitle}</p>
      <div class="todo__item-controls">
        <button 
          class="todo__button button delete-button" 
          data-js-delete-task-button 
          aria-label="Удалить задачу: ${escapedTitle}"
        >Del</button>
      </div>
    </div>
  `;
};

export default renderToDos