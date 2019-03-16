import { NOT_FOUND } from 'http-status-codes';

export const notFoundAction = async (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Path does not match any action.',
  });
};
