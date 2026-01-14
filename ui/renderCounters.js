import state from "../state/state.js";

const renderCounters = () => {
  // Находим счетчики фильтров
  const tasksCountAll = document.querySelector('[data-js-tasks-count]')
  const tasksCountActive = document.querySelector('[data-js-active-tasks-count]')
  const tasksCountComplete = document.querySelector('[data-js-complete-tasks-count]')

  // Обновляем все счетчики задач
  const allTasksCount = state.todos.length
  const activeTasksCount = state.todos.filter(todo => todo.taskStatus === 'active').length
  const completeTasksCount = state.todos.filter(todo => todo.taskStatus === 'complete').length

  // Обновляем подсчет задач по фильтрам
  if (tasksCountAll) tasksCountAll.textContent = allTasksCount;
  if (tasksCountActive) tasksCountActive.textContent = activeTasksCount;
  if (tasksCountComplete) tasksCountComplete.textContent = completeTasksCount;
}

export default renderCounters