describe("Update Project", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Update a project", () => {
    //Access the project management page.
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/project/view-project");

    //Select a project to update.
    cy.get("#default-search").type("Dự án mới được tạo");
    cy.get("#search-button").click();
    cy.get('[data-test="edit-button"]').click();

    //Provide updated project details, such as the project title, description.
    cy.get("#name").clear().type("Dự án đang được cập nhật");
    cy.get("#faculty").select("Khoa học Máy tính");
    cy.get("#project-type").select("2");
    cy.get("#requirement").clear().type("Đã được sửa đổi 1 lần.");
    cy.get('[data-test="update-button"]').click();

    //Confirm that the project files are successfully updated.
    cy.get("#default-search").type("Dự án đang được cập nhật");
    cy.get("#search-button").click();

    cy.get('[data-test="0"]').click();
  });
});
