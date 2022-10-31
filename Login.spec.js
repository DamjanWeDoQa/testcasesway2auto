
describe('Login Suite', () => {

    beforeEach(() => {
   
    })
    
    it.only('Login api', () => {
        cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))
        cy.visit("/greet")
        cy.get("h2.title").should("have.text", "Welcome To QA BOX LET'S TEST")
    });
});