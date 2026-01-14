import state from "../state/state.js";
import { notify } from "../state/notify.js"

const setFilter = (selectedFilter) => {  
  const validFilters = ['all', 'active', 'complete']
  if (!validFilters.includes(selectedFilter)) {
    alert('Ошибка при выборе фильтра!')
    return
  }

  state.currentFilter = selectedFilter
  notify()
}

export default setFilter