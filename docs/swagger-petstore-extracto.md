# Extracto de un Swagger real — Swagger Petstore

> **Para qué existe este archivo.** En clase se muestra un Swagger de verdad, no una maqueta. Pero
> **no se depende de que el sitio esté vivo**: todo lo que hace falta para dictar el bloque está
> copiado acá, y la Presentación tiene la misma información en pantalla.
>
> **Fuente:** `https://petstore3.swagger.io/api/v3/openapi.json` — la especificación pública que
> mantiene el equipo de Swagger como ejemplo oficial. Es el Swagger más visto del mundo.
> **Descargada y verificada el 2026-08-18.** `openapi: 3.0.4` · `info.title: "Swagger Petstore -
> OpenAPI 3.0"` · `info.version: 1.0.27` · `servers: [{ url: "/api/v3" }]`.
>
> **Interfaz para mostrarla renderizada:** `https://petstore3.swagger.io/`

---

## 1. Qué es un Swagger, en una línea

**Swagger / OpenAPI es el contrato de una API escrito en un formato que las máquinas también
entienden.** No es una herramienta de testing ni un programa: es un archivo —`openapi.json` o
`openapi.yaml`— que declara qué endpoints existen, qué recibe cada uno, qué devuelve y con qué
códigos. Swagger UI es la página web que dibuja ese archivo para que lo leas sin abrir el JSON.

- **OpenAPI** es el estándar (el formato del archivo).
- **Swagger** es la familia de herramientas que lo escribe y lo dibuja.
- En un equipo lo escribe y lo mantiene **desarrollo**. QA lo **consume**.

Cuando alguien en una entrevista te pregunta *"¿trabajaste con contratos de API?"*, esto es lo que
está preguntando.

---

## 2. Qué se ve al abrirlo (lo que proyecta la docente)

En `https://petstore3.swagger.io/` la página abre con una lista de operaciones agrupadas por
etiqueta. Cada fila es un endpoint, con su método a la izquierda en color:

```text
pet    Everything about your Pets
  POST    /pet                    Add a new pet to the store
  PUT     /pet                    Update an existing pet
  GET     /pet/findByStatus       Finds Pets by status
  GET     /pet/findByTags         Finds Pets by tags
  GET     /pet/{petId}            Find pet by ID
  POST    /pet/{petId}            Updates a pet in the store with form data
  DELETE  /pet/{petId}            Deletes a pet
  POST    /pet/{petId}/uploadImage  uploads an image

store  Access to Petstore orders
  GET     /store/inventory        Returns pet inventories by status
  POST    /store/order            Place an order for a pet
  GET     /store/order/{orderId}  Find purchase order by ID
  DELETE  /store/order/{orderId}  Delete purchase order by ID

user   Operations about user
  POST    /user                   Create user
  GET     /user/login             Logs user into the system
  GET     /user/logout            Logs out current logged in user session
  GET     /user/{username}        Get user by user name
```

**Lo primero que ve un QA acá:** `/pet` y `/pet/{petId}` aparecen **varias veces con métodos
distintos**. Es exactamente lo que dijimos en el bloque 2: un endpoint se identifica con **URL +
método**, no con la URL sola. `POST /pet` y `PUT /pet` son dos funcionalidades diferentes con reglas
diferentes.

Al hacer clic en una operación se despliega su ficha: parámetros, cuerpo esperado, y **la lista de
códigos de respuesta con su descripción**. Eso es lo que se lee abajo.

---

## 3. La operación completa, tal como está en el archivo

`GET /pet/{petId}` — *Find pet by ID*, recortada del `openapi.json` real:

```yaml
/pet/{petId}:
  get:
    tags: [pet]
    summary: Find pet by ID.
    description: Returns a single pet.
    operationId: getPetById
    parameters:
      - name: petId
        in: path
        description: ID of pet to return
        required: true
        schema:
          type: integer
          format: int64
    responses:
      '200':
        description: successful operation
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Pet'
      '400':
        description: Invalid ID supplied
      '404':
        description: Pet not found
      default:
        description: Unexpected error
    security:
      - api_key: []
      - petstore_auth: [write:pets, read:pets]
```

Y el **schema** al que apunta ese `$ref`, que es el molde del dato que viaja:

```yaml
Pet:
  required: [name, photoUrls]
  type: object
  properties:
    id:         { type: integer, format: int64, example: 10 }
    name:       { type: string, example: doggie }
    category:   { $ref: '#/components/schemas/Category' }
    photoUrls:  { type: array, items: { type: string } }
    tags:       { type: array, items: { $ref: '#/components/schemas/Tag' } }
    status:
      type: string
      description: pet status in the store
      enum: [available, pending, sold]
```

---

## 4. Cómo se lee, campo por campo

| Lo que ves | Cómo se llama | Qué le dice a un QA |
|---|---|---|
| `/pet/{petId}` | la **ruta**, con un parámetro entre llaves | `{petId}` se reemplaza por un valor real: `/pet/10` |
| `get:` | el **método** | la misma ruta con `post` o `delete` es **otro endpoint** |
| `summary` / `description` | la intención declarada | contra esto se compara lo que hace de verdad |
| `parameters` → `in: path`, `required: true` | los **parámetros** | qué es obligatorio y dónde viaja: ruta, query o header |
| `type: integer, format: int64` | el **tipo** | acá nacen los casos de borde: ¿y si mando texto? ¿y si mando negativo? |
| `responses` | los **códigos de respuesta** | los casos de prueba ya están listados: `200`, `400`, `404` |
| `$ref: Pet` | el **schema** | el molde del JSON: qué campos vienen y de qué tipo |
| `required: [name, photoUrls]` | los **obligatorios del schema** | dos casos negativos servidos: falta `name`, falta `photoUrls` |
| `enum: [available, pending, sold]` | los **valores permitidos** | tres casos válidos y todos los demás inválidos |
| `security: api_key` | la **autenticación declarada** | dice que hace falta una credencial para llamarlo |

**La lectura que cambia el trabajo:** un Swagger no es documentación para leer una vez. Es una
**lista de casos de prueba a medio escribir**. Cada código de respuesta es un caso. Cada campo
`required` es un caso negativo. Cada `enum` es una partición de equivalencia con sus valores
inválidos afuera.

---

## 5. Qué NO te dice un Swagger

Esto es lo que separa a alguien que "sabe leer un Swagger" de alguien que sabe **usarlo como QA**.

| No te dice | Por qué importa |
|---|---|
| **Si el producto cumple** | El archivo es una declaración de intenciones. Que diga `404` no significa que devuelva `404`. |
| **Si está actualizado** | Lo genera desarrollo, a veces a mano. Un endpoint puede haber cambiado ayer y el archivo seguir igual. |
| **Las reglas de negocio** | Declara formatos y códigos. No dice *"no puedes inscribirte sin el prerequisito"*. Eso vive en los requerimientos, no en el schema. |
| **Qué endpoints existen y no están declarados** | Solo muestra lo que alguien escribió. La pestaña Network muestra lo que hay. |
| **Cuál es el caso importante** | Lista veinte operaciones sin decir cuál se rompe siempre ni cuál le duele al negocio. Eso lo pones tú, y es C7. |

### La prueba ejecutada — verificada el 2026-08-18

El Swagger de Petstore declara para `GET /pet/{petId}`: `security: api_key` y los códigos `200`,
`400`, `404`. Tres comandos, tres resultados:

```bash
# 1 · Pide una mascota que existe, SIN api_key.
#     El contrato declara que este endpoint está protegido por api_key.
curl -s -o /dev/null -w "HTTP %{http_code}\n" https://petstore3.swagger.io/api/v3/pet/1
# HTTP 200
```

> El contrato declara autenticación y el servidor responde igual sin ella. **Discrepancia.**

```bash
# 2 · Pide una mascota que no existe.
#     El contrato promete 404 "Pet not found".
curl -s -w "\nHTTP %{http_code}\n" https://petstore3.swagger.io/api/v3/pet/999999
# {"code":500,"message":"There was an error processing your request. It has been logged (ID: ...)"}
# HTTP 500
```

> El contrato promete `404` y el servidor devuelve `500`. **Discrepancia, y de las caras:** un `4xx`
> le dice al cliente *"pediste algo que no existe"*; un `5xx` le dice *"me rompí"*. Son dos tickets
> distintos, y pueden requerir responsables o prioridades diferentes según cómo esté organizado el
> equipo.

```bash
# 3 · Pide una mascota con un id que no es un número.
#     El contrato promete 400 "Invalid ID supplied".
curl -s -w "\nHTTP %{http_code}\n" https://petstore3.swagger.io/api/v3/pet/abc
# {"code":400,"message":"Input error: couldn't convert `abc` to type `class java.lang.Long`"}
# HTTP 400
```

> Coincide. Y las coincidencias valen igual que las discrepancias: son las que te permiten decir
> *"esto sí cumple lo documentado"* sin que sea una impresión.

**El remate del bloque, y conviene decirlo con todas las letras:** este es el Swagger de ejemplo más
famoso del mundo, el que Swagger publica para enseñar cómo se escribe un contrato. **Y su producto no
cumple dos de las tres cosas que declara.** No porque esté mal hecho: porque un contrato es una
promesa y las promesas se verifican. Ese es, literalmente, el trabajo.

---

## 6. Si el sitio no responde el día de la clase

Nada de esto se cae:

1. La Presentación tiene la lista de operaciones, la ficha de `GET /pet/{petId}`, el schema `Pet` y
   los tres resultados ejecutados.
2. Este archivo tiene el extracto completo del `openapi.json` real, con fecha de descarga.
3. Se dice en voz alta que la evidencia está capturada y con qué comando se obtuvo. **Marcar una
   observación como heredada es una respuesta profesional; presentarla como propia, no.**

**Antes de dictar:** volver a correr los tres comandos de la sección 5. Si alguno cambió, se actualiza
el resultado acá y se cuenta en clase — que un producto cambie entre dos fechas es exactamente lo que
esta clase enseña a registrar.
