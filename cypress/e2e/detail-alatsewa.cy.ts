describe("Halaman Detail Sewa Alat Pelanggan", () => {
    it("Kunjungi halaman Detail Sewa Alat Pelanggan", () => {
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
      cy.contains("Penyewaan Alat").click();
      cy.visit("/admin/sewa");
      cy.wait(1000);
      cy.get('[name="detail"]').first().click();
    });
  });
  