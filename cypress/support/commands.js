
  import 'cypress-file-upload';

Cypress.Commands.add(
    'attach_image',
  {
    prevSubject: 'element',
  },
  (input, fileName, fileType) => {
      cy.fixture(fileName)
        .then((content) => Cypress.Blob.base64StringToBlob(content, fileType))
        .then((blob) => {
          const testFile = new File([blob], fileName);
          const dataTransfer = new DataTransfer();
  
          dataTransfer.items.add(testFile);
          input[0].files = dataTransfer.files;
          return input;
        });
    },
);

Cypress.Commands.add(
  'attach_json',
{
  prevSubject: 'element',
},
(input, fileName, fileType) => {
    /*cy.fixture(fileName)
      .then((content) => {
        return new File([content], fileName);
      })
      .then(cy.log)
      .then((testFile) => {
        
        //const testFile = new File([blob], fileName);
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);
        input[0].files = dataTransfer.files;        
        return input;
      });
  },*/  
  /*cy.fixture(fileName).then(fileContent => {
    input.upload({ fileContent, fileName, mimeType: 'application/json' });
  });
*/
});

/*Cypress.Commands.add(
  'attach_json',
  {
    prevSubject: 'element',
  },
(input, fileName) => {
    
      
    cy.fixture(fileName)
      .then((content) => {
        const json = JSON.stringify(content);
        cy.log("json : " + json)
        const file = new File([content], fileName);
        cy.log(file)
        const list = new DataTransfer()
      
        list.items.add(file)
        const myFileList = list.files
      
        input[0].files = myFileList
        return input
        
      })
      
});
*/

Cypress.Commands.add('file_to_data_uri', (fileName, fileType) => {
  return cy.fixture(fileName)
  .then((content) => {
    const imageBlob = Cypress.Blob.base64StringToBlob(content, fileType)
    return Cypress.Blob.blobToDataURL(imageBlob)
  })
});

  