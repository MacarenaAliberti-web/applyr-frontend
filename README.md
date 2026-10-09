# Applyr 🎯

Tablero para seguir mis postulaciones laborales, con una función de IA que lee el texto de una oferta y carga los datos sola.

> Proyecto de portfolio y de uso real: lo construyo porque lo necesito para mi búsqueda de primer trabajo como Full Stack Developer.

---

## 1. Objetivo

- Tener una herramienta útil para organizar mi búsqueda laboral.
- Sumar al portfolio un proyecto que muestre cosas nuevas respecto de MaletFit y ZHYRA: **IA, Docker, CI y tests e2e**.
- Aprender de a poco, entendiendo cada parte antes de pasar a la siguiente.

## 2. Funcionalidades

**Versión 1 (mínima)**
- [ ] Registro / login
- [ ] Crear, editar y borrar postulaciones (empresa, puesto, fecha, link, estado, notas)
- [ ] Tablero Kanban con estados: Postulado, Entrevista, Prueba técnica, Oferta, Rechazado
- [ ] Filtros y búsqueda

**Versión 2**
- [ ] Pegar el texto de una oferta y que la IA extraiga empresa, puesto, stack y requisitos
- [ ] Métricas: total de postulaciones, tasa de respuesta
- [ ] Drag & drop entre columnas

**Ideas para después**
- [ ] Recordatorios por email
- [ ] Exportar a CSV
- [ ] Historial de cambios de estado

## 3. Stack

| Capa | Tecnología |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS, Shadcn UI |
| Diseño inicial | V0 (solo para la UI) |
| Backend | NestJS, TypeScript |
| Base de datos | PostgreSQL (Supabase) + Prisma ORM |
| IA | API de Claude + validación con Zod |
| Tests | Jest (backend), Playwright (e2e) |
| DevOps | Docker, docker compose, GitHub Actions |
| Deploy | Vercel (front), Render (back) |

## 4. Plan de trabajo (en orden)

Regla: no paso a la fase siguiente hasta poder explicar con mis palabras qué hice en la anterior.

### Fase 0 · Preparación
- [ ] Crear los repos `applyr-frontend` y `applyr-backend` en GitHub
- [ ] Crear el tablero de GitHub Projects con estas fases
- [ ] Crear cuentas / claves: Supabase, Vercel, Render, API de Claude
- [x] Definir el nombre definitivo: **Applyr** (`applyr.vercel.app` ya está ocupado, usar otra URL en Vercel, ej. `applyr-app.vercel.app`)

### Fase 1 · Diseño
- [ ] Generar el diseño en V0 con el prompt (ver sección 6)
- [ ] Revisar el código que genera y ordenarlo
- [ ] Opcional: ajustar en Figma

### Fase 2 · Backend base
- [ ] Iniciar proyecto NestJS
- [ ] Conectar Prisma + PostgreSQL
- [ ] Modelo de datos: `User`, `Application`
- [ ] Endpoints CRUD de postulaciones
- [ ] Documentar con Swagger
- [ ] Tests con Jest del módulo de postulaciones

### Fase 3 · Autenticación
- [ ] Registro y login con JWT en cookies httpOnly
- [ ] Cada usuario ve solo sus postulaciones

### Fase 4 · Frontend conectado
- [ ] Pasar el diseño a Next.js
- [ ] Conectar con la API
- [ ] Tablero, filtros y búsqueda
- [ ] Manejo de errores y estados de carga

### Fase 5 · IA
- [ ] Endpoint que recibe el texto de una oferta
- [ ] Llamada a la API de Claude pidiendo una respuesta estructurada
- [ ] Validar la respuesta con Zod antes de guardar
- [ ] Modal "Pegar oferta" en el front

### Fase 6 · Métricas
- [ ] Endpoint de estadísticas
- [ ] Cabecera con totales y tasa de respuesta

### Fase 7 · Calidad
- [ ] Test e2e con Playwright del flujo principal (login → crear postulación → mover de estado)

### Fase 8 · Docker y CI
- [ ] Dockerfile para front y back
- [ ] `docker compose` para levantar todo local
- [ ] GitHub Actions: correr tests en cada push

### Fase 9 · Deploy y documentación
- [ ] Deploy en Vercel y Render
- [ ] README final **en inglés**, con capturas, link a la demo y decisiones técnicas
- [ ] Agregar el proyecto al CV y al portfolio

## 5. Modelo de datos (borrador)

```
User
  id, email, passwordHash, createdAt

Application
  id, userId, company, role, link,
  status (APPLIED | INTERVIEW | TECH_TEST | OFFER | REJECTED),
  appliedAt, notes, stack (lista de texto),
  createdAt, updatedAt
```

## 6. Prompt para V0

```
Design a job application tracker as a Kanban board with columns:
Applied, Interview, Technical Test, Offer, Rejected.
Cards show company, role, date, and a stack tag.
Include a "paste job posting" modal, a stats header
(total applications, response rate), and a clean, modern look
with Tailwind and Shadcn UI. Responsive, light and dark mode.
```

## 7. Glosario (palabras nuevas)

- **Zod:** librería de TypeScript para validar que los datos tengan la forma esperada. La uso para comprobar que lo que devuelve la IA es correcto antes de guardarlo.
- **Respuesta estructurada:** pedirle a la IA que conteste en un formato fijo (JSON) en vez de texto libre, para poder usarlo en el código.
- **Docker:** empaqueta la app con todo lo que necesita para que corra igual en cualquier computadora.
- **docker compose:** levanta varios contenedores juntos (front, back, base de datos) con un solo comando.
- **CI (Integración Continua):** un robot que corre los tests automáticamente cada vez que subo código.
- **GitHub Actions:** el servicio de GitHub para armar esos robots.
- **Test e2e (end to end):** prueba que simula a un usuario real usando la app de punta a punta.
- **Playwright:** herramienta que automatiza un navegador para hacer tests e2e.
- **Swagger:** documentación interactiva de la API.
- **Kanban:** tablero con columnas por estado; las tarjetas se mueven de una a otra.
- **V0:** herramienta de IA de Vercel que genera interfaces con React y Tailwind.

## 8. Notas

- Reutilizo lo aprendido en MaletFit (auth con cookies httpOnly, estructura de NestJS + Prisma).
- La clave de la API de Claude va siempre en variables de entorno, **nunca** en el repositorio.
- Si algo no lo entiendo, lo anoto acá y lo repasamos antes de seguir.
