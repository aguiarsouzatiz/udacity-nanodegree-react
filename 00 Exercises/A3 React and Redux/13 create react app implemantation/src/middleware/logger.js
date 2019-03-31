export default (store) => (next) => (action) => {
  console.group();
  console.log('Dispatched action:', action);
  const result = next(action);
  console.log('Current store state:', store.getState());
  console.groupEnd();

  return result;
};
