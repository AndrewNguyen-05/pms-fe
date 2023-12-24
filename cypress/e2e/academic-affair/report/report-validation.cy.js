describe("Report Validation and Verification", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Report validation and verification", () => {
    cy.readFile("./cypress/downloads/DanhSachDoAn.xlsx");

    cy.readFile("./cypress/downloads/BangDiemDoAn.xlsx");

    cy.readFile("./cypress/downloads/ThongKeDoAn1_2.xlsx");
  });
});
