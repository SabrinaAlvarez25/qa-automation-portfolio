# Revisión — Login

| | |
|---|---|
| **Archivo juzgado** | `docs/casos_prueba_login.md` |
| **Fuente** | `docs/HU-login.md` (HU-LOG-01 — Inicio de sesión, CA1–CA4) |
| **Reglas aplicadas** | `.agents/rules/criterio-qa.md` |
| **Fecha** | 2026-09-24 |

---

## 1. PUNTAJES

| Dimensión | Puntaje | En qué se apoya |
|---|---|---|
| **D1 · Trazabilidad** | **3** | Las 8 piezas citan criterio de aceptación (CA1–CA4), requerimiento (REQ-L01–REQ-L04) y un fragmento textual que aparece literal en la historia entregada. Cada fuente citada existe y es localizable en `docs/HU-login.md`. |
| **D2 · Cobertura** | **2** | Los cuatro criterios (CA1–CA4) tienen al menos una pieza. Hay negativos (piezas 2, 3) y bordes (piezas 4, 5, 6). Sin embargo, quedan huecos rastreables en el conjunto — ver «QUÉ FALTA». |
| **D3 · Claridad ejecutable** | **2** | Las piezas 1–6 tienen datos concretos. Sin embargo, varias piezas dejan el resultado esperado a interpretación — ver hallazgos. |
| **D4 · Honestidad** | **3** | Las piezas 1, 2, 3 marcan `POR CONFIRMAR` con referencia a su pregunta abierta (P1, P2, P3) donde la fuente no fija el texto. Las piezas 7 y 8 marcan `POR CONFIRMAR (P3)`. Hay tres preguntas abiertas declaradas y cada una cita lo que la fuente no resuelve. No se afirma ningún resultado que la fuente no respalde. |

**Total: 10 / 12**

---

## 2. HALLAZGOS

| # | Pieza citada | Dimensión | Qué encontré | Por qué importa |
|---|---|---|---|---|
| H01 | Pieza 5 | D3 · Claridad ejecutable | El resultado esperado dice *«No se alcanza todavía el límite»* y *«No se considera iniciado el bloqueo»*, pero no dice qué **sí** se espera observar: ¿se muestra el mensaje de error normal? ¿El botón sigue habilitado? No hay resultado observable positivo. | Otra persona que ejecute este caso no sabe qué verificar en pantalla tras el cuarto intento. Sabe que no se bloquea, pero no sabe qué tiene que ver para dar el caso por pasado. |
| H02 | Pieza 4 | D3 · Claridad ejecutable | Los datos dicen *«Repetir hasta completar 5 intentos fallidos consecutivos»* pero no especifican si los 5 intentos se hacen desde cero o si se parte de un estado limpio (sin intentos previos). Tampoco dice si se espera un intento por vez o 5 de golpe. | Sin la precondición explícita, dos personas podrían ejecutar este caso de maneras distintas: una empezando con 0 intentos acumulados y otra con un historial previo. El resultado podría variar. |
| H03 | Piezas 7 y 8 | D2 · Cobertura | CA1 dice *«Ambos son obligatorios»*. Hay una pieza para email vacío (7) y otra para contraseña vacía (8), pero ninguna pieza prueba **ambos vacíos al mismo tiempo**. | «Ambos son obligatorios» es una condición sobre el par, no sobre cada campo por separado. El comportamiento con los dos vacíos podría diferir del comportamiento con uno solo vacío. |

---

## 3. QUÉ FALTA — cobertura

- **F1 · Ambos campos vacíos** · sale de CA1 · REQ-L01 · «El login requiere email y contraseña. Ambos son obligatorios.» — hay una pieza por cada campo vacío, ninguna con los dos vacíos a la vez.
- **F2 · Login exitoso después de un bloqueo** · sale de CA3 · REQ-L03 · «el botón se habilita exactamente cuando el timer llega a 0» — la pieza 6 verifica que el botón se habilita, pero ninguna pieza verifica que un login con credenciales válidas **funciona** después de que el bloqueo termina.
- **F3 · Reseteo del contador tras login exitoso** · sale de CA3 · REQ-L03 · «después de 5 intentos fallidos consecutivos» — la palabra «consecutivos» implica que algo rompe la serie. Ninguna pieza verifica si un login exitoso intermedio resetea el contador de intentos fallidos a cero.

---

## 4. LO QUE NO PUDE EVALUAR

- **El texto exacto de los mensajes de error y de bienvenida.** La historia no los fija (la nota del equipo dice *«La documentación no fija el texto de ningún mensaje de la pantalla de login»*) y los casos los marcan correctamente como `POR CONFIRMAR`. No puedo evaluar si los datos esperados son correctos porque la fuente no los define.
- **El comportamiento concreto con campos vacíos (P3).** La historia dice que ambos son obligatorios, pero no especifica el mecanismo (validación HTML, mensaje de error del servidor, highlight del campo). Los casos lo marcan como `POR CONFIRMAR`, lo cual es correcto, pero no puedo evaluar si la respuesta esperada será adecuada.

---

## 5. TABLA DE DECISIONES

| # | Qué señaló el juez | Decisión | Razón |
|---|---|---|---|
| H01 | Pieza 5: el resultado esperado solo dice lo que NO pasa (no se bloquea), sin decir qué se observa en pantalla | `ACEPTO Y CORRIJO` | El caso de 4 intentos debe dejar explícito cuál es el resultado observable antes de alcanzar el límite de 5 intentos. |
| H02 | Pieza 4: no hay precondición explícita sobre el estado inicial del contador de intentos | `ACEPTO Y CORRIJO` | El caso debe indicar que comienza con 0 intentos fallidos para que la ejecución sea reproducible y no dependa de un estado previo. |
| H03 | Piezas 7 y 8: falta el caso con ambos campos vacíos a la vez (CA1: «Ambos son obligatorios») | `ACEPTO Y CORRIJO` | El requisito indica que tanto email como contraseña son obligatorios, por lo que es útil cubrir también el caso en que ambos campos estén vacíos. |
| F1 | Ambos campos vacíos · CA1 · REQ-L01 · «Ambos son obligatorios» | `ACEPTO Y CORRIJO` | Falta un caso que compruebe ambos campos vacíos, y esto está directamente relacionado con CA1/REQ-L01. |
| F2 | Login exitoso después de un bloqueo · CA3 · REQ-L03 · «el botón se habilita exactamente cuando el timer llega a 0» | `ACEPTO Y CORRIJO` | Después de que finalice el bloqueo y el botón vuelva a habilitarse, es necesario comprobar que el flujo de login puede continuar correctamente. |
| F3 | Reseteo del contador tras login exitoso · CA3 · REQ-L03 · «después de 5 intentos fallidos consecutivos» | `RECHAZO` | La fuente indica «5 intentos fallidos consecutivos», pero no define explícitamente que un login exitoso reinicie el contador. Agregar ese comportamiento sería asumir una regla que no está documentada. |

---

*Generado por el workflow `generar-y-juzgar` · skill `revisar-con-rubrica` · 2026-09-24*
