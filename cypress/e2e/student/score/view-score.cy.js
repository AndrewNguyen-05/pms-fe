describe("View Score", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ThanhNgan80");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Testing the ability to view score of students", () => {
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.get(
      '[data-test="0"] > .bg-white > .grid-cols-12 > .col-span-1 > [data-test="edit-button"]'
    ).click();
    cy.get(".swal2-confirm").click();

    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();
    cy.url().should("include", "/profile/view-profile");

    cy.get(".justify-between > :nth-child(1) > :nth-child(4)").should(
      "be.visible"
    );
  });
});
