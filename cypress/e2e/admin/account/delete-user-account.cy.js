describe("Delete User Account", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ChanHung.Lam71");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Delete a user account", () => {
    //Select a user account to delete
    cy.get(".nav-item").click();
    cy.url().should("include", "/admin/account/view-account");

    cy.get("#default-search").type("Academic Affair");
    cy.get("#search-button").click();
    cy.get(".content-center > .w-4").check();
    cy.get(".content-center > .w-4").should("be.checked");

    //Confirm the delete action
    cy.get('[data-test="delete-account-button"]').click();
    cy.get(".swal2-confirm").click();

    //Verify that the user account is deactivated or removed from the user database
    cy.get('[data-test="account-card-0"] > .shadow-md').should("not.exist");
  });
});
