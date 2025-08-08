# KarbonTODO Frontend

Task management UI for KarbonTODO, built with React and Tailwind CSS, featuring a custom authentication system integrated with Auth0 for Google OAuth.

## Tools
- **React.js**: UI framework
- **Tailwind CSS (Vite)**: Styling
- **Auth0**: Google OAuth + custom login/logout
- **Axios**: API requests
- **React Router**: Navigation
- **React Toastify**: Notifications
- **React Icons**: Icons

## Theme
```css
:root {
  --ff: "Inter", sans-serif;
  --color-primary: hsl(44, 50%, 90%);
  --color-secondary: hsl(43, 60%, 21%);
  --color-tertiary: hsl(104, 80%, 20%);
  --color-accent: hsl(344, 84%, 45%);
}
.dark {
  --color-primary: hsl(43, 47%, 13%);
  --color-secondary: hsl(44, 50%, 90%);
  --color-tertiary: hsl(104, 80%, 80%);
  --color-accent: hsl(344, 80%, 80%);
}
```
- Uses flexbox and flex-wrap for responsive layouts.

## Authentication
- **Custom Login/Signup**: Email and password input, sent to backend.
- **Auth0 Google OAuth**: Uses `user.email` and `user.sub` (as password). Backend appends "Auth0Google" to email to avoid conflicts.
- **Logout**: Clears session and redirects.

## Structure
- **Components**:
  - `Navbar`: Logo, app name, auth links (Login/Signup or Logout).
  - `TodoItem`: Task display with edit, delete, priority, and completion options.
- **Pages**:
  - `Home`: Task list, add task form, high-priority task view.
  - `Login`: Standard and Google login.
  - `SignUp`: Standard and Google signup.
- **Context**:
  - `AuthContext`: Manages server URL, loading state, auth operation.
  - `UserContext`: Handles user data and fetching.

## Installation
### Prerequisites
- **Node.js**: v16+
- **Auth0 Account**: For Google OAuth

### Steps
1. **Clone Repository**
   ```bash
   cd karbontodo/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Auth0**
   Update `src/index.jsx`:
   ```javascript
   <Auth0Provider
     domain="dev-lmm83bwhrqtim6qx.us.auth0.com"
     clientId="gcY1UYPUQscuShXwMN0ZrYEc31jkuvZr"
     authorizationParams={{ redirect_uri: window.location.origin }}
   >
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:5173`.

## Usage
- Access via `http://localhost:5173`.
- Login/Signup with email/password or Google.
- Manage tasks (add, edit, delete, prioritize).
- View high-priority tasks in a separate section.

## Notes
- Ensure backend is running at `http://localhost:8000`.
- Auth0 callback URL must be set to `http://localhost:5173`.