import state from "../state/state.js";
import { notify } from "../state/notify.js"

const expandDescription = (taskId) => {
  let hasChanged = false
  const newToDos = state.todos.map((todo) => {
    if (todo.id === taskId) {
      hasChanged = true
      return {...todo, isExpanded: !todo.isExpanded}
    }

    // Оставляем открытым только одно описание
    if (todo.isExpanded) {
      hasChanged = true;
      return { ...todo, isExpanded: false };
    }

    return todo
  })
  
  if (hasChanged) {
    state.todos = newToDos
    notify()
  }
}

export default expandDescription