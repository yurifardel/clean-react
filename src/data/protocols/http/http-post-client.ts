import { HttpResponse } from '.'

export type HttpPostParams<Req> = {
  url: string
  body?: Req
}

export interface HttpPostClient<Req, Res> { // tipo do body e o tipo do retorno
  post(params: HttpPostParams<Req>): Promise<HttpResponse<Res>>
}