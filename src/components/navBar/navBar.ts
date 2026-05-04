import { Page } from "@playwright/test";

export class navBar {

    readonly page: Page;

    constructor(page: Page){ 
        this.page = page; 
 }
    async clickLoginSection() {
        await this.page.getByTestId('nav-login-btn').click();
    }
        
  }