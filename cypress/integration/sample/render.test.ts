describe("Sample Module", () => {
  it("visits the sample page", () => {
    cy.visit("http://localhost:3000/sample/sample-page");
    cy.contains("sample");
  });
});
