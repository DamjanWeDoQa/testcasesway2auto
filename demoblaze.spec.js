import shopping from 'cypress\fixtures\shoppinglist.json';

describe('User shopping on Demoblaze', () => {
    const username = generateRandomString();
    const password = generateRandomString();
    const creditCard = "4035 5010 0000 0008";
    before('clean cookies', () => {
        cy.clearCookie('tokenp_');
        cy.clearCookie('user');
    });

    beforeEach('go home', () => {
        cy.goToHome();
    });
    it('should create a new user after clicking on sign up', () => {
        cy.get("[data-target='#signInModal']").click({ waitForAnimations: true });
        cy.verifyModal('#signInModal', 'Sign up');
        cy.wait(300)
        cy.signUp(username, password);
        cy.alertTextIs('Sign up successful');
    });

    it('should login a existent user', () => {
        cy.get("[data-target='#logInModal']").click({ waitForAnimations: true });
        cy.verifyModal('#logInModal', 'Log in');
        cy.wait(300)
        cy.login(username, password);
        cy.get('#nameofuser').should('be.visible').and('contain', username)
    });   
})

function generateRandomString(){
    let text = "";
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < 10; i++){
        text += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return text;
}