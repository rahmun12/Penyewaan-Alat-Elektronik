describe("Halaman Forgot Password", () => {
    it("Kunjungi halaman forgot password",() => {
        cy.on('uncaught:exception', (err, runnable) => {
          return false
        })
        cy.visit("/forgot-password");
        cy.get("[type='email']").type("irma@gmail.com");
        cy.get("[type='password']").type("forgotpw");
        cy.get('[type="checkbox"]').check();
        cy.get("[type='submit']").click();
        cy.wait(1000);
        cy.get("[name='oke']").click();
        cy.wait(1000);
    })
})