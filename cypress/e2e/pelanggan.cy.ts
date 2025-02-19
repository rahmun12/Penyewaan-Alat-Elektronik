describe("Halaman Daftar Pelanggan", () => {
    it("Kunjungi halaman Daftar Pelanggan", () => {
      cy.on("uncaught:exception", (err, runnable) => {
        return false;
      });
      cy.visit("/login");
      cy.wait(2000);
      cy.get("[name='email']").type("irma@gmail.com");
      cy.get("[name='password']").type("irmanew");
      cy.get('[name="login"]').check();
      cy.get("[type='submit']").click();
      cy.contains("Daftar Pelanggan").click();
      cy.visit("/admin/penyewa");
      cy.wait(1000);
      cy.get(".container").last().scrollIntoView();
    });
  });
  