describe("Read Announcement", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Read an announcement", () => {
    //Navigate to the announcement board or announcement list.
    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/view-announcement");

    //Verify that announcements are displayed.
    cy.get('[data-test="announcement-card"]').should("be.visible");

    //Click on an announcement to view its details and check if the announcement content is visible to the user.
    cy.get('[data-test="announcement-title"]').should("not.exist");
    cy.get('[data-test="announcement-content"]').should("not.exist");
    cy.get('[data-test="announcement-created-at"]').should("not.exist");
    cy.get('[data-test="announcement-last-modified"]').should("not.exist");

    cy.get(
      ':nth-child(1) > [data-test="announcement-card"] > .bg-white'
    ).click();

    cy.get('[data-test="announcement-title"]').should("be.visible");
    cy.get('[data-test="announcement-content"]').should("be.visible");
    cy.get('[data-test="announcement-created-at"]').should("be.visible");
    cy.get('[data-test="announcement-last-modified"]').should("be.visible");
  });
});
