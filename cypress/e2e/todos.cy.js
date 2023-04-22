import DOM from '../../src/constants/dom';

//const SERVER_URL='http://192.168.0.103:8800/';
const SERVER_URL='http://127.0.0.1:5173/';

describe('test todo page', () => {
    beforeEach(() => {
        //cy.intercept('/**/*.js').as('getTaskPopup');
        cy.intercept('src/**/*.js').as('js-file-request');
        //cy.intercept('src/**/popup/*.*').as('popupDelivered');
    });

    it('user open main page', () => {
        //my super great test      
        cy.visit(SERVER_URL);
        cy.wait(100);
        cy.url().should('include', SERVER_URL);    
        cy.get(`#${DOM.Button.CREATE_TASK}`,{timeout:300}).should('exist').click();
        cy.get(`#${DOM.Popup.CONTAINER}`).should('not.have.class','hidden');
    });

    it.only('vladimir shit off his pants', () => {
        cy.visit(SERVER_URL);
        cy.url().should('include', SERVER_URL);

        cy.get(`#${DOM.Popup.CONTAINER}`).should('exist').should('have.class','hidden').find('.spinner').should('exist');
        cy.get(`#${DOM.Button.CREATE_TASK}`,{timeout:300}).should('exist').click().click();
        cy.get(`#${DOM.Popup.CONTAINER}`).should('exist').should('not.have.class','hidden');
        
        const popupTask=cy.get('[data-testId="task-popup"]');
        const todoTaskText='Welcome task 2';

        popupTask
            .should('exist')
            .should('be.visible');

        popupTask
            .find('[data-id="inpTitle"]')
            .should('exist')
            // .its('value').should('be.empty')
            .should('have.value','')
            .type(todoTaskText);

        cy.get('[data-testId="task-popup"]')
            .find('[data-id="btnConfirm"]')
            .should('exist')
            .should('contain.text','Create')
            .click();

        cy.get('[data-testId="tasksColumn"]')
            .should('exist')
            .children()
            .should('have.length', 2)
            .first()
            .find('[data-id="templateTaskTitle"]')
            .should('contain.text',todoTaskText);

    });
});