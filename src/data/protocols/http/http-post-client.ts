/* eslint-disable @typescript-eslint/ban-types */
export type HttpPostParams = {
  url: string
  body?: {}
}

export interface HttpPostClient {
  post(params: HttpPostParams): Promise<void>
}