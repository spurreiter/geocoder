/** @typedef {import('../adapter').Response} Response */
/** @typedef {import('../types').HttpError} HttpErrorType */
/**
 * @param {Response} response
 * @returns {HttpErrorType}
 */
export function HttpError(response: Response): HttpErrorType;
export type Response = import('../adapter').Response;
export type HttpErrorType = import('../types').HttpError;
