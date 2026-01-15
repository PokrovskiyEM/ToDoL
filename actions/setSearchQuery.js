import state from '../state/state.js';
import { notify } from '../state/notify.js';

const setSearchQuery = (query) => {
  state.searchQuery = query.trim().toLowerCase();
  notify();
}

export default setSearchQuery;