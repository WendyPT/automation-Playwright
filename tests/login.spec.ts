import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login-page';
import { Cookies } from '../src/components/cookiesModal/cookies';
import { navBar } from '../src/components/navBar/navBar';
import users from '../src/test-data/users.json';
import { DashboardPage } from '../src/pages/dashboard-home';

test.describe("Login - Flujo Real del Home",() => {

  let login: LoginPage;
  let cookies: Cookies;
  let menu: navBar;
  let dashboard: DashboardPage;

  test.beforeEach( async ({page}) => {
    login = new LoginPage(page);
    cookies = new Cookies(page);
    menu = new navBar(page);
    dashboard = new DashboardPage(page);
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    
  });

test.only('Login Admin', async ({ page }) => {
  await login.loginUser(users.adminUser.email, users.adminUser.password);
  await dashboard.isAdminLogged();
});

test('Login Student', async ({ page }) => {
  await login.loginUser(users.StudentUser.email, users.StudentUser.password);
  await dashboard.isStudentLogged();
});

test('Not Valid User', async ({ page }) => {
  await login.loginUser(users.NotValidUser.email, users.NotValidUser.password);
  await dashboard.isStudentNotLogged();
});

});