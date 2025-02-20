describe("Halaman Daftar Alat", () => {
  it("Kunjungi halaman Alat untuk mengedit", () => {
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
    cy.get('[name="edit-alat"]').eq(9).click();
    cy.visit("admin/ed-alat/edit/12");
    cy.wait(1000);
    cy.get('[name="alat_nama"]').type(" Macbook");
    cy.get('[name="alat_hargaperhari"]').clear().type(" 500000");
    cy.get('[name="kategori_id"]').select("Laptop");
    cy.get('[name="alat_deskripsi"]').type(" dan Laptop Macbook yang bagus");
    cy.get('[name="alat_stok"]').clear().type("3");
    cy.get('input[name="alat_foto"]').should("exist");

    // Unggah file dari folder fixtures
    cy.get('input[name="alat_foto"]').attachFile("laptop.png");

    // Pastikan file tersimpan dalam state (jika ada pratinjau, periksa elemen terkait)
    cy.get('input[name="alat_foto"]').then(($input) => {
      const inputElement = $input[0] as HTMLInputElement; // Konversi ke HTMLInputElement
      expect(inputElement.files?.[0].name).to.equal("laptop.png");
    });
  });
});
