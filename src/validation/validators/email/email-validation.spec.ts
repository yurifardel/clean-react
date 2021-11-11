import { EmailValidation } from './email-validation'
import { InvalidFieldError } from '@/validation/erros/index'
import faker from 'faker'

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column())

describe('EmailValidation', () => {
  test('should return error if email is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})