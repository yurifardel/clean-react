import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('login', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('login')
  })

  it('should load with correct inital state', () => {
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email')
      .should('have.attr', 'title', 'campo obrigatorio')
      .should('have.attr', 'readOnly')
    cy.getByTestId('email-label').should('have.attr', 'title', 'campo obrigatorio')

    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password')
      .should('have.attr', 'title', 'campo obrigatorio')
      .should('have.attr', 'readOnly')
    cy.getByTestId('password-label').should('have.attr', 'title', 'campo obrigatorio')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('email').should('have.attr', 'title', 'campo invalido')
    cy.getByTestId('email-label').should('have.attr', 'title', 'campo invalido')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'invalid')
    cy.getByTestId('password').should('have.attr', 'title', 'campo invalido')
    cy.getByTestId('password-label').should('have.attr', 'title', 'campo invalido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('email').should('not.have.attr', 'title')
    cy.getByTestId('email-label').should('not.have.attr', 'title')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-wrap').should('have.attr', 'data-status', 'valid')
    cy.getByTestId('password').should('not.have.attr', 'title')
    cy.getByTestId('password-label').should('not.have.attr', 'title')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present invalid-credentials-error on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais invalidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpected-error on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present unexpected-error if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    })
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('should present multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should present multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.datatype.uuid()
      }
    }).as('request')
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})