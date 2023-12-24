describe("Create Project Report", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Create project report", () => {
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/project/view-project");

    cy.get(".justify-end > :nth-child(2) > :nth-child(1)").click();

    cy.readFile("./cypress/downloads/DanhSachDoAn.xlsx");
  });
});
