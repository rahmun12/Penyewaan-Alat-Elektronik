describe("Halaman Register", () => {
  it("Kunjungi halaman register", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/register");
    cy.get('[type="text"]').type("irma");
    cy.get('[type="email"]').type("irma@gmail.com");
    cy.get('[type="password"]').type("irma1411");
    cy.get('[type="submit"]').click();
  });
});
