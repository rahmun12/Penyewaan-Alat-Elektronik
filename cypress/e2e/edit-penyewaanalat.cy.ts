describe("Halaman Penyewaan alat", () => {
  it("Kunjungi halaman Penyewaan alat untuk Mengedit penyewa alat", () => {
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
    cy.get('[name="edit"]').first().click();
    cy.visit("/admin/sewa/edit/1");
    cy.get('[name="pelanggan_id"]').type("1");
    cy.get('[name="penyewaan_tglsewa"]').type("2024-01-01");
    cy.get('[name="penyewaan_tglkembali"]').type("2024-01-20");
    cy.get('[name="penyewaan_stspembayaran" ]').select("Belum Dibayar");
  });
});
