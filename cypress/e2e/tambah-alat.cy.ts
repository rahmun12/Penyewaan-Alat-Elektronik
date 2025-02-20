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
    cy.visit("/admin/ed-alat");
    cy.wait(1000);
    cy.get('[name="tambah-alat"]').click();
    cy.visit("/admin/ed-alat/tambah");
    cy.wait(1000);
    cy.get('[name="kategori_id"]').select("Laptop");
    cy.get('[name="alat_nama"]').type("Laptop");
    cy.get('[name="alat_hargaperhari"]').type("100000");
    cy.get('[name="alat_deskripsi"]').type("Laptop Macbook yang bagus");
      cy.get('[name="alat_stok"]').type("10");
      cy.get('input[name="alat_gambar"]').should('exist');

    // Unggah file dari folder fixtures
    cy.get('input[name="alat_gambar"]').attachFile('laptop.png');

    // Pastikan file tersimpan dalam state (jika ada pratinjau, periksa elemen terkait)
    cy.get('input[name="alat_gambar"]').then(($input) => {
        const inputElement = $input[0] as HTMLInputElement; // Konversi ke HTMLInputElement
        expect(inputElement.files?.[0].name).to.equal('laptop.png');
      });
  });
});