
Cypress.Commands.add('goToHome', () => {
    cy.intercept('GET', 'https://api.demoblaze.com/entries').as('entries');
    cy.visit('https://www.demoblaze.com')
    cy.wait("@entries")
})

Cypress.Commands.add('clickOnButton', (str) => {
    cy.get('button').contains(str).click();
})

Cypress.Commands.add('alertTextIs', (str) => {
    cy.on('window:alert', (msg) => {
        expect(msg).to.contains(str);
    })
});

Cypress.Commands.add('login', (username, password) => {
    cy.intercept('POST', '/login').as('loginUser');
    cy.get('#loginusername').should('be.visible').click().type(username, { delay: 30 }).and('have.value',username)
    cy.get('#loginpassword').should('be.visible').click().type(password, { delay: 30 }).and('have.value',password)
    cy.clickOnButton('Log in');
    cy.wait("@loginUser").then(() => {
        //Cypress.Cookies.preserveOnce('tokenp_', 'user')
        Cypress.Cookies.defaults({
            preserve: ['user', 'tokenp_'],
        })
    });
    
});

Cypress.Commands.add("loginByAPI", (username, password) => {
    return cy.request("POST", `${Cypress.env("apiUrl")}/login`, {
      username,
      password,
    });
});

Cypress.Commands.add('signUp', (username, password) => {
    cy.intercept('POST', '/signup').as('signUp');
    cy.get('#sign-username').should('be.visible').click().type(username, { delay: 30 }).and('have.value',username);
    cy.get('#sign-password').should('be.visible').click().type(password, { delay: 30 }).and('have.value',password);
    cy.clickOnButton('Sign up');
    cy.wait("@signUp");
});
