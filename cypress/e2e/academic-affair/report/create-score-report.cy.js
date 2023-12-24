describe("Create Score Report", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Create score report", () => {
    cy.get(":nth-child(3) > li > .nav-item").click();
    cy.url().should("include", "/score/view-score");

    cy.get(".btn-blue").click();

    cy.readFile("./cypress/downloads/BangDiemDoAn.xlsx");
  });
});
