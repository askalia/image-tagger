// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('ImageTagger test:tags', () => {
    before(() => {
      cy.visit(Cypress.env('app_url'))
    });

    beforeEach(() => {
      
    })

    it('should load tags+image from JSON file', function () {
        cy.get('[data-cy=load-json-file]')
        .attachFile([Cypress.env('json_data_file')])
        .then(() => cy.fixture(Cypress.env('json_data_file')))
        .then((jsonFileData) => {
            cy.get('[data-cy=image-preview]').should('be.visible')
            cy.get('[data-cy=image-preview]').should('have.attr', 'src', jsonFileData.imageUrl);
            cy.get('.App').find('.card').should('have.length', jsonFileData.tags.length);
            cy.get('[data-cy=no-image-found]').should('not.exist')  ;             
        })
       
        
    });
  
    
  
    // more examples
    //
    // https://github.com/cypress-io/cypress-example-todomvc
    // https://github.com/cypress-io/cypress-example-kitchensink
    // https://on.cypress.io/writing-your-first-test
  })
  