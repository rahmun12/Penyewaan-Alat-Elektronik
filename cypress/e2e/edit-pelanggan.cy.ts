describe("Halaman Daftar Pelanggan", () => {
    it("Kunjungi halaman Daftar Pelanggan untuk mengedit pelanggan", () => {
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
      cy.contains("Daftar Pelanggan").click();
      cy.visit("/admin/penyewa");
      cy.wait(1000);
        cy.get('[name="edit"]').first().click(); 
        cy.visit("/admin/penyewa/edit/1");
        cy.get('[name="pelanggan_nama"]').clear().type("Cahya");
        cy.get('[name="pelanggan_alamat"]').clear().type("Madyopuro");
        cy.get('[name="pelanggan_email"]').clear().type("RahmaCahya@hmail.com");
        cy.get('[name="pelanggan_notelp"]').type("3456");   
    });
  });
  