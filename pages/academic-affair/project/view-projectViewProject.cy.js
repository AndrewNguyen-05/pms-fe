import React from "react";
import ViewProject from "./view-project";
import "../../../styles/globals.css";

describe("<ViewProject />", () => {
  // beforeEach(() => {
  //   //cy.visit("http://localhost:3000"); // replace with your url
  //   cy.readFile("../../../styles/globals.css").then((content) => {
  //     cy.document().then((doc) => {
  //       const style = doc.createElement("style");
  //       style.innerHTML = content;
  //       doc.head.appendChild(style);
  //     });
  //   });
  // });
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1180, 700);
    cy.mount(<ViewProject />);
  });
});
