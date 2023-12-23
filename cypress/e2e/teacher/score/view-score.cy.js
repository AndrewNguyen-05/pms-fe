describe("View Score", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("View student's score", () => {
    //Access the score creation page.
    cy.get(":nth-child(3) > li > .nav-item").click();
    cy.url().should("include", "/score/view-score");

    // Verify that the scores and assessments for the user's projects are displayed.
    cy.wait(100);
    cy.get(".px-16 > .col-span-5 > .font-bold").should("be.visible");
    cy.get(".px-16 > .col-span-5 > .grid > .text-base").should("be.visible");
    cy.get(".px-16 > .col-span-5 > .grid > .col-span-3 > .text-sm").should(
      "be.visible"
    );
    cy.get(
      ".px-16 > .col-span-5 > .grid > .col-span-3 > :nth-child(2) > .bg-blue-50"
    ).should("be.visible");
  });
});
