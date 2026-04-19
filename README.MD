
# 🚀 Getting Started

Welcome to the **Nodus Frontend** repository\! To ensure we are all working with the exact same environment and dependencies, please follow these steps precisely.

## 🛠️ Installation & Setup

### 1\. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Hackathon-Nodus/Frontend.git
cd nodus-frontend
```

### 2\. Install Dependencies

We use a `package-lock.json` file to keep our versions synced. Do **not** use `npm update`; only use:

```bash
npm install
```

*This will install Vite, React 19, Tailwind, TanStack Query, Zustand, and all other required libraries.*

### 3\. Environment Configuration

Environment variables are kept out of Git for security. You must create your own local copy:

1.  Create a file named **`.env`** in the root directory.
2.  Copy the keys from **`.env.example`** into your new `.env` file.
3.  Add the local backend URL:
    ```env
    VITE_API_URL=http://localhost:5000/api/v1
    ```

### 4\. Launch the Development Server

Once everything is installed and your `.env` is ready, start the app:

```bash
npm run dev
```

The app should now be running at [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173).

-----

## 🏗️ Tech Stack

  * **Core:** React 19 + Vite + TypeScript
  * **Styling:** Tailwind CSS
  * **State:** Zustand (Global) & TanStack Query (Server State)
  * **Routing:** TanStack Router
  * **Validation:** Zod

## 📖 Development Rules

  * **Branching:** Create a new branch for every feature (`git checkout -b feature/your-feature-name`).
  * **Commits:** Use descriptive commit messages.
  * **Environment:** If you add a new variable to `.env`, remember to add the key to `.env.example` before pushing\!

-----

**Note:** If you encounter any "Module not found" errors, run `npm install` again to ensure your local `node_modules` is up to date with the latest changes from the team.







This is the complete, consolidated guide. It covers the architecture, the "why" behind our folders, and exactly how to get started. 

---

# 🚀 NODUS: Frontend Team Onboarding Guide

## 🎯 Project Overview
NODUS is a freelance marketplace where Clients post problems and Solvers provide AI-enhanced solutions. We are building this for the GDG Hackathon using a scalable, feature-based architecture.

## 🛠️ Tech Stack
* **Vite + React + TypeScript**: Our fast, type-safe core.
* **Tailwind CSS**: For rapid, consistent UI styling.
* **Zustand**: Lightweight global state management (Auth/User).
* **TanStack Query**: For all API fetching, caching, and loading states.
* **Zod**: Form and API data validation.
* **Axios**: For structured HTTP requests.

---

## 📂 Folder Structure (Feature-Based)
We are using a **Feature-Based** architecture. Every domain (Auth, Problems, etc.) is a "mini-app" with its own UI, logic, and API calls.

### 🏗️ Global Folders
* `src/components/ui/`: Reusable, "dumb" UI elements (Buttons, Inputs, Modals). **Check here first before building a new UI element!**
* `src/lib/`: Configs for Axios (`lib/axios.ts`) and React Query.
* `src/types/`: The "Law." Define all TypeScript Interfaces here to keep data consistent.
* `src/config/`: App-wide constants and theme settings.
* `src/hooks/`: Global, reusable custom hooks (e.g., `useLocalStorage`).

### 🧩 The Feature Pattern
Each folder in `src/features/` follows this triple-folder structure:
1.  **`components/`**: UI specific to that feature (e.g., `LoginForm.tsx`).
2.  **`hooks/`**: Data fetching logic using TanStack Query.
3.  **`services/`**: Pure Axios functions that hit the backend endpoints.

**Our Feature Domains:**
* `features/auth/`: Login, Register, and Role selection.
* `features/problems/`: The Feed, Problem forms, and AI-enhancement preview.
* `features/solutions/`: Submission forms, Voting, and Solution lists.
* `features/marketplace/`: Stripe integration and hiring workflows.
* `features/profiles/`: Dashboards, Ratings, and Portfolios.



---

## 🤝 Team Workflow & Best Practices
1.  **The "Stay in Your Lane" Rule**: Work inside your assigned `features/` folder. If you need a component from another feature, import it; don't duplicate it.
2.  **Logic vs. UI**: Keep components clean. Move heavy fetching or data transformation into a custom hook in your feature’s `hooks/` folder.
3.  **No Hardcoding**: Never type a URL directly. Use `import.meta.env.VITE_API_URL`.
4.  **Types First**: Before you build a feature, ensure the data structure is defined in `src/types/index.ts`.
5.  **DRY (Don't Repeat Yourself)**: If you've used a piece of logic or UI twice, move it to the global folders.

---

## ⚡ Quick Start Setup
1.  **Clone & Install**:
    ```powershell
    npm install
    ```
2.  **Environment Setup**:
    Create a `.env` file in the root directory and add:
    ```text
    VITE_API_URL=http://localhost:5000/api/v1
    ```
3.  **Run Development Server**:
    ```powershell
    npm run dev
    ```

---

> **Hackathon Tip**: We have a limited time! Focus on the **UI components** first. Once the Backend team finishes an API, we will "plug it in" using our `services/` and `hooks/` folders. Let's build something epic! 🚀