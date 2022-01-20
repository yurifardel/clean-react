// erro generico

export class EmailInUseError extends Error {
  constructor () {
    super('Esse email ja existe')
    this.name = 'EmailInUseError'
  }
}