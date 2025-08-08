# KarbonTODO

KarbonTODO is a task management application with a custom authentication system integrated with Auth0 for Google OAuth. Users can create, update, delete, and prioritize tasks, with a responsive UI and secure backend.

## Tools Used

### Frontend
- **React.js**: UI framework
- **Tailwind CSS (Vite)**: Styling with custom theme
- **Auth0**: Handles Google OAuth and custom login/logout
- **Axios**: API requests
- **React Router**: Page navigation
- **React Toastify**: Notifications
- **React Icons**: UI icons

### Backend
- **Express.js**: API framework
- **Mongoose**: MongoDB ORM
- **JWT**: Token-based authentication
- **Bcryptjs**: Password hashing
- **Nodemon**: Development server auto-restart
- **Cookie-Parser**: Cookie handling
- **CORS**: Cross-origin resource sharing

### Database
- **MongoDB**: NoSQL database for user and todo data

## Authentication
- **Custom Login/Signup**: Users provide email and password, stored in MongoDB with bcrypt-hashed passwords.
- **Auth0 Integration**: Google OAuth uses `user.email` and `user.sub` (as password). Backend appends "Auth0Google" to the email (e.g., `user@example.com` becomes `user@example.comAuth0Google`) to avoid conflicts with custom login.
- **Logout**: Clears JWT cookie and redirects (Auth0 or standard).

## Installation Guide

### Prerequisites
- **Node.js**: v16 or higher
- **MongoDB**: Cloud (MongoDB Atlas) or local instance
- **Auth0 Account**: For Google OAuth setup
- **Git**: For cloning the repository

### Backend Setup
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd karbontodo/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=8000
   NODE_ENVIRONMENT=development
   MONGODB_URL=mongodb+srv://<user>:<pass>@cluster0.vdangk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=<your-secret-key>
   ```

4. **Run Backend**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:8000`.

### Frontend Setup
1. **Navigate to Frontend**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Auth0**
   Update `src/index.jsx` with your Auth0 credentials:
   ```javascript
   <Auth0Provider
     domain="dev-lmm83bwhrqtim6qx.us.auth0.com"
     clientId="gcY1UYPUQscuShXwMN0ZrYEc31jkuvZr"
     authorizationParams={{ redirect_uri: window.location.origin }}
   >
   ```

4. **Run Frontend**
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`.

### Database Setup
- **MongoDB Atlas**: Create a cluster, get the connection string, and add it to `.env` (`MONGODB_URL`).
- **Local MongoDB**: Ensure MongoDB is running locally and update the connection string accordingly.

### Auth0 Setup
1. Create an Auth0 account and application.
2. Enable Google OAuth in Auth0 dashboard.
3. Set callback URL to `http://localhost:5173`.
4. Add Auth0 `domain` and `clientId` to `src/index.jsx`.

## Project Structure
- **Frontend**:
  - `src/components`: Navbar, TodoItem
  - `src/Context`: AuthContext, UserContext
  - `src/pages`: Home, Login, SignUp
  - `src/assets`: Todo icon
- **Backend**:
  - `controllers`: Auth, todo, and user logic
  - `models`: User and Todo schemas
  - `routes`: API endpoints
  - `middleware`: JWT authentication
  - `config`: Database connection and JWT generation

## Running the App
1. Start MongoDB (if local).
2. Run backend (`npm run dev` in `backend`).
3. Run frontend (`npm run dev` in `frontend`).
4. Open `http://localhost:5173` in a browser.
5. Use Login/Signup or Google OAuth to access the app.

## Usage
- **Signup/Login**: Create an account or log in (standard or Google).
- **Tasks**: Add, edit, delete, or mark tasks as completed. Set priority (Low, Medium, High).
- **High-Priority View**: See high-priority tasks in a dedicated section.
- **Logout**: Clears session and redirects to home.

## Notes
- Ensure CORS is configured for `http://localhost:5173` in backend.
- JWT tokens are stored in HTTP-only cookies with a 7-day expiry.
- Auth0 Google login appends "Auth0Google" to email to prevent conflicts.