describe("Halaman Daftar Alat", () => {
  it("Kunjungi halaman Alat", () => {
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("/login");
    cy.wait(2000);
    cy.get("[name='email']").type("rahma@gmail.com");
    cy.get("[name='password']").type("rahma1345");
    cy.get('[name="login"]').check();
    cy.get("[type='submit']").click();
    cy.wait(1000);
    cy.visit("/admin/ed-alat");
    cy.wait(1000);
    cy.get(".container").last().scrollIntoView();
  });
});
