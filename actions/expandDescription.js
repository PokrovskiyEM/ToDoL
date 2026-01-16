import state from "../state/state.js";
import { notify } from "../state/notify.js"

const expandDescription = (taskId) => {
  let hasChanged = false
  const newToDos = state.todos.map((todo) => {
    if (todo.id === taskId) {
      hasChanged = true
      return {...todo, isExpanded: !todo.isExpanded}
    }
    return todo
  })
  
  if (hasChanged) {
    state.todos = newToDos
    notify()
    
    // Обновляем aria-атрибуты кнопки раскрытия после рендера
    // Это произойдет автоматически при следующем рендере через notify()
  }
}

export default expandDescription