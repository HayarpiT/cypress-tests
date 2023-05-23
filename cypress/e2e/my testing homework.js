/// <reference types="cypress" />
describe("Automation store", () => {
    const email=`Hayarpi_${Math.random()}@mailinator.com`;
     const loginName=`Hayarpi_${Math.random()}`
     beforeEach( () => {
        cy.visit('https://automationteststore.com/');
     } )
    it("check login or register field", ()=> {
        cy.get('#customer_menu_top > li').click();
        cy.location('pathname').should('equal', '/index.php');

    });

    it("Registering and logout", () =>{
        cy.get('#customer_menu_top > li').click();
        cy.get('#accountFrm > fieldset > button').click();
        cy.get('#AccountFrm_firstname').type('Hayarpi');
        cy.get('#AccountFrm_lastname').type('Hayarp');
        cy.get('#AccountFrm_email').type(email);
        cy.get('#AccountFrm_address_1').type('Harapi33');
        cy.get('#AccountFrm_city').type('Erevan');
        cy.get('#AccountFrm_zone_id').select('Angus');
        cy.get('#AccountFrm_postcode').type('1234');
        cy.get('#AccountFrm_country_id').select('United Kingdom');
        cy.get('#AccountFrm_loginname').type(loginName);
        cy.get('#AccountFrm_password').type('1234');
        cy.get('#AccountFrm_confirm').type('1234');
        cy.get('#AccountFrm_newsletter0').click();
        cy.get('#AccountFrm_agree').click();
        cy.get('.col-md-2 > .btn').click();
        cy.get('.maintext').should('contain','Your Account Has Been Created!');
        cy.get('.mb40 > .btn').click();
        cy.get('.side_account_list > :nth-child(10) > a').click();
        cy.get('.maintext').should('contain', 'Account Logout');
});
it("login account",() => {
    cy.get('#customer_menu_top > li > a').click();
    cy.get('#loginFrm_loginname').type('Hayarpi');
    cy.get('#loginFrm_password').type('1234');
    cy.get('#loginFrm > fieldset > .btn').click();
    cy.get('.maintext').should('contain', 'My Account');   
});
      
    it('checking "Books" button', ()=> {
        cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=65"]').click()
        cy.title().should('eq', 'Books');
});

    it('check clicking on an item', () => { 
        cy.get('#categorymenu > nav > ul > li:nth-child(8)').click()
        cy.title().should('eq', 'Books');
        cy.get('#maincontainer > div > div > div > div > div.thumbnails.grid.row.list-inline > div:nth-child(4) > div.thumbnail').click();
        cy.title().should('eq', 'Allegiant by Veronica Roth'); 
})

    it('Choosing "Shoes" section', () => {
        cy.get('[href="https://automationteststore.com/index.php?rt=product/category&path=68"]').click();
        cy.get(':nth-child(1) > .mt10 > a').click();
        cy.title().should('eq', 'Shoes');
    
})

    it("Adding an item to cart number gets ++", ()=> {   
        cy.get("[class*='topcart'] span[class*='label']").then(
        ($num1) => {
              const totalCountBefore = parseInt($num1.text());
              cy.get("section[id='featured'] div[class*='thumbnails'] > div")
                 .first()
                 .within(() => {
                    cy.get("[class='productcart']").click()
                })
            cy.get("[class*='topcart'] span[class*='label']").should("have.text", totalCountBefore + 1)                 
}) 
})


});