import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Type definition for the user object
interface User {
  id: string;
  name: string;
  email: string;
}

// Type definition for the authentication context
interface AuthContextType {
  user: User | null;        // Currently logged in user, or null if not logged in
  token: string | null;     // JWT token for authenticated requests
  isLoggedIn: boolean;      // Convenience flag: true if user is logged in
  logout: () => void;       // Function to logout user
}

// Create the context object
// This context will be used to share auth state across the entire app
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app
// This makes auth state available to all child components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // State to store the current user information
  const [user, setUser] = useState<User | null>(null);
  
  // State to store the JWT token
  const [token, setToken] = useState<string | null>(null);

  // This runs once when the app loads
  // It checks if user was previously logged in by reading from local storage
  useEffect(() => {
    // Get the token from browser's local storage
    const storedToken = localStorage.getItem('authToken');
    // Get the user data from browser's local storage
    const storedUser = localStorage.getItem('user');

    // If a token exists, set it in state
    if (storedToken) {
      setToken(storedToken);
    }

    // If user data exists, parse it and set it in state
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If parsing fails, log error and ignore
        console.error('Failed to parse stored user:', error);
      }
    }
  }, []); // Empty dependency array = run only once on mount

  // Function to logout the user
  const logout = () => {
    // Clear user from state
    setUser(null);
    // Clear token from state
    setToken(null);
    // Remove token from local storage
    localStorage.removeItem('authToken');
    // Remove user from local storage
    localStorage.removeItem('user');
  };

  // Provide the auth state to all child components
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,  // true if token exists, false otherwise
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context in any component
// Use this hook to access user, token, isLoggedIn, and logout in your components
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw error if hook is used outside of AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
