import state from "../state/state.js";
import { notify } from "../state/notify.js"

const addToDo = (taskTitle, taskDescription) => {
  if (!taskTitle) {
    alert('Нельзя ввести задачу без названия!') 
    return
  }
  
  const newToDoItem =
    {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title: taskTitle.trim(),
      description: taskDescription?.trim() || null,
      taskStatus: 'active',
    }
  state.todos.push(newToDoItem)

  notify()

  console.log(
    `Добавление элемента: 
    {
      id - ${newToDoItem.id}
      title - ${newToDoItem.title}
      description - ${newToDoItem.description !== null ? newToDoItem.description : 'Описание отсутствует'}
    }`
  )
}

export default addToDo