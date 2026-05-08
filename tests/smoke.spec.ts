import { test, expect } from '../src/fixture/index';
import users from '../src/test-data/users.json';

const passwords = {
  admin: process.env.ADMIN_PASSWORD!,
  student: process.env.STUDENT_PASSWORD!,
  invalid: process.env.INVALID_PASSWORD!,
};

test.describe("Admin - Smoke Test",() => {
    test.beforeEach( async ({page, cookies, menu, loginPage, dashboardPage }) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    await loginPage.loginUser(users.adminUser.email, passwords.admin);
    await dashboardPage.isAdminLogged();
});

test('Admin filter by user', async ({ page }) => {
    await page.getByTestId('nav-admin-users').click();
    await page.getByTestId('users-search-input').click();
    await page.getByTestId('users-search-input').fill('testcom');
    await page.getByText('testcomprauno', { exact: true }).click();
    await expect(page.getByText('testcomprauno', { exact: true })).toBeVisible();
});

test('Admin New Blog', async ({ page }) => {
    const postTitle = `E2E Post ${Date.now()}`;
    await page.getByTestId('nav-admin-blog').click();
    await page.getByRole('link', { name: '+ Nuevo Post' }).click();
    await page.getByRole('heading', { name: 'New post' }).click();
    await page.getByRole('textbox', { name: 'Post title' }).click();
    await page.getByRole('textbox', { name: 'Post title' }).fill(postTitle);
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
    await page.getByRole('textbox').nth(2).fill('Replicando la clase II para, aprender como se hacen las pruebas con Playwright.');
    await page.getByRole('button', { name: 'Save draft' }).click();
    await page.waitForTimeout(2000);
    await expect.soft(page.getByRole('cell', { name: postTitle })).toBeVisible();
    await expect.soft(page.getByText('draft').first()).toBeVisible();
    await expect.soft(page.getByRole('link', { name: 'Editar' }).first()).toBeVisible();
});

test('Admin Modify Hour in Workshops', async ({ page }) => {
    await page.getByTestId('nav-admin-workshops').click();
    await page.getByRole('button', { name: 'Editar' }).click();
    await page.locator('input[type="datetime-local"]').click();
    await page.locator('input[type="datetime-local"]').fill('2026-05-28T21:52');
    await page.getByRole('textbox', { name: 'Breve descripción del taller' }).fill('Actualización Data');
    await expect(page.getByRole('heading', { name: 'Editar workshop' })).toBeVisible();
    await page.getByRole('button', { name: 'Guardar cambios' }).click();
    await expect(page.getByText('Workshop actualizado✕')).toBeVisible();
});

test('Admin Create a new course', async ({ page }) => {
    await page.getByRole('link', { name: '◈ Profesor' }).click();
    await page.getByRole('link', { name: '+ Nuevo curso' }).click();
    await page.getByTestId('course-title-input').click();
    await page.getByTestId('course-title-input').fill('K6 Tester');
    await page.getByRole('textbox', { name: 'Descripción breve del curso…' }).click();
    await page.getByRole('textbox', { name: 'Descripción breve del curso…' }).fill('Pruebas de Wendy');
    await page.getByRole('combobox').first().selectOption('beginner');
    await page.getByRole('textbox', { name: 'Nombre visible del instructor' }).click();
    await page.getByRole('textbox', { name: 'Nombre visible del instructor' }).fill('Manuel Ledezma');
    await page.getByTestId('course-save-btn').click();
    await page.waitForLoadState('networkidle'); // ✅ espera la respuesta
  // Navega al listado donde debería aparecer el curso creado
    await page.goto('https://staging.testertestarudo.com/es/teacher/courses');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('K6 Tester')).toBeVisible();
});

test('Admin Send a Bulk Email', async ({ page }) => {
    await page.getByTestId('nav-admin-email').click();
    await page.getByRole('textbox', { name: 'Ej: Novedades de tu curso de' }).click();
    await page.getByRole('textbox', { name: 'Ej: Novedades de tu curso de' }).fill('Noticias QA');
    await page.getByRole('textbox', { name: 'Texto plano o HTML: <p>Hola' }).click();
    await page.getByRole('textbox', { name: 'Texto plano o HTML: <p>Hola' }).fill('Pruebas de Wendy');
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {}); // ✅ accept() = OK = la campaña SÍ se envía
    });
    await page.getByRole('button', { name: '🚀Enviar campaña' }).click();
    await expect(page.getByText('✓ Campaña iniciada — enviando')).toBeVisible({ timeout: 5000 });
});

test('Admin delete a blog', async ({ page }) => {
    await page.getByRole('link', { name: '◇ Gestor Blog' }).click();
    await expect(page.getByRole('row', { name: /E2E Post.*draft/ }).getByRole('button').first()).toBeVisible();
    await page.getByText('☰Servicios▾Todos los').click();
    page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
    });
    await page.getByRole('row', { name: /E2E Post.*draft/ }).getByRole('button').first().click();
});

test('Admin assing course for student', async ({ page }) => {
    await page.getByRole('link', { name: '◈ Profesor' }).click();
    await page.getByRole('link', { name: '👥 Estudiantes 5 inscritos →' }).click();
    await page.getByRole('combobox').selectOption('d8c38b2f-7056-4f7b-bd11-e4b348e21370');
    await page.getByRole('textbox', { name: 'Email del estudiante' }).click();
    await page.getByRole('textbox', { name: 'Email del estudiante' }).fill('naranjotester@yopmail.com');
    await page.getByRole('button', { name: 'Inscribir' }).click();
    await expect(page.getByText('Wendy Moran')).toBeVisible();
    await expect(page.getByText('En progreso')).toBeVisible();
});
});


test.describe("Student - Smoke Test",() => {
    test.beforeEach( async ({page, cookies, menu, loginPage, dashboardPage }) => {
    await page.goto('/');
    await cookies.clickAcceptCookies();
    await menu.clickLoginSection();
    await loginPage.loginUser(users.StudentUser.email, passwords.student);
    await page.waitForURL('https://staging.testertestarudo.com/es/login', { timeout: 15000 }); 
    await dashboardPage.isStudentLogged();
    console.log('✅ Login completado, URL:', page.url());
});

test('Student see enroled course', async ({ page }) => {
  await page.getByTestId('nav-courses').click({ timeout: 30000 });
  await expect(page.getByRole('heading', { name: 'Librerías en Javascript para' })).toBeVisible();
});

test('Student required Capacitations', async ({ page }) => {
    await page.getByRole('button', { name: 'Servicios ▾' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Capacitaciones QA' }).click();
    await page.locator('#hero').getByRole('link', { name: 'Hablar sobre capacitación' }).click();
    await page.getByRole('textbox', { name: 'Nombre completo' }).click();
    await page.getByRole('textbox', { name: 'Nombre completo' }).fill('Wendy Naranjo');
    await page.getByRole('textbox', { name: 'Nombre completo' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email' }).fill('wendytester@yopmail.com');
    await page.getByRole('textbox', { name: 'Email' }).press('Tab');
    await page.getByRole('textbox', { name: 'Empresa u organización (' }).fill('Independiente');
    await page.getByRole('textbox', { name: 'Empresa u organización (' }).press('Tab');
    await page.getByLabel('Selecciona el tema').selectOption('courses');
    await page.getByRole('textbox', { name: 'Cuéntanos cómo podemos' }).click();
    await page.getByRole('textbox', { name: 'Cuéntanos cómo podemos' }).fill('Pruebas de Wendy QA');
    await page.getByRole('checkbox', { name: 'Acepto la Política de' }).check();
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    // No podemos verificar el envío por reCAPTCHA en staging
    //await Promise.all([page.waitForResponse(resp => {console.log('>>>', resp.url(), resp.status());
    //    return resp.status() === 200;     }),
    //page.getByRole('button', { name: 'Enviar mensaje' }).click()          //]);
    //await expect(page.getByText('Tu solicitud fue enviada')).toBeVisible();
});

test('Student buy a new course', async ({ page }) => {
    await page.getByRole('link', { name: '◇ Cursos Disponibles' }).click();
    await page.getByTestId('course-card-automatizacion-pruebas-web-playwright').click();
    await page.getByRole('button', { name: '💳 Comprar — €' }).click();
    await page.getByRole('textbox', { name: 'Tu nombre' }).click();
    await page.getByRole('textbox', { name: 'Tu nombre' }).fill('Wendy Naranjo');
    await page.getByRole('textbox', { name: '12345678A' }).click();
    await page.getByRole('textbox', { name: '12345678A' }).fill('12345678A');
    await page.getByRole('button', { name: 'Pagar 181.50 €' }).click();
    await expect(page.getByRole('button', { name: 'Pagar con Tarjeta' })).toBeVisible();
});

test('Student practice automations sandbox', async ({ page }) => {
    await page.getByRole('button', { name: 'Academy ▾' }).click();
    await page.getByRole('link', { name: 'Sandbox de Pruebas' }).click();
    await page.getByTestId('input-name').fill('Rebecca Naranjo');
    await page.getByTestId('input-email').fill('naranjotester@yopmail.com');
    await page.getByTestId('select-role').selectOption('semi');
    await page.getByTestId('textarea-msg').click();
    await page.getByTestId('textarea-msg').fill('Quiero practicas Playwight');
    await page.getByTestId('checkbox-agree').check();
    await page.getByTestId('btn-submit').click();
    await expect(page.getByTestId('form-result')).toBeVisible();
});

test('Student modify name', async ({ page }) => {
    await page.getByRole('button', { name: 'Dashboard ▾' }).click();
    await page.getByRole('link', { name: 'Perfil' }).click();
    await page.getByRole('heading', { name: 'naranjotester@yopmail.com' }).click();
    await page.getByRole('textbox', { name: 'Tu nombre completo' }).fill('Wendy Moran');
    await page.getByRole('button', { name: 'Guardar cambios' }).click();
});

test('Student Learning path', async ({ page }) => {
    await page.getByRole('button', { name: 'Academy ▾' }).click();
    await page.getByRole('banner').getByRole('link', { name: 'Ruta de Aprendizaje' }).click();
    await page.getByRole('link', { name: 'Hablar con un mentor' }).click();
    await page.getByRole('link', { name: 'Reservar asesoría ahora' }).click();
    await page.getByRole('link', { name: 'Reservar Pack' }).first().click();
});

});