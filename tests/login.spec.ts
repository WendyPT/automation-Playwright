import { test, expect } from '../src/fixture/index';
import users from '../src/test-data/users.json';

const passwords = {
  admin: process.env.ADMIN_PASSWORD!,
  student: process.env.STUDENT_PASSWORD!,
  invalid: process.env.INVALID_PASSWORD!,
};

test.describe("Login - Flujo Real del Home",() => {

    test.beforeEach( async ({page, cookies, menu}) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    
  });

test('Login Admin', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.adminUser.email, passwords.admin);
  await dashboardPage.isAdminLogged();
});

test('Login Student', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.StudentUser.email, passwords.student);
  await dashboardPage.isStudentLogged();
});

test('Not Valid User', async ({ page, loginPage, dashboardPage }) => {
  await loginPage.loginUser(users.NotValidUser.email, passwords.invalid);
  await dashboardPage.isStudentNotLogged();
});

});