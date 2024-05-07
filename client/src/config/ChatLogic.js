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

//checking the logged user and msg receiver/sending a user is different during the chat
export const isSameSender = (
  messages,
  currentMessage,
  currentMsgIndex,
  loggedUserId
) => {
  return (
    currentMsgIndex < messages.length - 1 &&
    (messages[currentMsgIndex + 1].sender._id !== currentMessage.sender._id ||
      messages[currentMsgIndex + 1].sender._id === undefined) &&
    messages[currentMsgIndex].sender._id !== loggedUserId
  );
};

// Checking the last message of opposite chat partner to show the pro pic of opposite chat partner
export const isLastMessage = (messages, msgIndex, loggedUserId) => {
  return (
    msgIndex === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== loggedUserId &&
    messages[messages.length - 1].sender._id
  );
};

//opposite chat partner should be in left side and looged user chat is right side so based on that return margin value
export const isSameSenderMargin = (
  messages,
  currentMessage,
  currentMsgIndex,
  loggedUserId
) => {
  if (
    currentMsgIndex < messages.length - 1 &&
    messages[currentMsgIndex + 1].sender._id === currentMessage.sender._id &&
    messages[currentMsgIndex].sender._id !== loggedUserId
  )
    return 33;
  else if (
    (currentMsgIndex < messages.length - 1 &&
      messages[currentMsgIndex + 1].sender._id !== currentMessage.sender._id &&
      messages[currentMsgIndex].sender._id !== loggedUserId) ||
    (currentMsgIndex === messages.length - 1 &&
      messages[currentMsgIndex].sender._id !== loggedUserId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, currentMessage, currentMsgIndex) => {
  return (
    currentMsgIndex > 0 &&
    messages[currentMsgIndex - 1].sender._id === currentMessage.sender._id
  );
};
