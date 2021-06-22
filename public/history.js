import { createBrowserHistory, createMemoryHistory } from 'history';
const selectedHistory = typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory
export default selectedHistory();