import { Page } from "@playwright/test";

export class navBar {

    readonly page: Page;

    constructor(page: Page){ 
        this.page = page; 
 }
    async clickLoginSection() {
        await this.page.getByTestId('nav-bar-btn').click();
    }
        
  }