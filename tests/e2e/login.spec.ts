
import { test, expect } from '../fixtures';

// Caso C01 · Ítem L1 · REQ-L04
// Login con credenciales válidas muestra el mensaje de bienvenida.
// Fuente: docs/revision-login.md

test('C01 · L1 · REQ-L04: Login válido muestra mensaje de bienvenida', async ({ loginPage }) => {
  // ACTUAR
  await loginPage.login('ana.garcia@ejemplo.com', 'Segura2026!');

  // VERIFICAR
  await expect(loginPage.saludo).toBeVisible();
  await expect(loginPage.page.getByText('Has iniciado sesión correctamente.')).toBeVisible();
});

// Casos C02 a C05 · los cuatro negativos del login.

const negativos = [
  {
    caso: 'C02',
    req: 'REQ-L02',
    titulo: 'Login con contraseña incorrecta muestra mensaje de error',
    email: 'ana.garcia@ejemplo.com',
    contrasena: 'clave_incorrecta',
  },
  {
    caso: 'C03',
    req: 'REQ-L02',
    titulo: 'Login con email no registrado muestra mensaje de error',
    email: 'noexiste@ejemplo.com',
    contrasena: 'Segura2026!',
  },
  {
    caso: 'C04',
    req: 'REQ-L01',
    titulo: 'Login con email vacío muestra mensaje de error',
    email: '',
    contrasena: 'Segura2026!',
  },
  {
    caso: 'C05',
    req: 'REQ-L01',
    titulo: 'Login con contraseña vacía muestra error y mantiene el formulario',
    email: 'ana.garcia@ejemplo.com',
    contrasena: '',
  },
];

for (const fila of negativos) {
  test(`${fila.caso} · ${fila.req}: ${fila.titulo}`, async ({ loginPage }) => {
    // ACTUAR
    await loginPage.login(fila.email, fila.contrasena);

    // VERIFICAR
    await expect(loginPage.mensajeError).toBeVisible();
    await expect(loginPage.saludo).not.toBeVisible();
    await expect(loginPage.botonIniciarSesion).toBeVisible();
  });
}