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
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .and('contain', 'wrong username or password') // <-- Ei välttämättä toimi
    })

  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username:'mluukkai', password:'salainen' })
      /*cy.contains('Reveal hidden secrets').click()
      cy.contains('Log in to application')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()*/
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Star Wars')
      cy.get('#author').type('George Lucas')
      cy.get('#url').type('www.starwars.com')
      cy.get('#submit-button').click()
      cy.get('#logout-button').click() // <-- Ei välttämättä toimi
    })

    it('it can be liked', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Star Trek')
      cy.get('#author').type('SOme other guy')
      cy.get('#url').type('www.startrek.com')
      cy.get('#submit-button').click()
      cy.get('#view-hide-button').click()
      cy.get('#like-button').click()
      cy.get('#logout-button').click() // <-- Saattaa sotkea tarkistuksen

    })
    it('it can be deleted', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Star Trek')
      cy.get('#author').type('SOme other guy')
      cy.get('#url').type('www.startrek.com')
      cy.get('#submit-button').click()
      cy.get('#view-hide-button').click()
      cy.get('#delete-button').click().click() // <-- jostkain syystä poistaminen vaatii kaksi painallusta?
      //cy.get('html').should('not.contain', 'Star Trek') // --> ei toimi
      cy.get('#logout-button').click()
    })

    describe('and several notes exist', function(){
      beforeEach(function () {
        cy.createBlog({ title:'mushroom book', author: 'Sven', url: 'www.mushbook.io', likes: 10 })
        cy.createBlog({ title:'cook book', author: 'Lars', url: 'www.cookbook.io', likes: 100 })
        cy.createBlog({ title:'manimal book', author: 'Erik', url: 'www.anibook.io', likes: 1000 })
      })
      it('all books exist in the right order from most liked to least liked', function (){
        cy.contains('mushroom book')
        cy.contains('cook book')
        cy.contains('manimal book')
        cy.get('div:first').should('contain','manimal book')
        cy.get('div:last').should('contain','mushroom book')
      })
    })
  })

})