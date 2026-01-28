# React & Node.js/MongoDB Integration Guide

## Setup Complete! ✅

I've integrated your React frontend with your Node.js/MongoDB backend using **React Query**. Here's what was done:

---

## What Was Installed

```bash
npm install axios @tanstack/react-query
```

- **axios**: HTTP client for making API requests
- **React Query**: Server state management for handling async data

---

## Files Created

### 1. `.env.local`

Environment variables for your API configuration:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. `src/services/api.ts`

Central API service with axios instance and all auth endpoints:

- Handles token management automatically
- Interceptors for adding auth headers
- Handles 401 errors (auto logout)

### 3. `src/hooks/useSignup.ts`

React Query hook for signup mutation:

- Validates input
- Sends POST request to `/api/auth/register`
- Stores JWT token in localStorage
- Manages loading/error states

### 4. `src/hooks/useLogin.ts`

React Query hook for login mutation:

- Similar to useSignup
- POST request to `/api/auth/login`
- Stores user data

### 5. `src/contexts/AuthContext.tsx`

Global auth state context:

- Manages current user
- Manages auth token
- Provides logout function
- Persists auth data across page refreshes

### 6. Updated Components

- **SignupModal.tsx**: Now uses `useSignup` hook with error/loading states
- **LoginModal.tsx**: Now uses `useLogin` hook
- **main.tsx**: Wrapped with QueryClientProvider and AuthProvider

---

## How It Works

### Signup Flow

```
User fills form → handleSignup() → useSignup hook
→ axios POST to /api/auth/register → Backend validates & hashes password
→ MongoDB stores user → Backend returns token & user data
→ Frontend stores in localStorage → Modal closes → User logged in
```

### Login Flow

```
User enters email/password → handleLogin() → useLogin hook
→ axios POST to /api/auth/login → Backend validates credentials
→ Backend returns token & user data → Frontend stores → Modal closes
```

### Error Handling

- Network errors display user-friendly messages
- Backend validation errors shown in modal
- Invalid credentials/expired token handled gracefully

---

## Configuration

### Backend URL

If your backend is on a different port, update `.env.local`:

```
VITE_API_BASE_URL=http://localhost:YOUR_PORT/api
```

### CORS Configuration (Backend)

Make sure your Node.js backend has CORS enabled:

```javascript
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  }),
);
```

---

## Testing

1. **Start your backend**: `node server.js` (or your start command)
2. **Start your frontend**: `npm run dev`
3. Open http://localhost:5173
4. Click signup/login buttons
5. Fill form and submit
6. Check browser DevTools → Network tab to see requests
7. Check browser DevTools → Application → Local Storage for stored token

---

## Using Auth Context in Components

```tsx
import { useAuth } from "../contexts/AuthContext";

export const MyComponent = () => {
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return <p>Please login</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

---

## Making Authenticated API Calls

For any other API calls that need authentication:

```tsx
import { apiClient } from "../services/api";

// The token is automatically added to headers
const response = await apiClient.get("/api/profile");
```

---

## Troubleshooting

### "Network Error" or requests to wrong URL

- Check `.env.local` has correct `VITE_API_BASE_URL`
- Verify backend is running on that port
- Check browser console for exact error

### CORS Error

- Ensure backend has `cors` middleware enabled
- Frontend URL must match `origin` in CORS config

### Token not persisting

- Check localStorage in DevTools → Application tab
- Token should appear as `authToken` key

### Requests not including token

- Verify `Authorization` header in DevTools → Network
- Should be: `Authorization: Bearer <token>`

---

## Next Steps

1. **Add more auth endpoints** using the same pattern as useSignup/useLogin
2. **Protected routes** - Redirect to login if not authenticated
3. **Form validation** - Add client-side validation before submission
4. **Loading animations** - Use `isPending` state to show spinners
5. **Refresh token** - Implement token refresh for long sessions

---

## File Structure

```
src/
├── components/
│   ├── SignupModal.tsx (updated)
│   ├── LoginModal.tsx (updated)
│   └── ...
├── contexts/
│   └── AuthContext.tsx (new)
├── hooks/
│   ├── useSignup.ts (new)
│   ├── useLogin.ts (new)
│   └── ...
├── services/
│   └── api.ts (new)
├── main.tsx (updated)
└── ...

.env.local (new)
```

---

## Summary

Your signup/login is now **fully integrated** with your MongoDB backend! The system:

- ✅ Sends credentials to backend
- ✅ Stores JWT tokens securely
- ✅ Handles errors gracefully
- ✅ Persists authentication across page refreshes
- ✅ Automatically includes token in future API requests
