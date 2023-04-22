import DOM from '../../src/constants/dom';

//const SERVER_URL='http://192.168.0.103:8800/';
const SERVER_URL='http://127.0.0.1:5173/';

describe('test todo page', () => {
    beforeEach(() => {
        //cy.intercept('/**/*.js').as('getTaskPopup');
        //cy.intercept('src/**/*.js').as('jsDelivered');
        cy.intercept('src/**/popup/*.*').as('popup');
    });

    it.only('user open main page', () => {        
        cy.visit(SERVER_URL);
        cy.wait(200);
        cy.url().should('include', SERVER_URL);    
        cy.get(`#${DOM.Button.CREATE_TASK}`,{timeout:300}).should('exist');
        // cy.wait(100);      
        cy.get(`#${DOM.Button.CREATE_TASK}`).click();
        cy.get(`#${DOM.Popup.CONTAINER}`).should('not.have.class','hidden');
    });


    it('user open main page', () => {
        //этот заебись проходит
        cy.visit(SERVER_URL);
        cy.url().should('include', SERVER_URL)
        
        cy.get(`#${DOM.Button.CREATE_TASK}`).click();
        cy.wait('@getTaskPopup');       
        // cy.wait(300);

        cy.get(`#${DOM.Button.CREATE_TASK}`).should('exist').should('contain.text','+ Create Task').should('have.length.gt',0);

        cy.get(`#${DOM.Popup.CONTAINER}`).should('exist').should('not.have.class','hidden');



         
    });

    it('user open main page', () => {
        beforeEach(() => {
            cy.intercept('/src/view/**',)
        });

        cy.visit('http://127.0.0.1:5173/');
        cy.get(`#${DOM.Button.CREATE_TASK}`)
        .should('exist')
        .should('contain.text','+ Create Task')
        .should('have.length.gt',0)
        .click();

        
        cy.visit('http://127.0.0.1:5173/');
        cy.get(`#${DOM.Button.CREATE_TASK}`).wait().then(()=>{
            cy.get(`#${DOM.Popup.CreateTask.TITLE}`).should('contain.text','')
        });
    });
});