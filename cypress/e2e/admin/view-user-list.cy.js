describe("View User List", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("Tan7kinh.Duong38");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("View user list", () => {
    //Access the user list page.
    cy.get(".nav-item").click();
    cy.url().should("include", "/admin/account/view-account");

    //Verify that the list displays all user accounts, including their usernames, email addresses, and roles.
    cy.get('[data-test="account-card-title"]').should("be.visible");
    cy.get('[data-test="account-card-username"]').should("be.visible");
    cy.get('[data-test="account-card-role"]').should("be.visible");
    cy.get('[data-test="account-card-email"]').should("be.visible");
    cy.get('[data-test="account-card-phone"]').should("be.visible");
  });
});
