describe("Delete Score", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Delete score of students", () => {
    //Access the score management page.
    cy.get(":nth-child(3) > li > .nav-item").click();
    cy.url().should("include", "/score/view-score");

    //Select a student's project with an assigned score.
    cy.get('[data-test="score-card-0"]').click();

    //Confirm the deletion action.
    cy.get("#range-value").clear().type("0.0");
    cy.get(".swal2-confirm").click();
  });
});
