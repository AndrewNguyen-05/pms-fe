describe("Set Time Project for Students to register", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Set time project for students to register", () => {
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.get(
      '[data-test="0"] > .bg-white > .grid-cols-12 > :nth-child(1) > .w-5'
    ).check();
    cy.get(
      '[data-test="1"] > .bg-white > .grid-cols-12 > :nth-child(1) > .w-5'
    ).check();
    cy.get(
      '[data-test="2"] > .bg-white > .grid-cols-12 > :nth-child(1) > .w-5'
    ).check();
    cy.get(":nth-child(1) > :nth-child(2) > .btn-blue").click();
    cy.get('[data-test="set-time-select"]').select("HKI - 2023");
    cy.get('[data-test="save-button"]').click();
    cy.get(".select").select("HKI - 2023");

    cy.get(".btn > .avatar").click();
    cy.get('[data-test="logout-button"]').click();

    cy.get('[data-test="username-input"]').type("ThanhNgan80");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.get(
      '[data-test="0"] > .bg-white > .grid-cols-12 > .col-span-1 > [data-test="edit-button"]'
    ).click();
    cy.get(".swal2-confirm").click();
  });
});
