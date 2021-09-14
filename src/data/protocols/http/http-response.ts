export enum HttpStatusCode {
  unathorized = 401,
  noContent = 204
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any
}