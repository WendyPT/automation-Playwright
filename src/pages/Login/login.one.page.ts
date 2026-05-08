import { expect, Page } from "@playwright/test";


export class LoginPage {

    readonly page: Page;

    private readonly Locators ={
    emailInput: 'auth-email',
    passwordInput: 'auth-password',
    sumitButton: 'auth-submit',
    }

    constructor(page: Page) {
        this.page = page;
    }

    async fillEmail(user: string) {
        await expect(this.page.getByTestId(this.Locators.emailInput)).toBeEnabled({ timeout: 3000});
        await this.page.getByTestId(this.Locators.emailInput).fill(user);
    }

    async fillPassword(password: string) {  
       await expect(this.page.getByTestId(this.Locators.passwordInput)).toBeEnabled({ timeout: 3000});
        await this.page.getByTestId(this.Locators.passwordInput).fill(password);
    }
      
    
    async clickLoginUser() {
        await this.page.getByTestId(this.Locators.sumitButton).click();
     
    }

    async loginUser(user: string, password: string) {
        await this.fillEmail(user);
        await this.fillPassword(password);
        await this.clickLoginUser();
    }
  
}