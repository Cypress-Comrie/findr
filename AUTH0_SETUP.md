# Auth0 Setup Guide

## 1. Create Auth0 Account and Application

1. Go to [Auth0.com](https://auth0.com) and create a free account
2. Create a new application:
   - Dashboard → Applications → Create Application
   - Choose "Single Page Web Applications"
   - Name it "Findr"

## 2. Configure Auth0 Application Settings

### Allowed Callback URLs
Add your development callback URL (update for production):
```
http://localhost:5173
http://localhost:5173/
```

### Allowed Logout URLs
```
http://localhost:5173
http://localhost:5173/
```

### Allowed Web Origins
```
http://localhost:5173
```

## 3. Get Your Credentials

In the Auth0 Dashboard, go to your application settings and copy:
- **Domain**: Your Auth0 domain (e.g., `your-app.auth0.com`)
- **Client ID**: Your application's client ID

## 4. Set Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id_here
VITE_AUTH0_CALLBACK_URL=http://localhost:5173

# Optional: For server-side Auth0 integration
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id_here
AUTH0_CLIENT_SECRET=your_client_secret_here
```

Replace `your-domain.auth0.com` and `your_client_id_here` with your actual credentials.

## 5. Install Dependencies

```bash
npm install
```

## 6. Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` and you should see the login button.

## 7. Features Implemented

- ✅ Login/Logout buttons in the header
- ✅ Protected routes (users must be logged in to see Discover and Watchlist)
- ✅ Auth state management with Auth0 React SDK
- ✅ User profile available via `useAuth0()` hook

## 8. Using Auth in Components

```tsx
import { useAuth0 } from '@auth0/auth0-react'

function MyComponent() {
  const { user, isLoading, isAuthenticated } = useAuth0()

  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      {isAuthenticated && <p>Hello {user?.name}</p>}
    </div>
  )
}
```

## 9. Backend Integration (Optional)

To protect backend routes with Auth0 tokens, you can add middleware to your Express server:

```typescript
import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })
  
  try {
    const decoded = jwt.verify(token, process.env.AUTH0_CLIENT_SECRET, {
      algorithms: ['HS256']
    })
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
```

## 10. Testing Auth0 Login

1. Click the "Log In" button in the header
2. You'll be redirected to Auth0 login page
3. Sign up or log in with email/password or social providers
4. You'll be redirected back to the app
5. Navigation links now visible and watchlist works
