import DOM from '../../src/constants/dom';

//const SERVER_URL='http://192.168.0.103:8800/';//iis
const SERVER_URL='http://127.0.0.1:5173/';//dev
// const SERVER_URL='http://127.0.0.1:4173/';//preview


describe('test todo page', () => {

    const clickOnCreateTaskButton=()=> cy.get(`#${DOM.Button.CREATE_TASK}`,{timeout:300}).should('exist').click();

    const createTaskFromPopup=(todoTaskText)=>{
        //создает один новый таск
        const popupTask=cy.get('[data-testId="task-popup"]');

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
    }

    const getColumnChildren=()=>{
        return cy.get('[data-testId="tasksColumn"]').should('exist').children()
    }

    const checkNumberOfTasksInColumnMatch=(numberOfTasks)=>{
        //проверка на соответствие количества тасков в колонке
        getColumnChildren().should('have.length', numberOfTasks+1);
    }

    beforeEach(() => {
        cy.visit(SERVER_URL);
        //cy.url().should('include', SERVER_URL);
        cy.url().should('eq', SERVER_URL);
        cy.intercept('src/**/*.js').as('js-file-request');
        //cy.intercept('src/**/popup/*.*').as('popupDelivered');
        //cy.intercept('/**/*.js').as('getTaskPopup');
    });

    it.only('user create 2 tasks & delete one', () => {
        //тест из урока 22.04.2023
        const taskss=['Задача 1','Задача 2'];
        taskss.forEach((myText,index)=>{
            if (index===0) cy.wait(100);
            clickOnCreateTaskButton();
            cy.get(`#${DOM.Popup.CONTAINER}`).should('not.have.class','hidden'); 
            createTaskFromPopup(myText);
        });

        //проверка на соответствие колчиества тасков после их сохдания
        checkNumberOfTasksInColumnMatch(taskss.length);
        
        //нажимаем по кнопке Delete если она существует
        getColumnChildren().first().find('[data-btn="btnDelete"]').should('exist').click();

        //нажимаем по кнопке Confirm для подтверждения удаления (текст кнопки меняется на Delete)
        cy.get('[data-testId="task-popup"]')
        .find('[data-id="btnConfirm"]')
        .should('exist')
        .should('contain.text','Delete')
        .click();

        //проверка на соответствие колчиества тасков после удаления последнего
        taskss.pop()
        checkNumberOfTasksInColumnMatch(taskss.length);

        //проверяем, что все остальные остались на месте
        taskss.forEach((text)=>{
            getColumnChildren().should('contain.text', text);
        })
    });

    it('user open main page', () => {
        //my super great test      
        cy.visit(SERVER_URL);
        cy.wait(100);
        cy.url().should('include', SERVER_URL);    
        cy.get(`#${DOM.Button.CREATE_TASK}`,{timeout:300}).should('exist').click();
        cy.get(`#${DOM.Popup.CONTAINER}`).should('not.have.class','hidden');
    });

    it('vladimir shit off his pants', () => {
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