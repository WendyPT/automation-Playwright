import { expect, Page } from "@playwright/test";
import { loginLocators as L } from "./login.locators";


export class LoginPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async fillEmail(user: string) {
        await expect(this.page.getByTestId(L.emailInput)).toBeEnabled({ timeout: 3000});
        await this.page.getByTestId(L.emailInput).fill(user);
    }

    async fillPassword(password: string) {  
        await expect(this.page.getByTestId(L.passwordInput)).toBeEnabled({ timeout: 3000});
        await this.page.getByTestId(L.passwordInput).fill(password);
    }
      
    async clickLoginUser() {
        await this.page.getByTestId(L.sumitButton
            
        ).click();
    }

    async loginUser(user: string, password: string) {
        await this.fillEmail(user);
        await this.fillPassword(password);
        await this.clickLoginUser();
    }
  
}