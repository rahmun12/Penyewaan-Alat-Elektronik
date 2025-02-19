describe("Halaman Forgot Password", () => {
    it("Kunjungi halaman forgot password", () => {
        cy.visit("/forgot-password");
        cy.get("[type='email']").type("test@gmail.com");
        cy.get("[type='password']").type("testingcypress");
        cy.get('[type="checkbox"]').check();
        cy.get("[type='submit']").click();
        cy.wait(1000);
        cy.get("[name='oke']").click();
    })
})