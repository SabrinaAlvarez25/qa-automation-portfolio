# 🎛️ Protocolo de orquestación

> Cómo encadenar los 8 agentes A.T.E.R.R.I.Z.A. sin perder el criterio QA en el camino.

---

## Antes de empezar: pegá esto UNA vez en tu IA

Copiá este mensaje al inicio de tu conversación. Le da a la IA las reglas del juego para todos los
agentes que vas a correr después.

```
Vamos a analizar una funcionalidad de QA usando el método A.T.E.R.R.I.Z.A., trabajando por capas.

Reglas para toda esta conversación:
1. Trabajás UNA capa por vez. No te adelantes a las siguientes.
2. NO generás casos de prueba hasta que yo lo pida (capa R de escenarios).
3. NO inventás reglas, datos ni comportamientos que no estén en lo que te doy.
   Si algo falta o es ambiguo, lo marcás explícitamente como "POR CONFIRMAR".
4. Todo resultado esperado tiene que ser verificable. Si no se puede verificar, lo decís.
5. Respondés en el formato que cada capa te pide, sin relleno ni texto decorativo.

Cuando estés listo, te paso la primera capa y la funcionalidad a analizar.
```

Después pegás, en orden, el prompt de cada agente (archivos 01 a 08).

---

## El flujo completo (8 agentes con gates)

```
   [ Tu funcionalidad ]
          │
   ┌──────▼──────┐
   │  A  Contexto │──▶ GATE ──▶  Mapa funcional
   └──────┬──────┘
   ┌──────▼──────┐
   │  T  Reglas   │──▶ GATE ──▶  Lista de reglas
   └──────┬──────┘
   ┌──────▼──────┐
   │  E  Ambig.   │──▶ GATE ──▶  Preguntas para el equipo
   └──────┬──────┘
   ┌──────▼──────┐
   │  R  Riesgos  │──▶ GATE ──▶  Matriz de riesgos (Alto/Medio/Bajo)
   └──────┬──────┘
   ┌──────▼──────┐
   │  R  Escenar. │──▶ GATE ──▶  Escenarios QA agrupados
   └──────┬──────┘
   ┌──────▼──────┐
   │  I  Evidenc. │──▶ GATE ──▶  Evidencia esperada por grupo
   └──────┬──────┘
   ┌──────▼──────┐
   │  Z  Automat. │──▶ GATE ──▶  Backlog de automatización
   └──────┬──────┘
   ┌──────▼──────┐
   │  A  Ajuste   │──▶ GATE ──▶  Set final validado
   └──────┬──────┘
          ▼
   [ Listo para Playwright / Postman / Jira ]
```

**La regla del handoff:** solo pasás al siguiente agente la salida que ya **validaste en el GATE**.
Si corregiste algo a mano, pegás tu versión corregida, no la original de la IA.

---

## Mini-flujos (cuando no tenés tiempo para los 8)

No siempre necesitás el método completo. Según el momento, corré solo estos agentes:

| Momento | Agentes a correr | Qué te llevás |
|---------|------------------|---------------|
| **Antes de refinar la HU** | A · T · E | Contexto, reglas y preguntas para el equipo |
| **Antes de diseñar pruebas** | R · R | Riesgos priorizados y escenarios agrupados |
| **Antes de ejecutar** | I | Evidencia clara para demostrar el resultado |
| **Antes de automatizar** | Z · A | Candidatos de automatización y set final depurado |

---

## Si la respuesta sale muy larga

Pedile a la IA que trabaje una capa por vez, literal. Ejemplo:
`"Ahora solo desarrollá la capa E: ambigüedades y preguntas para el equipo. Nada más."`

---

## Recordatorio final

Cada agente acelera tu análisis. **Ninguno reemplaza tu criterio.** El GATE existe para que vos
sigas siendo el QA que decide. La IA propone; vos disponés.
