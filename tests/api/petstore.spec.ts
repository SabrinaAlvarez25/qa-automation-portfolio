import { test, expect } from '@playwright/test';

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe('API Testing - Swagger Petstore', () => {
  const uniquePetId = Date.now();
  const testPet = {
    id: uniquePetId,
    name: 'Apollo',
    category: {
      id: 1,
      name: 'Dogs',
    },
    photoUrls: ['https://example.com/apollo.png'],
    tags: [{ id: 1, name: 'qa-portfolio' }],
    status: 'available',
  };

  test('GET /pet/findByStatus - filtrar mascotas por estado', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus`, {
      params: { status: 'available' },
    });

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    const firstPet = body[0];
    expect(firstPet).toHaveProperty('id');
    expect(firstPet).toHaveProperty('status', 'available');
  });

  test('POST /pet - crear una nueva mascota', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/pet`, {
      data: testPet,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(testPet.id);
    expect(body.name).toBe(testPet.name);
    expect(body.status).toBe('available');
  });

  test('GET /pet/{petId} - consultar la mascota creada por ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/${testPet.id}`);

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(testPet.id);
    expect(body.name).toBe(testPet.name);
  });

  test('GET /pet/{petId} - error 404 al consultar una mascota inexistente', async ({ request }) => {
    const nonExistentId = 99999999999999;
    const response = await request.get(`${BASE_URL}/pet/${nonExistentId}`);

    expect(response.status()).toBe(404);
  });

  test('DELETE /pet/{petId} - eliminar la mascota creada', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/pet/${testPet.id}`);

    expect(response.status()).toBe(200);

    // Confirmar que ya no existe (404)
    const verifyResponse = await request.get(`${BASE_URL}/pet/${testPet.id}`);
    expect(verifyResponse.status()).toBe(404);
  });
});
