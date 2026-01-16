import state from "../state/state.js";
import { notify } from "../state/notify.js"
import { getFilteredTodos } from "../ui/renderApp.js"

const deleteAll = () => {
  const filtered = getFilteredTodos()
  if (filtered.length === 0) return
  
  const count = filtered.length;
  state.todos = state.todos.filter(todo => !filtered.includes(todo))
  notify()
  
  // Объявляем удаление задач для скринридеров
  const statusEl = document.getElementById('aria-live-status');
  if (statusEl) {
    const message = `Удалено задач: ${count}`;
    statusEl.textContent = message;
    setTimeout(() => {
      statusEl.textContent = '';
    }, 2000);
  }
}

export default deleteAll