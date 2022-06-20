function reducer(state, action) {
  const newState = { ...state };
  if (action.type === "LOGIN") {
    newState.nickname = action.nickname;
    console.log(newState.nickname);
  }
  if (action.type === "LOGOUT") {
    newState.nickname = undefined;
  }
  return newState;
}

export default reducer;
