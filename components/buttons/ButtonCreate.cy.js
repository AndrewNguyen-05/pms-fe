import React from "react";
import ButtonCreate from "./buttons/ButtonCreate";

describe("<ButtonCreate />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ButtonCreate />);
  });
});
