import { expect, Page, Locator } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('auth-email');
        this.passwordInput = page.getByTestId('auth-password');
        this.submitButton = page.getByTestId('auth-submit');
    }

    async fillEmail(user: string) {
        await expect(this.emailInput).toBeEnabled({ timeout: 3000});
        await this.emailInput.fill(user);
    }

    async fillPassword(password: string) {  
        await expect(this.passwordInput).toBeEnabled({ timeout: 3000});
        await this.passwordInput.fill(password);
    }
      
    async clickLoginUser() {
        await this.submitButton.click();
    }

    async loginUser(user: string, password: string) {
        await this.fillEmail(user);
        await this.fillPassword(password);
        await this.clickLoginUser();
    }
  
}