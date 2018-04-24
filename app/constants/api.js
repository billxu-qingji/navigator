const API = '/api';

const USER = {
  LOGIN: API + '/login',
  LOGIN_OUT: '/api/logout',
}
const HOME = {
  ADD_MY_SITES: API + '/user/site',
  GET_SITES: API + '/sites',
  GET_ATTEND_RECORD: '/api/hackday/checktime',
  GET_CONFLUENCE_TOP: '/api/confluence/topContent',
  GET_TODO_LIST: '/api/jira/todoList',
  DELE_MY_SITE: '/api/site/delete',
  GET_SEARCH_SITE: '/api/search/site',
}
export { USER, HOME }