describe("Cancel Registered Project", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ThanhNgan80");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Testing if students can cancel their registered projects", () => {
    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();
    cy.url().should("include", "/profile/view-profile");

    cy.get(".w-fit").click();
    cy.get(".swal2-confirm").click();
    cy.get(".mt-24").should(
      "contain",
      "You haven't registered any project yet!"
    );
  });
});
