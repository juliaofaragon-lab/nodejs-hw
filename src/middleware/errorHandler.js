import createHttpError from 'http-errors';

const { HttpError } = createHttpError;

export const errorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: err.message,
  });
};
