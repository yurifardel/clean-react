export enum HttpStatusCode {
  success = 200,
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500

}

export type HttpResponse<Req> = {
  statusCode: HttpStatusCode
  body?: Req
}