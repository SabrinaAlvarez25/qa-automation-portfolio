# recursos-s16 — el `api-agent` y el flujo integrado

**Para la clase, para quien faltó o se trabó, y para comparar lo tuyo con lo de clase.**

## Qué trae

```text
recursos-s16/
├── .agents/
│   ├── skills/generar-tests-api/SKILL.md    la octava skill: genera y verifica, en dos fases
│   └── workflows/api-agent.md               el segundo workflow: /api-agent
├── entrada-para-agents-md.md                el pedido y los DOS bloques para tu agents.md
├── entrada-para-contrato-api.md             el pedido y los CUATRO bloques para tu contrato
├── contrato-api.SEMILLA.md                  el contrato entero · SOLO si no tienes ninguno
├── pages/estudiantes.page.ts                la pantalla /estudiantes: locators y goto(), sin aserciones
├── services/estudiantes.service.ts          GET /api/students: listar(pagina, tamano), sin aserciones
├── tests/integrado/estudiantes-consistencia.spec.ts   el flujo integrado: 1 verde y 2 rojos de paginación, SIN marcar
├── referencia/courses.api.spec.ts           referencia verificada para GET /api/courses · NO la generó el agente
├── plan-b-skill/api-agent/SKILL.md          el mismo agente como skill, si /api-agent no aparece
└── LEEME.md
```

**No hay `agents.md`, ni `rules/`, ni una carpeta `docs/`.** Son tuyos: `agents.md` desde C7,
`criterio-qa.md` con la semilla en C7 y completo en C8, y las §4 y §5 del contrato las escribiste tú. Lo de hoy viaja en los dos
archivos `entrada-para-…`, que **solo agregan**.

## Cómo copiarlo, con guarda

Desde la raíz de `qa-automation-portfolio`, archivo por archivo, como en C9, C11, C13, C14 y C15.
Nunca `cp -R` de una carpeta `.agents`. `[ -f … ] || cp …` se lee: *si el archivo ya está, no hagas
nada; si no está, cópialo*.

```bash
mkdir -p .agents/skills/generar-tests-api .agents/workflows pages services tests/integrado reports
[ -f .agents/skills/generar-tests-api/SKILL.md ] || cp recursos-s16/.agents/skills/generar-tests-api/SKILL.md .agents/skills/generar-tests-api/
[ -f .agents/workflows/api-agent.md ] || cp recursos-s16/.agents/workflows/api-agent.md .agents/workflows/
[ -f pages/estudiantes.page.ts ] || cp recursos-s16/pages/estudiantes.page.ts pages/
[ -f services/estudiantes.service.ts ] || cp recursos-s16/services/estudiantes.service.ts services/
[ -f tests/integrado/estudiantes-consistencia.spec.ts ] || cp recursos-s16/tests/integrado/estudiantes-consistencia.spec.ts tests/integrado/

ls -a .agents/skills .agents/workflows
```

Tiene que quedar así: **ocho skills** (`priorizar-automatizacion`, `derivar-casos-de-hu`,
`revisar-con-rubrica`, `diagnosticar-fallo-playwright`, `crear-fixture-playwright`, `generar-pom`, `reportar-bug`, `generar-tests-api`) y **dos
workflows** (`pom-agent.md`, `api-agent.md`).

## Las fixtures `estudiantes` y `estudiantesPage`: tres cambios a mano

`tests/fixtures.ts` es tuyo desde C13, y en C14 y C15 le agregaste `registroPage` y `cursos`. Por eso
**no viaja en el paquete**: una copia lo pisaría. Los mismos tres cambios que en C14 y C15, ahora con
dos fixtures, sin borrar nada de lo que ya tiene:

1. Los dos imports, junto a los otros:

```typescript
import { EstudiantesPage } from '../pages/estudiantes.page';
import { EstudiantesService } from '../services/estudiantes.service';
```

2. En la línea del `base.extend<{ … }>`, dos nombres más al final de la lista. Con lo de C14 y C15
   queda así:

```typescript
export const test = base.extend<{ loginPage: LoginPage; registroPage: RegistroPage; cursos: CursosService; estudiantesPage: EstudiantesPage; estudiantes: EstudiantesService }>({
```

3. Los dos bloques, debajo de `cursos`:

```typescript
  estudiantesPage: async ({ page }, use) => {
    await use(new EstudiantesPage(page));
  },
  estudiantes: async ({ request }, use) => {
    await use(new EstudiantesService(request));
  },
```

`estudiantes` es el Service Object, para la API, como `cursos`. `estudiantesPage` es el Page Object,
para la pantalla. A diferencia de `loginPage`, `estudiantesPage` **no navega**: el test abre la
pantalla con `estudiantesPage.goto()` **después** de preguntarle a la API. Ese orden es el test.

`git diff --stat -- tests/fixtures.ts` → `9 insertions(+), 1 deletion(-)`. La única línea borrada es
la del `base.extend<…>`, que se reescribe con dos nombres más. Si sale más de una, algo se borró.

## El registro y el contrato

Los pedidos de una línea de `entrada-para-agents-md.md` y de
`entrada-para-contrato-api.md`. Los dos se comprueban con `git diff --stat`: solo `insertions(+)`.

**Si `/api-agent` no aparece en el chat:** recarga la ventana del editor. Si sigue sin aparecer:

```bash
mkdir -p .agents/skills/api-agent
[ -f .agents/skills/api-agent/SKILL.md ] || cp recursos-s16/plan-b-skill/api-agent/SKILL.md .agents/skills/api-agent/
```

## Si te falta algo de antes

Con guarda, cada cosa desde la clase donde nació:

```bash
mkdir -p .agents/skills/priorizar-automatizacion .agents/skills/derivar-casos-de-hu .agents/skills/revisar-con-rubrica .agents/skills/diagnosticar-fallo-playwright .agents/skills/crear-fixture-playwright .agents/skills/generar-pom .agents/skills/reportar-bug .agents/workflows services tests/api
[ -f .agents/skills/priorizar-automatizacion/SKILL.md ] || cp recursos-s7/.agents/skills/priorizar-automatizacion/SKILL.md .agents/skills/priorizar-automatizacion/
[ -f .agents/skills/derivar-casos-de-hu/SKILL.md ] || cp recursos-s8/derivar-casos-de-hu.SKILL.md .agents/skills/derivar-casos-de-hu/SKILL.md
[ -f .agents/skills/revisar-con-rubrica/SKILL.md ] || cp recursos-s9/.agents/skills/revisar-con-rubrica/SKILL.md .agents/skills/revisar-con-rubrica/
[ -f .agents/skills/diagnosticar-fallo-playwright/SKILL.md ] || cp recursos-s11/.agents/skills/diagnosticar-fallo-playwright/SKILL.md .agents/skills/diagnosticar-fallo-playwright/
[ -f .agents/skills/crear-fixture-playwright/SKILL.md ] || cp recursos-s13/.agents/skills/crear-fixture-playwright/SKILL.md .agents/skills/crear-fixture-playwright/
[ -f .agents/skills/generar-pom/SKILL.md ] || cp recursos-s14/.agents/skills/generar-pom/SKILL.md .agents/skills/generar-pom/
[ -f .agents/skills/reportar-bug/SKILL.md ] || cp recursos-s15/.agents/skills/reportar-bug/SKILL.md .agents/skills/reportar-bug/
[ -f .agents/workflows/pom-agent.md ] || cp recursos-s14/.agents/workflows/pom-agent.md .agents/workflows/
[ -f services/cursos.service.ts ] || cp recursos-s15/services/cursos.service.ts services/
[ -f tests/fixtures.ts ] || cp recursos-s15/tests/fixtures.ts tests/
[ -f tests/api/enroll.api.spec.ts ] || cp recursos-s15/tests/api/enroll.api.spec.ts tests/api/
```

Si acabas de copiar el `fixtures.ts` de `recursos-s15/`, ese trae `loginPage` y `cursos`, sin
`registroPage`. Le haces igual los tres cambios de arriba; en el segundo, la lista queda
`{ loginPage: LoginPage; cursos: CursosService; estudiantesPage: EstudiantesPage; estudiantes: EstudiantesService }`.

Si no tienes `agents.md` ni `criterio-qa.md`, están en `recursos-s8/recuperacion-c7/`, también con
guarda (`recursos-s9/LEEME.md`). Y si no tienes contrato: `cp recursos-s16/contrato-api.SEMILLA.md
docs/contrato-api.md` (solo si no existe).

## Lo que tiene que dar

El test integrado viene **sin** los dos `test.fail()`, a propósito. Córrelo, mira los dos rojos, lee
su evidencia y recién ahí márcalos con `test.fail()`.

```bash
npx playwright test tests/integrado
```

Primero: `1 passed · 2 failed`. Los dos rojos son los de paginación:

```text
✘ REQ-N01 · REQ-N03 · la página devuelve exactamente pageSize registros
    Expected length: 10   ·   Received length: 11
✘ REQ-N02 · ningún estudiante queda inalcanzable
    Expected: 3   ·   Received: 2
```

Su evidencia está en `Materiales-S16.md` §6: los dos `curl` y la pantalla, con Karen Ávila en las
páginas 1 y 2. Con `test.fail()` el runner ya no guarda el trace: **se lee antes de marcar**.

Recién entonces, primera línea adentro de cada test, con **tu** fecha en lugar de `[fecha]`:

```typescript
  test.fail(); // BUG-STUDENTS-01, visto el [fecha]: la página 1 trae 11 registros y el id 11 se repite en la 2.
```

```typescript
  test.fail(); // BUG-STUDENTS-02, visto el [fecha]: totalPages 2 con 25 estudiantes; la cuenta da 3.
```

La primera va en el test de REQ-N01 · REQ-N03; la segunda, en el de REQ-N02. Otra vez:

```bash
npx playwright test tests/integrado
```

`3 passed`, con dos cruces. Si alguno de los dos rojos se pone verde, **el producto cambió**: no se
toca el test, se avisa.

## La referencia de `GET /api/courses`

`referencia/courses.api.spec.ts` **no la generó el agente**: es lo que un candidato correcto debería
parecerse, verificado el 2/11/2026. Se usa en el gate del bloque 6 y como plan B si el agente no
responde. Necesita el método `listar()` en `services/cursos.service.ts` (está en el comentario de
arriba del archivo). Corrida: el test de §3 pasa; el de REQ-C04 falla (`Expected: 5 · Received: 6`). Viene
**sin** `test.fail()`: lo marcas tú, después de leerlo, con la fecha del día.
