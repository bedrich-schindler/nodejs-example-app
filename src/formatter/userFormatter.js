export const userInFormatter = (user, responseBody) => {
  const userCopy = user;

  userCopy.email = responseBody.email;
  userCopy.firstName = responseBody.firstName;
  userCopy.lastName = responseBody.lastName;

  if (responseBody.password) {
    userCopy.password = responseBody.password;
  }

  return userCopy;
};

export const userDetailOutFormatter = user => ({
  _id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
});

export const userListOutFormatter = users => users.map(userDetailOutFormatter);
