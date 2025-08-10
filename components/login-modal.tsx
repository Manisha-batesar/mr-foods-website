'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUser } from "./user-context"
import { useToast } from "@/hooks/use-toast"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'select' | 'signin' | 'signup'>('select')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUser()
  const { toast } = useToast();

  // Clear all form fields (can be used on logout or login)
  const clearAllInputs = () => {
    setUsername('');
    setPassword('');
    setEmail('');
    setFullName('');
    setError('');
    setMode('select');
  }

  // Reset form when switching modes
  const resetForm = () => {
    setUsername('')
    setPassword('')
    setEmail('')
    setFullName('')
    setError('')
  }

  // Helper to get all users from localStorage
  const getAllUsers = () => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // Helper to save user to localStorage (for registration)
  const saveUserToList = (user: any) => {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Validation functions
  const validateUsername = (username: string): boolean => {
    // Remove spaces and check length
    const cleanUsername = username.replace(/\s/g, '');
    if (cleanUsername !== username) {
      setError('Username cannot contain spaces');
      return false;
    }
    if (cleanUsername.length < 5 || cleanUsername.length > 10) {
      setError('Username must be between 5-10 characters');
      return false;
    }
    return true;
  }

  const validatePassword = (password: string): boolean => {
    if (password.length < 5 || password.length > 15) {
      setError('Password must be between 5-15 characters');
      return false;
    }
    return true;
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  }

  const validateFullName = (fullName: string): boolean => {
    const words = fullName.trim().split(/\s+/);
    if (words.length > 15) {
      setError('Full name cannot exceed 15 words');
      return false;
    }
    return true;
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateUsername(username) || !validatePassword(password)) {
      return;
    }
    
    const users = getAllUsers();
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser)
      toast({ 
        title: 'Welcome back!', 
        description: `Hello, ${foundUser.fullName || foundUser.username}!`, 
        variant: 'default' 
      });
      clearAllInputs();
      onClose()
    } else {
      // Check if username exists but password is wrong
      const userExists = users.some((u: any) => u.username === username);
      if (userExists) {
        setError('Incorrect password for this username.');
        toast({ 
          title: 'Incorrect password', 
          description: 'Please check your password and try again.', 
          variant: 'destructive' 
        });
      } else {
        setError('No account found with this username.');
        toast({ 
          title: 'Username not found', 
          description: 'Please check your username or create a new account.', 
          variant: 'destructive' 
        });
      }
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!validateUsername(username) || !validatePassword(password) || 
        !validateEmail(email) || !validateFullName(fullName)) {
      return;
    }
    
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    const users = getAllUsers();
    
    // Check if username already exists
    if (users.some((u: any) => u.username === username)) {
      setError('Username already exists. Please choose a different one.');
      toast({ 
        title: 'Username taken', 
        description: 'Please choose a different username.', 
        variant: 'destructive' 
      });
      return;
    }

    // Check if email already exists
    if (users.some((u: any) => u.email === email)) {
      setError('Email already registered. Please use a different email.');
      toast({ 
        title: 'Email taken', 
        description: 'Please use a different email address.', 
        variant: 'destructive' 
      });
      return;
    }
    
    // Create initials from full name
    const names = fullName.trim().split(/\s+/);
    const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
    const lastInitial = names[names.length - 1] ? names[names.length - 1].charAt(0).toUpperCase() : '';
    const initials = `${firstInitial}${lastInitial}`;
    
    const userObj = {
      username,
      password,
      email,
      fullName: fullName.trim(),
      initials
    };
    
    setUser(userObj)
    saveUserToList(userObj)
    toast({ 
      title: 'Account created!', 
      description: `Welcome, ${fullName}!`, 
      variant: 'default' 
    });
    clearAllInputs();
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            Welcome to MR Foods
          </DialogTitle>
        </DialogHeader>

        {mode === 'select' && (
          <div className="space-y-4 py-4">
            <div className="text-center text-gray-600 mb-6">
              Choose an option to continue
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => {
                  setMode('signin')
                  resetForm()
                }}
                className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setMode('signup')
                  resetForm()
                }}
                variant="outline"
                className="w-full font-semibold border-2 border-[#CF9FFF] text-[#CF9FFF] hover:bg-[#CF9FFF] hover:text-white transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}

        {mode === 'signin' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sign In</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMode('select')
                  resetForm()
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </Button>
            </div>
            <form onSubmit={handleSignIn} className="space-y-4" autoComplete="off">
              <div className="space-y-2">
                <Label htmlFor="signin-username">Username</Label>
                <Input
                  id="signin-username"
                  name="signin-username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="new-username"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
                <div className="text-xs text-gray-500">
                  5-10 characters, no spaces
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  name="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
                <div className="text-xs text-gray-500">
                  5-15 characters
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button
                type="submit"
                className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
              >
                Sign In
              </Button>
            </form>
          </div>
        )}

        {mode === 'signup' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sign Up</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMode('select')
                  resetForm()
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </Button>
            </div>
            <form onSubmit={handleSignUp} className="space-y-4" autoComplete="off">
              <div className="space-y-2">
                <Label htmlFor="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  name="signup-username"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="new-username"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
                <div className="text-xs text-gray-500">
                  5-10 characters, no spaces
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
                <div className="text-xs text-gray-500">
                  5-15 characters
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="new-email"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-fullname">Full Name</Label>
                <Input
                  id="signup-fullname"
                  name="signup-fullname"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                  autoComplete="new-name"
                  className="border-2 focus:border-[#CF9FFF] transition-colors"
                />
                <div className="text-xs text-gray-500">
                  Maximum 15 words
                </div>
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button
                type="submit"
                className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
              >
                Sign Up
              </Button>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
