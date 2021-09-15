import { HttpResponse } from '.'

export type HttpPostParams<Tipo> = {
  url: string
  body?: Tipo
}

export interface HttpPostClient<Tipo, Res> { // tipo do body e o tipo do retorno
  post(params: HttpPostParams<Tipo>): Promise<HttpResponse<Res>>
}