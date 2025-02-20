describe("Halaman Daftar Pelanggan", () => {
    it("Kunjungi halaman Daftar Pelanggan", () => {
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
      cy.get('[name="tambah"]').click();
        cy.visit("/admin/penyewa/tambah");
        cy.get('[name="pelanggan_nama"]').type("Rahma");
        cy.get('[name="pelanggan_alamat"]').type("Korea");
        cy.get('[name="pelanggan_email"]').type("Rahma@hmail.com");
        cy.get('[name="pelanggan_notelp"]').type("0088888888888");
    });
  });
  