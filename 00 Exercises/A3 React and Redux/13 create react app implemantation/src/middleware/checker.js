export default (store) => (next) => (action) => {
  if (
    action.type === 'ADD_TODO'
    && action.todo.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nop. It's not a good idea");
  }

  if (
    action.type === 'ADD_GOAL'
    && action.goal.name.toLowerCase().includes('bitcoin')
  ) {
    return alert("Nop. It's not a good idea");
  }

  return next(action);
};
