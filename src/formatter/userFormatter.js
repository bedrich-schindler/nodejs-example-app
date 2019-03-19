import { ROLE_ADMIN } from '../model/userModel';

export const userInFormatter = (user, responseBody, userRole) => {
  const userCopy = user;

  userCopy.email = responseBody.email;
  userCopy.firstName = responseBody.firstName;
  userCopy.lastName = responseBody.lastName;

  if (responseBody.password) {
    userCopy.password = responseBody.password;
  }

  if (userRole === ROLE_ADMIN) {
    userCopy.role = responseBody.role;
  }

  return userCopy;
};

export const userJwtTokenOutFormatter = user => ({
  id: user.id,
});

export const userDetailOutFormatter = user => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  role: user.role,
});

export const userListOutFormatter = users => users.map(userDetailOutFormatter);
