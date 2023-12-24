describe("Submit Project Link", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ThanhNgan80");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });
  it("Submit project link", () => {
    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();
    cy.url().should("include", "/profile/view-profile");

    cy.get('[data-test="submit-project-button"]').click();
    cy.get("#swal2-input").clear().type("testing-example.com");
    cy.get(".swal2-confirm").click();
  });
});
