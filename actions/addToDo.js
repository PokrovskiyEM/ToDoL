import state from "../state/state.js";
import { notify } from "../state/notify.js"

const addToDo = (taskTitle, taskDescription) => {
  const newToDoItem =
  {
    id: state.todos.length,
    title: taskTitle,
    description: taskDescription || null,
    taskStatus: 'active',
  }
  state.todos.push(newToDoItem)

  notify()

  console.log(
    `Добавление элемента: {
            id - ${newToDoItem.id}
            title - ${newToDoItem.title}
            description - ${newToDoItem.description !== null ? newToDoItem.description : 'Описание отсутствует'}
        }`
  )
}

export default addToDo