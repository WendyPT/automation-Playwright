import { expect, Page } from "@playwright/test";



export class LoginPage {

    readonly page: Page;

    constructor(page: Page){ 
        this.page = page; 
 }
    async fillEmail(user: string) {
        await expect(this.page.getByTestId('auth-email')).toBeEnabled({timeout: 10000}); 
        await this.page.getByTestId('auth-email').fill(user);
    }
    
    async fillPassword(password: string) {
        await expect(this.page.getByTestId('auth-password')).toBeEnabled({timeout: 10000}); 
        await this.page.getByTestId('auth-password').fill(password);
    }
    
    async clickLoginUser() {
        await this.page.getByTestId('auth-submit').click();
    }

    async loginUser(user: string, password: string) {
        await this.fillEmail(user);
        await this.fillPassword(password);
        await this.clickLoginUser();
    }
  }