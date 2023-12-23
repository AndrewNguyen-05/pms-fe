describe("Delete Project", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Delete a project", () => {
    //Access the project management page.
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/project/view-project");

    //Select a project to delete.
    cy.get("#default-search").type("Dự án đang được cập nhật");
    cy.get("#search-button").click();
    cy.get(".w-5").check();
    cy.get(".w-5").should("be.checked");

    //Confirm the deletion action.
    cy.get("#delete-button").click();
    cy.get(".swal2-confirm").click();

    //Verify that the project is removed from the system.
    cy.get("#default-search").clear().type("Dự án đang được cập nhật");
    cy.get("#search-button").click();
  });
});
