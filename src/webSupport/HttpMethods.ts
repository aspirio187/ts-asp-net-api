/**
 * Represents the structure of an HTTP response.
 * @property statusCode - The HTTP status code of the response.
 * @property data - The payload of the response, can be any type.
 */
export type HttpResult<T> = {
  statusCode: number;
  data: T | null | undefined;
};

/**
 * Returns a 200 OK HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function ok<T>(data: T | null | undefined = undefined): HttpResult<T> {
  return {
    statusCode: 200,
    data,
  };
}

/**
 * Returns a 201 Created HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function noContent<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 201,
    data,
  };
}

/**
 * Returns a 400 Bad Request HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function badRequest<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 400,
    data,
  };
}

/**
 * Returns a 401 Unauthorized HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function unauthorized<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 401,
    data,
  };
}

/**
 * Returns a 403 Forbidden HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function forbidden<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 403,
    data,
  };
}

/**
 * Returns a 404 Not Found HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function notFound<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 404,
    data,
  };
}

/**
 * Returns a 409 Conflict HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function conflict<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 409,
    data,
  };
}

/**
 * Returns a 500 Internal Server Error HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function internalServerError<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 500,
    data,
  };
}

/**
 * Returns a 501 Not Implemented HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function notImplemented<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 501,
    data,
  };
}

/**
 * Returns a 502 Bad Gateway HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function badGateway<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 502,
    data,
  };
}

/**
 * Returns a 503 Service Unavailable HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function serviceUnavailable<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 503,
    data,
  };
}

/**
 * Returns a 504 Gateway Timeout HTTP response.
 * @param data - The data to be returned in the response body.
 */
export function gatewayTimeout<T>(
  data: T | null | undefined = undefined
): HttpResult<T> {
  return {
    statusCode: 504,
    data,
  };
}
