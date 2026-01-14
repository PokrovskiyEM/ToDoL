const state = {
  todos: [
    {
      id: 0,
      title: 'Задача номер один',
      description: 'Описание задачи номер один',
      taskStatus: 'active',
      isExpanded: false,
    },
    {
      id: 1,
      title: 'Задача номер два',
      description: 'Описание задачи номер два',
      taskStatus: 'active',
      isExpanded: false,
    },
  ],
  currentFilter: 'all',
}

export default state