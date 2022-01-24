import { RenderResult, render } from '@testing-library/react'
import Signup from './signup'
import React from 'react'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <Signup />
  )

  return {
    sut
  }
}

describe('Login component', () => {
  const testErrorWrapChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
    const errorWrap = sut.getByTestId(fieldName)
    expect(errorWrap.childElementCount).toBe(count)
  }
  const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement
    expect(button.disabled).toBe(isDisabled)
  }

  const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const inputStatus = sut.getByTestId(`${fieldName}-status`)
    expect(inputStatus.title).toBe(validationError || 'Tudo certo')
    expect(inputStatus.textContent).toBe(validationError ? '🔴' : '🟢')
  }

  test('should start with initial state', () => {
    const validationError = 'campo obrigatorio'
    const { sut } = makeSut()
    testErrorWrapChildCount(sut, 'error-wrap', 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})