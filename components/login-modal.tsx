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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUser()
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    console.log('Login attempt:', { username, password, firstName, lastName, fullName });
    
    const users = getAllUsers();
    console.log('All users:', users);
    
    // Try to find a user with matching username+password
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    if (foundUser) {
      // Log in existing user
      console.log('Found existing user:', foundUser);
      setUser(foundUser)
      toast({ title: 'Welcome back!', description: `Hello, ${foundUser.fullName || foundUser.firstName}!`, variant: 'default' });
      onClose()
      return;
    }
    
    // If username exists but password is wrong
    if (users.some((u: any) => u.username === username)) {
      setError('Incorrect password for this username.');
      toast({ title: 'Incorrect password', description: 'Please check your password and try again.', variant: 'destructive' });
      return;
    }
    
    // Register new user - username is unique at this point
    // Validate required fields for registration
    if (!firstName.trim() || !lastName.trim()) {
      setError('First name and last name are required for new registration.');
      toast({ title: 'Missing information', description: 'Please fill in your first and last name.', variant: 'destructive' });
      return;
    }
    
    // Create initials from first and last name
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
    const initials = `${firstInitial}${lastInitial}`
    const displayFullName = fullName || `${firstName} ${lastName}`.trim();
    const userObj = {
      firstName,
      lastName,
      initials,
      username,
      password,
      fullName: displayFullName
    };
    
    console.log('Creating new user:', userObj);
    setUser(userObj)
    saveUserToList(userObj)
    toast({ title: 'Account created!', description: `Welcome, ${displayFullName}!`, variant: 'default' });
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">
            Welcome to MR Foods
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">Special Username</Label>
            <Input
              id="username"
              placeholder="Choose a unique username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="border-2 focus:border-[#CF9FFF] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="border-2 focus:border-[#CF9FFF] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border-2 focus:border-[#CF9FFF] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border-2 focus:border-[#CF9FFF] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name <span className="text-xs text-gray-400">(optional, display only)</span></Label>
            <Input
              id="fullName"
              placeholder="Full name for display (optional)"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="border-2 focus:border-[#CF9FFF] transition-colors"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            type="submit"
            className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
          >
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
