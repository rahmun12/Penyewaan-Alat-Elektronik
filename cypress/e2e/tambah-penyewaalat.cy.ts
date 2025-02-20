describe("Halaman Menambah Penyewaan alat", () => {
  it("Kunjungi halaman Menmabahkan menyewakan alat", () => {
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
    cy.get('[name="tambah"]').click();
    cy.visit("/admin/sewa/tambah");
    cy.wait(1000);
    cy.get('[name="pelanggan_id"]').type("2");
    cy.get('[name="penyewaan_tglsewa"]').type("2024-01-01");
    cy.get('[name="penyewaan_tglkembali"]').type("2024-01-20");
    cy.get('[name="penyewaan_stspembayaran" ]').select("Lunas");
    cy.get('[name="penyewaan_ststkembali" ]').select("Belum Kembali");
  });
});
