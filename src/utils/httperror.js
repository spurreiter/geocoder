export function HttpError (response) {
  const status = response.status || 500
  const err = new Error(status)
  err.status = status
  err.response = response
  err.name = 'HttpError'
  return err
};
