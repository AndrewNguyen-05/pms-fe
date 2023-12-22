describe("Create Announcement", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("7kinhNgan59");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("Create an announcement", () => {
    //Access the announcement creation page.
    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/view-announcement");

    cy.get("#create-button").click();
    cy.url().should("include", "/create-announcement");

    //Provide necessary details, including the announcement title, content, and target audience.
    cy.get("#title").type("Thông báo mới được tạo");
    cy.get("#content").type("<insert Nội dung thông báo>");
    cy.get("#isPublic").check();

    //Click the "Create Announcement" button.
    cy.get('[data-test="confirm-button"]').click();

    //Confirm that the new announcement is successfully created and displayed.
    cy.get("#default-search").type("Thông báo mới được tạo");
    cy.get("#search-button").click();
    cy.get('[data-test="announcement-card-0"]').should("be.visible");
    cy.get(
      '[data-test="announcement-card-0"] > [data-test="announcement-card"] > .bg-white > .w-full > .col-span-9 > .flex-col > .justify-between > [data-test="announcement-card-title"]'
    ).should("contain", "Thông báo mới được tạo");
  });
});
