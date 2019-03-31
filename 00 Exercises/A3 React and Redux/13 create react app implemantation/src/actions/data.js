import API from 'goals-todos-api';

export const RECEIVE_DATA = 'RECEIVE_DATA';

export function receiveDataAction(todos, goals) {
  return {
    type: RECEIVE_DATA,
    todos,
    goals
  };
}

export function fetchInitialDataAsync() {
  return function (dispatch) {
    return Promise.all([
      API.fetchTodos(),
      API.fetchGoals()
    ]).then(([todos, goals]) => {
      dispatch(receiveDataAction(todos, goals));
    });
  };
}
