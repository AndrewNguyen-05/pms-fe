describe("Update Announcement", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("7kinhNgan59");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Update an announcement", () => {
    //Access the announcement management page.
    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/view-announcement");

    //Select an existing announcement.
    cy.get("#default-search").type("Thông báo mới được tạo");
    cy.get("#search-button").click();

    cy.get('[data-test="edit-button"]').click();

    //Modify the announcement's title or content.
    cy.get("#title").clear().type("Thông báo mới được cập nhật");
    cy.get("#content")
      .clear()
      .type("<insert Nội dung thông báo sau khi cập nhật>");

    //Click the "Update" button.
    cy.get('[data-test="update-button"]').click();

    //Confirm that the announcement is updated successfully.
    cy.get("#default-search").type("Thông báo mới được cập nhật");
    cy.get("#search-button").click();

    cy.get('[data-test="announcement-card-title"]').should(
      "contain",
      "Thông báo mới được cập nhật"
    );
  });
});
