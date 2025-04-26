/** @typedef {import('#adapter.js').Response} Response */
/** @typedef {import('#types.js').HttpError} HttpErrorType */
/**
 * @param {Response} response
 * @returns {HttpErrorType}
 */
export function HttpError(response: Response): HttpErrorType;
export type Response = import("#adapter.js").Response;
export type HttpErrorType = import("#types.js").HttpError;
