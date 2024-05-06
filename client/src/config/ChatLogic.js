export const getSender = (loggedUser, users) => {
  return loggedUser
    ? users[0]._id === loggedUser._id
      ? users[1].name
      : users[0].name
    : "";
};
export const getSenderDetails = (loggedUser, users) => {
  return loggedUser
    ? users[0]._id === loggedUser._id
      ? users[1]
      : users[0]
    : "";
};
