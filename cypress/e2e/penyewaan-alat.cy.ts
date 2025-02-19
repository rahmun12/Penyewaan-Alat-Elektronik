describe("Halaman Penyewaan alat", () => {
    it("Kunjungi halaman Penyewaan alat", () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.visit("/login");
      cy.wait(2000);
      cy.get("[name='email']").type("irma@gmail.com");
      cy.get("[name='password']").type("irmanew");
      cy.get('[name="login"]').check();
      cy.get("[type='submit']").click();
      cy.wait(1000);
      cy.contains("Penyewaan Alat").click();
      cy.visit("/admin/sewa");
      cy.wait(1000);
      cy.get(".container").last().scrollIntoView();
    });
  });
  