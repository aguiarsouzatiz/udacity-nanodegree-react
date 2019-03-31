import API from 'goals-todos-api';

export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';

export function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}
export function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id
  };
}

export function actionToRemoveGoalAsync(item) {
  return function (dispatch) {
    dispatch(removeGoalAction(item.id));
    return API.deleteGoal(item.id)
      .catch(() => {
        dispatch(addGoalAction(item));
        alert("Sorry, we couldn't delete it. Try again");
      });
  };
}

export function actionToAddGoalAsync(name, success, fail) {
  return function (dispatch) {
    return API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal));
        success();
      }).catch(() => {
        fail();
        alert("Sorry, we couldn't save it. Try again");
      });
  };
}
