const renderToDos = (todosToRender) => {
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
    todoList.appendChild(toDoItem);
  });
}

const createTodoHTML = (todo) => {
  const isExpandedClass = todo.isExpanded ? "is-expanded" : "";
  const isCompleteClass = todo.taskStatus === 'complete' ? "complete-line" : "";
  const isChecked = todo.taskStatus === 'complete' ? 'checked' : '';
  const isHidden = todo.isExpanded ? "" : "hidden";
  
  if (todo.description) {
    return `
      <div class="todo__item-wrapper ${isExpandedClass}" data-js-task-id="${todo.id}">
        <input class="todo__item-checkbox" type="checkbox" data-js-task-checkbox ${isChecked} title="Переключить задачу"/>
        <p class="todo__item-title" data-js-task-title>
          <span class="${isCompleteClass}">${todo.title}</span>
          <button class="cursor-pointer" type="button" data-js-expand>. . .</button>
        </p>
        <p class="todo__item-description" data-js-task-description ${isHidden}>
          ${todo.description}
        </p>
        <div class="todo__item-controls">
          <button class="todo__button button delete-button" data-js-delete-task-button title="Удалить задачу">Del</button>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="todo__item-wrapper" data-js-task-id="${todo.id}">
      <input class="todo__item-checkbox" type="checkbox" data-js-task-checkbox ${isChecked} title="Переключить задачу"/>
      <p class="todo__item-title ${isCompleteClass}" data-js-task-title>${todo.title}</p>
      <div class="todo__item-controls">
        <button class="todo__button button delete-button" data-js-delete-task-button title="Удалить задачу">Del</button>
      </div>
    </div>
  `;
};

export default renderToDos