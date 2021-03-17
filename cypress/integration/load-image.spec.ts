// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

describe('ImageTagger test:images', () => {
    before(() => {
      cy.visit(Cypress.env('app_url'))
    });

    beforeEach(() => {
      cy.get('[data-cy=reset-image-action]').as('changeImageButton')                  
    })

    it('should load a image from local disk drive', function () {
      cy.get('[data-cy=load-image-from-local-file]')      
      .attachFile('spiderman3.jpg')      
      
      cy.get('[data-cy=image-preview]').should('be.visible')
      cy.get('[data-cy=image-not-found]').should('not.exist')            
      cy.get('@changeImageButton').click()  
    });
  
    it('should load a image from URL', function () {
      //cy.get('[data-cy=reset-image-action]').click()  
      cy.get('[data-cy=image-url-box]').should('have.focus')
      //cy.get('@changeImageButton').should('be.disabled');
      
      cy.get('[data-cy=image-url-box]')      
        .type(Cypress.env('image_from_url'))
        .focus()
        .blur({ force: true});              
      cy.get('[data-cy=image-preview]').should('be.visible')  
      cy.get('@changeImageButton').click()  
    });

    

    it("should not load a non-reachable image URL", () => {                  
      cy.get('[data-cy=image-url-box]')
      //document.execCommand("paste");
        .type(Cypress.env('bad_image_from_url'))
        .blur();
        
      cy.get('[data-cy=image-not-found]').should('be.visible');
        
      cy.get('[data-cy=image-not-found]').should('be.visible');
      cy.get('[data-cy=image-preview]').should('not.exist')
      cy.get('[data-cy=reset-image-action]').should('not.be.disabled');
      cy.get('@changeImageButton').click()  
    });
    
    
  
    // more examples
    //
    // https://github.com/cypress-io/cypress-example-todomvc
    // https://github.com/cypress-io/cypress-example-kitchensink
    // https://on.cypress.io/writing-your-first-test
  })
  