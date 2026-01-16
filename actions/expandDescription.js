import state from "../state/state.js";
import { notify } from "../state/notify.js"

const expandDescription = (taskId) => {
  let hasChanged = false
  const newToDos = state.todos.map((todo) => {
    if (todo.id === taskId) {
      hasChanged = true
      return {...todo, isExpanded: todo.isExpanded !== true ? true : false}
    }
    return todo
  })
  
  if (hasChanged) {
    state.todos = newToDos
    notify()
  } else alert('Элемент не раскрылся!')
}

export default expandDescription