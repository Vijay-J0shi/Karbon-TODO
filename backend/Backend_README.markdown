# KarbonTODO Backend

API for KarbonTODO, handling user authentication, task CRUD, and database operations with Express.js and MongoDB.

## Tools
- **Express.js**: API framework
- **Mongoose**: MongoDB ORM
- **JWT**: Token authentication
- **Bcryptjs**: Password hashing
- **Nodemon**: Auto-restart server
- **Cookie-Parser**: Cookie handling
- **CORS**: Cross-origin support

## Database
- **MongoDB**: Stores user and todo data.

### Models
#### User
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String },
}, { timestamps: true });
```

#### Todo
```javascript
const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  detail: String,
  priority: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
});
```

## Authentication
- **Signup**: Creates user with hashed password. For Auth0, appends "Auth0Google" to email, skips duplicate user creation.
- **Login**: Verifies email and password. For Auth0, uses `user.sub` as password.
- **Logout**: Clears JWT cookie.
- **JWT**: Tokens stored in HTTP-only cookies (7-day expiry).

## Endpoints
- **Auth**:
  - `POST /api/auth/signup`: Register user
  - `POST /api/auth/login`: Login user
  - `POST /api/auth/logout`: Clear token
- **User**:
  - `GET /api/user/currentuser`: Get user data
  - `DELETE /api/user/delete`: Delete user and todos
- **Todo**:
  - `GET /api/todo`: Fetch user todos
  - `POST /api/todo`: Create todo
  - `PUT /api/todo/:id`: Update todo
  - `DELETE /api/todo/:id`: Delete todo

## Installation
### Prerequisites
- **Node.js**: v16+
- **MongoDB**: Atlas or local
- **Git**

### Steps
1. **Clone Repository**
   ```bash
   cd karbontodo/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env`:
   ```env
   PORT=8000
   NODE_ENVIRONMENT=development
   MONGODB_URL=mongodb+srv://<user>:<pass>@cluster0.vdangk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=<your-secret-key>
   ```

4. **Run**
   ```bash
   npm run dev
   ```
   - Runs on `http://localhost:8000`.

## Notes
- Configure CORS for `http://localhost:5173`.
- Ensure MongoDB connection string is valid.
- JWT secret must be secure and unique.