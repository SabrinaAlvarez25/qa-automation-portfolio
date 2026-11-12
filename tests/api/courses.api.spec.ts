// REFERENCIA VERIFICADA · no la generó el agente.
// Es lo que un candidato correcto para GET /api/courses tendría que parecerse, corrido el 2/11/2026:
// el primero pasa; el de REQ-C04 falla (Expected 5 · Received 6). Viene SIN test.fail(): lo marca la QA, después de leerlo.
// Sirve para el gate del bloque 6 y como plan B si el agente no responde. Necesita en
// services/cursos.service.ts el método:
//
//   async listar() {
//     return this.request.get('/api/courses');
//   }

import { test, expect } from '../fixtures';

// GET /api/courses · docs/contrato-api.md §3.
// §3: «Status esperado 200» · «Campos de cada curso: id, title, description, level, duration,
//      prerequisiteId, maxStudents, enrolled, icon» · REQ-C04 (regla asociada).
// No se cubre «¿Necesita sesión?»: §3 dice «el documento no lo dice».

test('§3 · REQ-C01 · el catálogo devuelve 200 y cada curso trae los campos del contrato', async ({ cursos }) => {
  const respuesta = await cursos.listar();

  // §3: «Status esperado | 200»
  expect(respuesta.status()).toBe(200);
  const cuerpo = await respuesta.json();

  // §3: «Campos de cada curso: id, title, description, level, duration, prerequisiteId, maxStudents, enrolled, icon»
  for (const curso of cuerpo.courses) {
    for (const campo of ['id', 'title', 'description', 'level', 'duration', 'prerequisiteId', 'maxStudents', 'enrolled', 'icon']) {
      expect(curso).toHaveProperty(campo);
    }
  }
});

test('§3 · REQ-C04 · inscribirse reduce en 1 los cupos disponibles', async ({ cursos }) => {
  test.fail(); // BUG-COURSES-01, visto el 12/11/2026: después de inscribirse, los cupos de fundamentos siguen igual (Expected 5 · Received 6).
  const cupos = async () => {
    const cuerpo = await (await cursos.listar()).json();
    const curso = cuerpo.courses.find((c: { id: string }) => c.id === 'fundamentos');
    return curso.maxStudents - curso.enrolled;
  };

  const antes = await cupos();
  const inscripcion = await cursos.inscribir('fundamentos');
  expect(inscripcion.status()).toBe(200);

  // REQ-C04: «Al inscribirse exitosamente, el número de cupos disponibles debe reducirse en 1.»
  expect(await cupos()).toBe(antes - 1);
});
