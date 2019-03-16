import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from 'http-status-codes';

export const handleInternalErrorResponse = (res, e) => res.status(INTERNAL_SERVER_ERROR).send(e);
export const handleValidatorErrorResponse = (res, e) => res.status(BAD_REQUEST).send(e);
export const handleErrorResponse = (res, e) => {
  if (e.name === 'ValidationError') {
    return handleValidatorErrorResponse(res, e);
  }

  return handleInternalErrorResponse(res, e);
};

export const handleItemNotFoundResponse = res => res.status(NOT_FOUND).send({
  message: 'Item has not been found.',
});
