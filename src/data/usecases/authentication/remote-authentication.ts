import { HttpPostClient } from 'data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClint: HttpPostClient
  ) {}

  async auth (): Promise<void> {
    await this.httpPostClint.post(this.url)
  }
}