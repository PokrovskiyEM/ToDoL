import state from "../state/state.js";
import { notify } from "../state/notify.js"

const switchToDoStatus = (taskId) => {
  let hasChanged = false
  const newToDos = state.todos.map((todo) => {
    if (todo.id === +taskId) {
      hasChanged = true
      return {...todo, taskStatus: todo.taskStatus === 'active' ? 'complete' : 'active'}
    }
    return todo
  })
  
  if (hasChanged) {
    state.todos = newToDos
    notify()
  } else alert('Элемент не изменен!')
}
export default switchToDoStatus