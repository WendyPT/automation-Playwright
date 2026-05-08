
import { LoginPage } from '../pages/Login/login.page';
import { Cookies } from '../components/cookiesModal/cookies';
import { navBar } from '../components/navBar/navBar';
import { DashboardPage } from '../pages/dashboard/dashboard-home';
import { test as base } from '@playwright/test';

type PageFixtures =  {
  loginPage: LoginPage;
  cookies: Cookies;
  menu: navBar;
  dashboardPage: DashboardPage;
}

export const test = base.extend<PageFixtures> (
    {
        loginPage: async({ page }, use)=> {
            await use(new LoginPage(page));
        },

        dashboardPage: async({ page }, use)=> {
            await use(new DashboardPage(page));
        },

        menu: async({ page }, use)=> {
            await use(new navBar(page));
        },

        cookies: async({ page }, use)=> {
            await use(new Cookies(page));
        },
    }
);

export { expect } from '@playwright/test';
