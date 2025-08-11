'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserState {
  username: string;
  password: string;
  email: string;
  fullName: string;
  initials: string;
}

interface UserContextType {
  user: UserState | null;
  setUser: (user: UserState | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserState | null>(null);
  
  // Load user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user'); // Clear corrupted data
        }
      }
    }
  }, []);

  const handleSetUser = (newUser: UserState | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  const handleLogout = () => {
    handleSetUser(null);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser: handleSetUser,
      logout: handleLogout 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
