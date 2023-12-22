describe("Delete Announcement", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("7kinhNgan59");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Delete an announcement", () => {
    //Access the announcement management page.
    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/view-announcement");

    //Select an announcement to delete.
    cy.get("#default-search").type("Thông báo mới được cập nhật");
    cy.get("#search-button").click();

    cy.get(".w-full > :nth-child(1) > .w-4").check();
    cy.get(".w-full > :nth-child(1) > .w-4").should("be.checked");
    cy.get('[data-test="delete-account-button"]').click();

    //Confirm the deletion action.
    cy.get(".swal2-confirm").click();
    //Verify that the announcement is removed from the system.
    cy.get("#default-search").clear().type("Thông báo mới được cập nhật");
    cy.get("#search-button").click();

    cy.get('[data-test="announcement-card-0"]').should("not.exist");
  });
});
