import React from "react";
import ViewProject from "./view-project";
import "../../../styles/globals.css";
import "../../_app";

describe("Testing the function to view project list", () => {
  it("Testing the function renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1180, 700);
    cy.mount(<ViewProject />);
  });

  it("Testing the function search", () => {
    cy.viewport(1180, 700);
    cy.mount(<ViewProject />);
    cy.get("#default-search").type("Xay dung");
    cy.get("#search-button").click();
  });
});
