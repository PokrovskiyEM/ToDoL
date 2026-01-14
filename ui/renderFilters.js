import state from "../state/state.js";

const renderFilters = () => {
  const filterButtons = document.querySelectorAll('[data-js-filter]');

  // Обновляем визуал для текущего фильтра
  filterButtons.forEach(button => {
    button.classList.remove('is-current');
    
    if (button.getAttribute('data-js-filter') === state.currentFilter) {
      button.classList.add('is-current');
    }
  });
};

export default renderFilters;