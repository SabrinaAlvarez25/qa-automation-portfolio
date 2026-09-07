# Selectores y locators — procedimiento y decisiones

Un **selector CSS** es un texto que busca un elemento por datos de su HTML. Un **locator** es una
instrucción que Playwright usa para encontrar un elemento cuando realiza una acción o comprobación.

> **La primera mitad es el procedimiento de S3**: no se llena, se usa. Lo vas a reabrir cada vez que
> automatices una pantalla nueva.
>
> **La segunda mitad, a partir de "Refinamiento de S4", sí se completa** — y es la primera vez en la
> ruta que registras algo. La diferencia importa: en S3 registrar habría sido anotar una opinión
> basada solo en una mirada; hoy vas a registrar **el resultado de una ejecución**. Eso sí se defiende.

## El ciclo, en tres movimientos

1. **Copias el HTML del elemento** — en DevTools: clic derecho sobre el nodo → Copy → **Copy outerHTML**.
2. **Pegas la instrucción de abajo + ese HTML** en la IA, en un solo mensaje.
3. **Compruebas cada propuesta en DevTools** antes de aceptar ninguna.

El paso 3 no se delega: tú decides si el resultado corresponde al elemento real de la pantalla.

## La instrucción

```text
Analiza únicamente el outerHTML que te entrego. No modifiques archivos.

Objetivo: proponer hasta tres selectores CSS para encontrar este elemento.

Para cada opción:
1. escribe el selector literal;
2. señala qué atributo o texto del HTML utilizaste;
3. explica un posible riesgo de estabilidad;
4. indica cómo puedo comprobarlo en DevTools.

Usa solamente atributos o texto presentes en el HTML. No escribas el test completo.
Detente para que yo valide las propuestas en el DOM real.

outerHTML:
[PEGAR AQUÍ]
```

### Por qué esas frases y no otras

| Frase | Qué hace |
|---|---|
| *“Analiza únicamente el outerHTML que te entrego”* | Le acota la fuente. Sin eso propone lo que suele haber en un login, no lo que tienes delante |
| *“Usa solamente atributos o texto presentes en el HTML”* | La misma idea al revés: que no invente un `data-testid` que no existe |
| *“Detente para que yo valide”* | El gate. Sin esa frase, una herramienta con permisos podría escribir el test antes de tu revisión |
| *“Indica cómo puedo comprobarlo en DevTools”* | Te da **la forma de verificarlo**, no una promesa de que está bien |

## Cómo compruebas una propuesta

En DevTools, pestaña **Elements**, `Ctrl+F` o `Cmd+F`, pegas el selector. Miras **dos cosas**:

1. **¿Cuántas coincidencias?**
2. **¿El elemento resaltado es el que querías?**

Un número solo no es una comprobación. `1` puede ser un elemento equivocado.

## Qué hacer con lo que te devuelve

- **Si te da una recomendación o dice que una opción es “la más robusta”:** léela como una opinión.
  No se lo pediste, y la estabilidad no se puede demostrar mirando un HTML — depende de si el equipo
  se compromete a mantener ese atributo.
- **Si una propuesta no dice de qué atributo salió:** no la compruebes. Ya sabes qué hacer con ella.
- **Si te propone comprobar con `document.querySelector` en la Console:** es válido, hace lo mismo.
  La búsqueda de Elements resalta el elemento en la página, así ves cantidad **e** identidad de una.
- **Si empieza a escribir el test:** se salió del alcance. Pídele que vuelva y se detenga.

## Antes de pegar nada en una IA

Revisa que el fragmento no lleve datos privados, tokens ni credenciales reales. En este playground
son de demostración. En tu empresa esto se revisa siempre, sin excepción.

## Cómo leer una etiqueta y un atributo del HTML

Ejemplo:

```html
<a href="/registro">Regístrate</a>
```

- `a` es la etiqueta HTML que crea un enlace.
- `href` es el atributo que indica a qué dirección lleva el enlace.
- `/registro` es el valor de ese atributo.

Este selector:

```css
a[href="/registro"]
```

se lee: «busca una etiqueta `a` cuyo atributo `href` sea exactamente `/registro`». Si DevTools
resalta “Regístrate”, di **enlace**, no botón.

## De qué depende cada tipo de selector

No hay un ganador universal. Lo que se rompe no es el selector: es aquello de lo que depende.

| Forma | De qué depende | Se rompe cuando |
|---|---|---|
| `#email` | de un `id` | alguien lo renombra en un refactor |
| `[data-testid="…"]` | de un **acuerdo del equipo** | nadie se comprometió a mantenerlo |
| `[type="email"]` | del tipo del campo | aparece un segundo campo del mismo tipo |
| `.clase-visual` | de la apariencia | hay un rediseño |
| `form div > input` | de la estructura | alguien agrega un contenedor |

Y un aviso que te va a ahorrar una mañana: **el mismo `id` puede existir en otra página.** `#email`
no identifica *el email del login*: identifica *el email de la página que esté abierta*.

---

# Refinamiento de S4

Hoy le sumamos a lo anterior funciones de Playwright como `getByLabel` y `getByRole`. Por ejemplo,
`getByLabel('Email')` busca el campo asociado a la etiqueta Email, y
`getByRole('button', { name: 'Iniciar sesión' })` busca el botón con ese nombre.

## LEES · Instrucción de refinamiento

```text
Para cada selector CSS ya comprobado, propone un locator de Playwright que represente cómo una
persona reconoce el elemento. Usa solo información observable en el HTML entregado. Señala qué
condición podría hacer fallar tu propuesta. No modifiques archivos y detente para que yo valide.

Ejemplo del formato esperado: para un campo con la etiqueta visible Email, una propuesta puede ser
page.getByLabel('Email'). Explica siempre qué texto, etiqueta o rol del HTML respalda la propuesta.
```

Comparada con la instrucción de S3 cambió una cosa y se agregó otra:

- **Cambió el criterio:** ya no pedimos "cómo está construido" sino "cómo lo reconoce una persona".
- **Se agregó:** *"señala qué condición podría hacer fallar tu propuesta"*. No le pedimos que nos diga
  que su respuesta es buena, sino **cuándo dejaría de serlo**.

## ESCRIBES · Comparación CSS ↔ locator

> **Por qué aquí sí se escribe y en S3 no.** La columna que manda es **Evidencia ejecutable**: lo que
> devolvió `npm test`. Un locator sin ejecutar sigue siendo una propuesta, y una propuesta no se
> registra.

| Elemento | Selector CSS | Locator de Playwright propuesto | Evidencia ejecutable | Decisión y límite |
|---|---|---|---|---|
| Campo email | | | | |
| Campo contraseña | | | | |
| Botón Iniciar sesión | | | | |
| Caso donde conservamos CSS o test id (opcional) | | No aplica | | |

La última fila es opcional. Complétala solo si encuentras un caso real donde el elemento no tiene una
señal que la persona perciba —por ejemplo, un contenedor sin nombre visible— o donde el equipo mantiene
un atributo para pruebas. **No inventes un caso ni una ejecución para llenar la fila.**

## ESCRIBES · Elemento nuevo pedido a la IA, verificado ejecutando

> Elige un elemento que **no** esté arriba. Pídele a la IA **un** locator con la instrucción de
> refinamiento, pégalo en la única línea marcada de `tests/comprobar-propuesta-ia.spec.ts` y ejecuta:
>
> ```bash
> npm test -- tests/comprobar-propuesta-ia.spec.ts
> ```

| Elemento | Locator propuesto por la IA | Condición de fallo que ella señaló | Resultado de la ejecución | Decisión |
|---|---|---|---|---|
| Título de la página | | | `1 passed` / `Expected: 1` `Received: …` | |

**Gate:** no es "¿la IA acertó?". Es **puedo decir de dónde salió cada cosa**: qué propuso, qué
condición de fallo declaró y qué devolvió el comando. Un locator no es un test: la IA no escribió ni
una línea de ese archivo.

## Cierre de S4

- [ ] Las tres filas obligatorias tienen su CSS y su locator de Playwright al lado.
- [ ] Cada locator fue **ejecutado**, no solo leído.
- [ ] Si encontré un caso real para conservar CSS o test id, completé la fila opcional con su razón.

## Pregunta abierta para S5

Ya tienes locators que encuentran el elemento correcto. ¿Qué falta para que eso sea una **prueba**?
Encontrar un elemento no es todavía comprobar que la aplicación hace lo que promete.

## Preparación para S5

Completa esta sección siguiendo `Tarea-S5-Consigna.md`:

1. ¿Qué línea abre la página?
La línea `await page.goto(LOGIN_URL);` abre la página.
2. ¿Qué tres locators se crean?
Se crean tres locators: `email`, `password` y `submit`.
3. ¿Qué se comprueba primero: cantidad o visibilidad?
Primero se comprueba la cantidad y después la visibilidad.

4. ¿Qué palabra se repite antes de las acciones y comprobaciones?
La palabra que se repite es `await`.

> Creo que `await` sirve para esperar a que acción termine antes de continuar. En S5 lo comprobaremos ejecutando el código.

