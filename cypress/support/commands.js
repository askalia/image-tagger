
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

Cypress.Commands.add('file_to_data_uri', (fileName, fileType) => {
  return cy.fixture(fileName)
  .then((content) => {
    const imageBlob = Cypress.Blob.base64StringToBlob(content, fileType)
    return Cypress.Blob.blobToDataURL(imageBlob)
  })
});

  