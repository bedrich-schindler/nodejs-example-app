import { OK } from 'http-status-codes';

export const indexAction = async (req, res) => {
  res.status(OK).send({
    message: 'NodeJS example server index endpoint.',
  });
};
