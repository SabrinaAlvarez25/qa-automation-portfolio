

# Solicitud QA con evidencia

## FUENTE

Como usuario registrado,
quiero iniciar sesión con email y contraseña
para acceder a mi panel.

### Criterios de aceptación disponibles

1. Con credenciales válidas, el usuario accede al panel.
2. Con contraseña incorrecta, se muestra "Credenciales inválidas".
3. Después de 5 intentos incorrectos consecutivos, la cuenta se bloquea durante 15 minutos.
4. Mientras dure el bloqueo, se muestra el tiempo restante.

## OBJETIVO

Analizar la historia y sus criterios de aceptación para identificar afirmaciones y casos de prueba que estén respaldados por la fuente, diferenciando claramente lo que está definido de lo que no está definido.

## CONTEXTO

* Producto o funcionalidad: Inicio de sesión.
* Usuario o rol: Usuario registrado.
* Alcance incluido: Inicio de sesión con email y contraseña, credenciales válidas, contraseña incorrecta y comportamiento de bloqueo después de 5 intentos incorrectos consecutivos.
* Fuera de alcance: Cualquier comportamiento o regla que no esté definido en la fuente.
* Restricciones conocidas: No inventar reglas ni completar información que no esté definida en la fuente.

## SALIDA

Presenta una tabla con las siguientes columnas:

| Fuente | Afirmación o caso | Decisión | Justificación |
| ------ | ----------------- | -------- | ------------- |

La columna **Fuente** debe aparecer primero.

Para cada resultado, indica exactamente qué criterio de aceptación lo respalda.

## LÍMITES Y GATE

* No presentes como hecho nada que no aparezca en la FUENTE.
* Si algo no tiene respaldo en la FUENTE, escribe `SIN FUENTE`.
* Si haces una inferencia, etiquétala como `INFERENCIA`.
* Indica qué parte de la FUENTE respalda cada resultado.
* Si un criterio define un límite numérico, diseña casos de valor límite; no repitas el criterio.
* No tomes decisiones de alcance por mí: propón y espera mi validación.
