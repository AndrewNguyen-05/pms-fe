import { slowCypressDown } from "cypress-slow-down";

slowCypressDown(300);

describe("Testing announcement components", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();
    cy.wait(200);
    cy.get(".nav-item").contains("Announcement").click();
    cy.wait(200);
  });

  it("Testing search announcement functionality", () => {
    cy.get("#default-search").type("Pizza");
    cy.get("#search-button").click();
    cy.get('[data-test="announcement-card-title"]').should("contain", "Pizza");
  });

  it("Testing infinite scroll functionality", () => {
    cy.get('[data-test="announcement-card"]')
      .should("have.length.greaterThan", 5)
      .then((cards) => {
        cy.get("#scrollableAnnouncementDiv").scrollTo("bottom");
        cy.get('[data-test="announcement-card"]').should(
          "have.length",
          cards.length * 2
        );

        cy.get("#scrollableAnnouncementDiv").scrollTo("bottom");
        cy.get('[data-test="announcement-card"]').should(
          "have.length",
          cards.length * 3
        );

        cy.get("#scrollableAnnouncementDiv").scrollTo("bottom");
        cy.get('[data-test="announcement-card"]').should(
          "have.length",
          cards.length * 4
        );

        cy.get("#scrollableAnnouncementDiv").scrollTo("bottom");
        cy.get('[data-test="announcement-card"]').should(
          "have.length",
          cards.length * 5
        );

        cy.get("#scrollableAnnouncementDiv").scrollTo("bottom");
      });
  });
});
