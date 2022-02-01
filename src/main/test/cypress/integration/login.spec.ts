describe('login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('shuld load with correct inital state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'campo obrigatorio')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'campo obrigatorio')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})