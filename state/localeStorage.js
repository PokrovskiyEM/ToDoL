import state from "./state.js";

const STORAGE_KEY = 'todoApp'

// Сохраняю стейт в лс
export const saveState = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const loadState = () => {
  const savedState = localStorage.getItem(STORAGE_KEY)
  if (!savedState) return

  try {
    const parsedState = JSON.parse(savedState)
    state.todos = parsedState.todos || []
    state.currentFilter = parsedState.currentFilter || 'all'
  } catch (error) {
    console.error('Не удалось загрузить данные из хранилища', error)
  }
}