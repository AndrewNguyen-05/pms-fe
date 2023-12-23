describe("View Project List", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("View project list", () => {
    //Navigate to the project list or dashboard.
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/project/view-project");

    //Verify that the list of available projects is displayed.
    cy.get(
      ".bg-white > .grid-cols-12 > .col-span-5 > .flex-col > .font-bold"
    ).should("be.visible");
    cy.get(
      ".bg-white > .grid-cols-12 > .col-span-5 > .flex-col > .grid > .col-span-2"
    ).should("be.visible");
    cy.get(
      ".bg-white > .grid-cols-12 > .col-span-5 > .flex-col > .grid > .col-span-3 > :nth-child(1) > .bg-blue-200"
    ).should("be.visible");
    cy.get(
      ".bg-white > .grid-cols-12 > .col-span-5 > .flex-col > .grid > .col-span-3 > :nth-child(2) > .bg-red-50"
    ).should("be.visible");

    //Click on a project to view its details.
    cy.get('[data-test="0"]').click();
  });
});
