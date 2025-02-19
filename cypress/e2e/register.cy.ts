describe("Halaman Register", () => {
  it("Kunjungi Halman Register", () => {
    cy.visit("/register");
    cy.get('[type="text"]').type("naa");
    cy.get('[type="email"]').type("naa@gmail.com");
    cy.get('[type="password"]').type("narapidana");
    cy.get('[type="submit"]').click();
  });
});
