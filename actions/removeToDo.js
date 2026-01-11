import state from "../state/state.js";
import { notify } from "../state/notify.js"

const removeToDo = (taskId) => {
  const newToDos = state.todos.filter((todo) => todo.id !== +taskId)

  if (newToDos.length !== state.todos.length) {
    state.todos = newToDos
    notify()
  } else alert('Элемент не удален!')

}

export default removeToDo