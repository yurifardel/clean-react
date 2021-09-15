/* eslint-disable @typescript-eslint/ban-types */
import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

export class HttpPostClientSpy<Tipo, Res> implements HttpPostClient<Tipo, Res> {
  url?: string
  body?: Tipo
  response: HttpResponse<Res> = {
    statusCode: HttpStatusCode.success
  }

  async post (params: HttpPostParams<Tipo>): Promise<HttpResponse<Res>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}