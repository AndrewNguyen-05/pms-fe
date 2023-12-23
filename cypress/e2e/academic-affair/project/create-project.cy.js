describe("Create Project", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Create a project", () => {
    //Access the project creation page.
    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/project/view-project");
    cy.get("#create-button").click();

    //Provide necessary project details, including the project title, description, and requirements.
    cy.get("#name").type("Dự án mới được tạo");
    cy.get("#faculty").select("Công nghệ Phần Mềm");
    cy.get("#project-type").select("1");
    cy.get("#teacher-name").select("Phạm Gia Hiệp");
    cy.get(":nth-child(2) > #teacher-info")
      .invoke("val")
      .should("equal", "GiaHiep.Pham@yahoo.com");
    cy.get(":nth-child(3) > #teacher-info")
      .invoke("val")
      .should("equal", "0222 7026 9420");
    cy.get("#requirement").type("Dự án mới được triển khai lần đầu");

    //Create the project.
    cy.get('[data-test="create-button"]').click();

    //Confirm that the new project is successfully created.
    cy.get("#default-search").clear().type("Dự án mới được tạo");
    cy.get("#search-button").click();
    cy.get(".flex-col > .font-bold").should("contain", "Dự án mới được tạo");
  });
});
