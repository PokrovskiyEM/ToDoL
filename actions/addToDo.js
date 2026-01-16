import state from "../state/state.js";
import { notify } from "../state/notify.js"

const addToDo = (taskTitle, taskDescription) => {
  const trimmedTitle = taskTitle?.trim()
  if (!trimmedTitle || trimmedTitle.length === 0) {
    alert('Нельзя ввести задачу без названия!') 
    return
  }
  
  const newToDoItem =
    {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title: trimmedTitle,
      description: taskDescription?.trim() || null,
      taskStatus: 'active',
    }
  state.todos.push(newToDoItem)

  notify()
  
  // Объявляем добавление задачи для скринридеров
  const statusEl = document.getElementById('aria-live-status');
  if (statusEl) {
    const message = `Задача "${newToDoItem.title}" добавлена`;
    statusEl.textContent = message;
    setTimeout(() => {
      statusEl.textContent = '';
    }, 2000);
  }
}

export default addToDo