describe("View User Profile", () => {
  before(() => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("Tan7kinh.Duong38");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");
  });

  it("View user profile", () => {
    //Select the "View Profile" option.
    cy.get(".avatar").click();
    cy.get('[data-test="view-profile-button"]').click();
    cy.url().should("include", "/profile/view-profile");

    //Review the user's profile information, including name, email, and other relevant details.
    cy.get(".col-span-3 > :nth-child(1) > .bg-gray-100").should("be.visible"); //name
    cy.get(".col-span-3 > :nth-child(2) > .bg-gray-100").should("be.visible"); //username
    cy.get(".grid > :nth-child(1) > .bg-gray-100").should("be.visible"); // phone number
    cy.get(".grid > :nth-child(2) > .bg-gray-100").should("be.visible"); //date of birth
    cy.get(":nth-child(4) > .bg-gray-100").should("be.visible"); //email address
    cy.get(":nth-child(5) > .bg-gray-100").should("be.visible"); //faculty
    cy.get(".w-64 > img").should("be.visible"); //profile image

    //Confirm that the displayed information is accurate and up-to-date.
  });
});
