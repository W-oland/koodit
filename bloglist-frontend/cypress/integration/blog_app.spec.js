describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('Reveal hidden secrets').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
    cy.contains('cancel')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.contains('Log in to application')
      cy.contains('Reveal hidden secrets').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function () {
      //cy.get('#logout-button').click()
      cy.contains('Reveal hidden secrets').click()
      cy.contains('Log in to application')
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('Reveal hidden secrets').click()
      cy.contains('Log in to application')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      

    })

    it('A blog can be created', function() {

    })
  })

})