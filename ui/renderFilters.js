import state from "../state/state.js";

const renderFilters = () => {
  const filterButtons = document.querySelectorAll('[data-js-filter]');

  // Обновляем визуал для текущего фильтра
  filterButtons.forEach(button => {
    const filterValue = button.getAttribute('data-js-filter');
    const isCurrent = filterValue === state.currentFilter;
    
    button.classList.toggle('is-current', isCurrent);
    button.setAttribute('aria-pressed', isCurrent.toString());
    
    // Обновляем aria-label с актуальным количеством
    const countElement = button.querySelector('[data-js-tasks-count], [data-js-active-tasks-count], [data-js-complete-tasks-count]');
    const count = countElement ? countElement.textContent : '0';
    
    const labels = {
      all: `Показать все задачи, всего: ${count}`,
      active: `Показать активные задачи, всего: ${count}`,
      complete: `Показать завершенные задачи, всего: ${count}`
    };
    
    button.setAttribute('aria-label', labels[filterValue] || labels.all);
  });
};

export default renderFilters;