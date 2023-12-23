describe("Create User Account", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ChanHung.Lam71");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Create Academic Affair account", () => {
    //Navigate to the user account creation page
    cy.get(".nav-item").click();
    cy.url().should("include", "/admin/account/view-account");

    cy.get('[data-test="create-account-button"]').click();
    cy.get('[data-test="create-account-dialog"] > .modal-box').should(
      "be.visible"
    );

    //Enter valid user account information, including a unique username, password, email, and user role (aa)
    cy.get('[data-test="create-username-input"]').type("aaUsernameTesting");
    cy.get('[data-test="create-password-input"]').type("123");
    cy.get('[data-test="create-name-input"]').type(
      "Academic Affair Testing Example"
    );
    cy.get('[data-test="create-email-input"]').type("aa_testing@example.com");
    cy.get('[data-test="create-date-of-birth-input"]').type("2003-01-01");
    cy.get('[data-test="create-phone-number-input"]').type("0123456789");
    cy.get('[data-test="create-role-select"]').select("Academic Affair");
    cy.get('[data-test="aa-id-input"]').type("AA777");
    cy.get('[data-test="aa-faculty-input"]').type("Công nghệ Phần mềm");

    //Click the 'Create Account' button
    cy.get('[data-test="create-save-button"]').click();

    //Verify that the new user account is successfully created and stored in the user database
    cy.get("#default-search").type("Academic Affair");
    cy.get("#search-button").click();

    cy.get('[data-test="account-card-0"]').should("be.visible");
    cy.get('[data-test="account-card-title"]').should(
      "contain",
      "Academic Affair"
    );
  });
});
