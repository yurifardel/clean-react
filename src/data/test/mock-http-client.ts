/* eslint-disable @typescript-eslint/ban-types */
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy<Req, Res> implements HttpPostClient<Req, Res> {
  url?: string
  body?: Req
  response: HttpResponse<Res> = {
    statusCode: HttpStatusCode.success
  }

  async post (params: HttpPostParams<Req>): Promise<HttpResponse<Res>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}