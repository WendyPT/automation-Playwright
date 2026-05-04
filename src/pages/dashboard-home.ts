import { expect, Page } from '@playwright/test';

export class DashboardPage{

    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }
    async isAdminLogged(){
       await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/admin");
    }

    async isStudentLogged(){
        await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/dashboard");
    }

     async isStudentNotLogged(){
        await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/login");
    }
}
