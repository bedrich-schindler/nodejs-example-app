export const credentialsInFormatter = (credentials, responseBody) => {
  const credentialCopy = credentials;

  credentialCopy.email = responseBody.email;
  credentialCopy.password = responseBody.password;

  return credentialCopy;
};

export const credentialsOutFormatter = credentials => ({
  token: credentials.token,
});
