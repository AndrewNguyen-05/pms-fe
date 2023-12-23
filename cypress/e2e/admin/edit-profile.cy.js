describe("Edit User Profile", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("Tan7kinh.Duong38");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("", () => {
    //View profile
    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();
    cy.url().should("include", "/profile/view-profile");

    cy.get(".col-span-3 > :nth-child(1) > .bg-gray-100").should("be.visible"); //name
    cy.get(".col-span-3 > :nth-child(2) > .bg-gray-100").should("be.visible"); //username
    cy.get(".grid > :nth-child(1) > .bg-gray-100").should("be.visible"); // phone number
    cy.get(".grid > :nth-child(2) > .bg-gray-100").should("be.visible"); //date of birth
    cy.get(":nth-child(4) > .bg-gray-100").should("be.visible"); //email address
    cy.get(":nth-child(5) > .bg-gray-100").should("be.visible"); //faculty
    cy.get(".w-64 > img").should("be.visible"); //profile image

    //Select the "Edit Profile" option.
    cy.get(":nth-child(4) > .w-full").click();
    cy.get(".my-5").should("be.visible");

    //Modify user profile information (e.g., name, email, password).
    cy.get(".col-span-3 > :nth-child(1) > .bg-gray-100")
      .clear()
      .type("Trần Tân Phước Phan"); //name
    cy.get(".grid > :nth-child(1) > .bg-gray-100").clear().type("0123456789"); //phone number
    cy.get(":nth-child(4) > .bg-gray-100")
      .clear()
      .type("TanPhuocPhan.Tran@yahoo.com"); //email address

    //Confirm the changes to the profile.
    cy.get('[data-test="save-button"]').click(); //click save button

    //Log out and log in again to verify that the changes are saved and effective.
    cy.get(".btn > .avatar").dblclick();
    cy.get('[data-test="logout-button"]').click();

    cy.get('[data-test="username-input"]').type("Tan7kinh.Duong38");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();

    cy.get(".col-span-3 > :nth-child(1) > .bg-gray-100")
      .invoke("val")
      .should("contain", "Trần Tân Phước Phan");
    cy.get(".grid > :nth-child(1) > .bg-gray-100")
      .invoke("val")
      .should("contain", "0123456789");
    cy.get(":nth-child(4) > .bg-gray-100")
      .invoke("val")
      .should("contain", "TanPhuocPhan.Tran@yahoo.com");
  });
});
