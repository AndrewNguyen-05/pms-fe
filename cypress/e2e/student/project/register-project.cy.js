describe("Register Projects", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ThanhNgan80");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Register projects", () => {
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.get(
      '[data-test="0"] > .bg-white > .grid-cols-12 > .col-span-1 > [data-test="edit-button"]'
    ).click();
    cy.get(".swal2-confirm").click();
  });
});
