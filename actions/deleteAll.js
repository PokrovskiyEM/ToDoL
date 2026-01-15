import state from "../state/state.js";
import { notify } from "../state/notify.js"
import { getFilteredTodos } from "../ui/renderApp.js"

const deleteAll = () => {
  const filtered = getFilteredTodos()
  if (filtered.length === 0) return
  
  state.todos = state.todos.filter(todo => !filtered.includes(todo))
  notify()
}

export default deleteAll