import { createContext, useContext, useEffect, useReducer, ReactNode } from 'react';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_SUCCESS' | 'RESTORE_SESSION'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'RESTORE_SESSION':
      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Restore session from localStorage
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData) as User;
        dispatch({ type: 'RESTORE_SESSION', payload: { user, token } });
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const user: User = {
        id: '1',
        email,
        name: 'Hikigaya',
        role: 'User',
        avatar: 'https://m.gettywallpapers.com/wp-content/uploads/2023/09/Pfp-Hachiman-Hikigaya.jpg',
      };
      
      const token = 'mock-jwt-token';
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>): void => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};