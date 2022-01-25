import { RenderResult } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  const errorWrap = sut.getByTestId(fieldName)
  expect(errorWrap.childElementCount).toBe(count)
}
export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const inputStatus = sut.getByTestId(`${fieldName}-status`)
  expect(inputStatus.title).toBe(validationError || 'Tudo certo')
  expect(inputStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}