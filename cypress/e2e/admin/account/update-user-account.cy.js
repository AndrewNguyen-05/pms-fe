describe("Update User Account", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ChanHung.Lam71");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Update Academic Affair account", () => {
    cy.get(".nav-item").click();
    cy.url().should("include", "/admin/account/view-account");

    //Select a user account to edit
    cy.get("#default-search").type("Academic Affair");
    cy.get("#search-button").click();

    cy.get('[data-test="account-card-0"] > .shadow-md').should("be.visible");
    cy.get(".text-lg").click();

    //Modify user information, such as email or user role
    cy.get('[data-test="update-name-input"]')
      .clear()
      .type("Academic Affair Testing Example After Update");
    cy.get('[data-test="update-email-input"]')
      .clear()
      .type("aa_testing_after_update@example.com");
    cy.get('[data-test="update-role-select"]').select("Teacher");
    cy.get('[data-test="teacher-id-input"]').clear().type("TC777");
    cy.get('[data-test="teacher-faculty-input"]')
      .clear()
      .type("Công nghệ Phần mềm");
    cy.get('[data-test="teacher-degree-input"]').clear().type("ThS");

    //Click the 'Update' button
    cy.get('[data-test="update-save-button"]').click();

    //Confirm that the user account details are updated correctly
    cy.get('[data-test="account-card-title"]').should(
      "contain",
      "Academic Affair Testing Example After Update"
    );
  });
});
