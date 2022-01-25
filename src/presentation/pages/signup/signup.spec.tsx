import React from 'react'
import { RenderResult, render, cleanup, fireEvent } from '@testing-library/react'
import { Helper, ValidationStub } from '@/presentation/test'
import Signup from './signup'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Signup
      validation={validationStub}
    />
  )

  return {
    sut
  }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.internet.email()): void => {
  const emailInput = sut.getByTestId(fieldName)
  fireEvent.input(emailInput, { target: { value } })
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'campo obrigatorio')
    Helper.testStatusForField(sut, 'password', 'campo obrigatorio')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'campo obrigatorio')
  })

  test('should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })

    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})