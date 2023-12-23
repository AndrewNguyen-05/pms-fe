describe("User Authorization", () => {
  it("Check authorization of Administrator", () => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("ChanHung.Lam71");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");

    cy.get(".nav-item").click();
    cy.url().should("include", "/admin/account/view-account");
  });

  it("Check authorization of Academic Affair", () => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("NguyenKhang_Trinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");

    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/academic-affair/project/view-project");

    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should(
      "include",
      "/academic-affair/announcement/view-announcement"
    );

    cy.get(":nth-child(3) > li > .nav-item").click();
    cy.url().should("include", "/academic-affair/score/view-score");

    cy.get(":nth-child(4) > li > .nav-item").click();
    cy.url().should("include", "/academic-affair/analysis/view-analysis");
  });

  it("Check authorization of Teacher", () => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("CamVan.7kinh");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");

    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/teacher/project/view-project");

    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/teacher/announcement/view-announcement");

    cy.get(":nth-child(3) > li > .nav-item").click();
    cy.url().should("include", "/teacher/score/view-score");
  });

  it.only("Check authorization of Student", () => {
    cy.visit("http://localhost:3000");

    cy.url().should("include", "/auth/signin");

    cy.get('[data-test="username-input"]').type("QuocHung.Ngo47");
    cy.get('[data-test="password-input"]').type("123");
    cy.get('[data-test="login-button"]').click();

    cy.wait(400);
    cy.url().should("not.include", "/auth/signin");

    cy.get(":nth-child(1) > li > .nav-item").click();
    cy.url().should("include", "/student/project/view-project");

    cy.get(":nth-child(2) > li > .nav-item").click();
    cy.url().should("include", "/student/announcement/view-announcement");
  });
});
