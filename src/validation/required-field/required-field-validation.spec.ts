interface FieldValidation {
  field: string
  validate (value: string): Error
}

class RequiredFieldValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new RequiredFieldError()
  }
}

class RequiredFieldError extends Error {
  constructor () {
    super('campo obrigatorio')
    this.name = 'RequiredFieldError'
  }
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})