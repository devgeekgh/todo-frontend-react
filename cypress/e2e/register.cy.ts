describe('empty spec', () => {
  it('should be visit', () => {
    cy.visit('http://localhost:3000/register')
    // cy.mount()
    cy.get('input[name=email]').type('admin@gmail.io')
    cy.get('input[name=password]').type('123456789')
    cy.get('input[name=confirm_password]').type('123456789')
    cy.contains('button', 'Register').click()
  })
  it('should be validated', () => {
    cy.visit('http://localhost:3000/register')
    // cy.mount()
    cy.get('input[name=email]').type('admin')
    cy.contains('Invalid email')
  })
})
