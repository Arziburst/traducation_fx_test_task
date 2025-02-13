# TRADUCATION\_FX\_TEST\_TASK

## Project Description

TRADUCATION\_FX\_TEST\_TASK is a monorepository consisting of two parts:

- **Frontend**: Vite + React + Tailwind.
- **Backend**: NestJS, which works with a local `db.json` database (created automatically if not found).

The project implements a **Counter**, where the frontend handles the visual representation, while calculations and data storage are managed by the backend. This separation was chosen to enhance the development experience and demonstrate a wide range of skills.

## Implemented Features

### Backend (NestJS)

- A server with three main routes to manage the counter value:
  - `GET /counter` — Retrieve the current value.
  - `POST /counter` — Update the value.
  - `DELETE /counter` — Reset the value.
- Detailed API request information is available in: `traducation_fx_test_api/traducation_fx_test_api.postman_collection.json`.

### Frontend (Vite + React + Tailwind)

- Designed according to the provided UI.
- Counter functionality:
  - Starts from **0**.
  - Buttons **+**, **-**, and **Reset** to modify the value.
  - Custom step input to adjust the increment/decrement.
  - Value boundaries: **-1000** and **1000** (validated on both frontend and backend).
- **Change history** for the counter is implemented.
- **Global theme support**:
  - **Light**.
  - **Dark**.
  - **Auto** (syncs with system settings).
- **Animations** for UI elements.

## Running the Project

### Requirements

- **Node.js 18+**

### Install Dependencies

Run from the monorepo root (or separately for each project):

```sh
npm install
```

### Start the Project

#### Using Docker (from the project root)

```sh
npm start
```

#### Separate Execution

**Backend:**

```sh
npm run start:dev
```

**Frontend:**

```sh
npm run dev
```

## Additional Information

- The project **does not require external global variables**.
- The `db.json` database is created automatically on first launch.
- The frontend is available at **[http://localhost:3000/](http://localhost:3000/)** after starting.
- The backend is available at **[http://localhost:4000/](http://localhost:4000/)** after starting.

---

This project showcases the architectural separation between frontend and backend while demonstrating the convenience of working with monorepositories.

