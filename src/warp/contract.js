export function handle(state, action) {
  /* address of the caller is available in action.caller */
  if (action.input.function === "addUser") {
    const users = state.users;
    users[action.input.user.address] = action.input.user;
    state.users = users;
  }
  if (action.input.function === "updateUser") {
    const users = state.users;
    users[action.input.user.address] = action.input.user;
    state.users = users;
  }
  if (action.input.function === "deleteUser") {
    const users = state.users;
    delete users[action.input.user.address];
    state.users = users;
  }
  return { state };
}
