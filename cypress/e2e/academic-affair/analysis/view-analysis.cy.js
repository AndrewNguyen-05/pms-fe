describe("View Analysis", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("View analysis", () => {
    cy.get(":nth-child(4) > li > .nav-item").click();
    cy.url().should("include", "/view-analysis");

    cy.get(".h-screen > :nth-child(2) > :nth-child(1)").should("be.visible");
    cy.get(".h-screen > :nth-child(2) > :nth-child(2)").should("be.visible");
    cy.get(".h-screen > :nth-child(2) > :nth-child(3)").should("be.visible");
    cy.get(".h-screen > :nth-child(2) > :nth-child(4)").should("be.visible");
    cy.get(".p-0 > .w-full").should("be.visible");

    cy.get(".nav-active").should("contain", "Number of student and project");
    cy.get('[data-carousel-next="true"] > .flex').click();
    cy.get(".nav-active").should("contain", "Register status");
    cy.get('[data-carousel-next="true"] > .flex').click();
    cy.get(".nav-active").should("contain", "Student's score average");
  });
});
