import { expect, Page } from '@playwright/test';

export class DashboardPage{

    readonly page: Page;
    constructor(page: Page){
        this.page = page;
    }
    async isAdminLogged(){
       await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/admin",
       { timeout: 15000 }  // ← sube de 5000ms a 15000ms
       );
    }

    async isStudentLogged(){
        await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/login",
        { timeout: 15000 }
        );
    }

     async isStudentNotLogged(){
        await expect(this.page).toHaveURL("https://staging.testertestarudo.com/es/login",
        { timeout: 15000 }
        );
    }
}
