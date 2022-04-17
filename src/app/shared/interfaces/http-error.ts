export enum HttpError {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  NotAllowed = 405,
  TimeOut = 408,
  Conflict = 409,
  InternalServerError = 500,
  GatewayTimeout = 504,
  ErrorUnknown = 0
}
