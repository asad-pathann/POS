export const authHandler = (err, req, res, next) => {
  res.json({
    message: err.message,
  });
};
