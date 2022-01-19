import { HttpPostClient, HttpResponse, HttpStatusCode } from '@/data/protocols/http'
import { HttpPostParams } from '../protocols/http'

import faker from 'faker'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

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