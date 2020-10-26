const { describe } = require("mocha");

describe("Cypress Test FINAL!", () => {

    it("Start test", () => {
        cy.visit('https://demo.applitools.com');

        cy.eyesOpen({
            appName: 'Cypress UFG',
            testName: 'Cypress Test'
        });

        cy.eyesCheckWindow({
            tag: "Login Window",
            target: "window",
            fully: true
        });

        cy.get('#log-in').click();

        cy.eyesCheckWindow({
            tag: "App Window",
            target: "window",
            fully: true
        });


        cy.eyesClose();
    });
});