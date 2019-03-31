import API from 'goals-todos-api';

export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

export function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id
  };
}

export function actionToRemoveTodoAsync(item) {
  return function (dispatch) {
    dispatch(removeTodoAction(item.id));
    return API.deleteTodo(item.id)
      .catch(() => {
        dispatch(addTodoAction(item));
        alert("Sorry, we couldn't delete it. Try again");
      });
  };
}

export function actionToAddTodoAsync(name, success, fail) {
  return function (dispatch) {
    return API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodoAction(todo));
        success();
      }).catch(() => {
        fail();
        alert("Sorry, we couldn't save it. Try again");
      });
  };
}

export function actionToToggleTodoAsync(id) {
  return function (dispatch) {
    dispatch(toggleTodoAction(id));

    return API.saveTodoToggle(id)
      .catch(() => {
        dispatch(toggleTodoAction(id));
        alert("Sorry, we couldn't toggle todo it. Try again");
      });
  };
}
