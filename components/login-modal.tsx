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

  // Helper to save user to localStorage (for uniqueness check)
  const saveUserToList = (user: any) => {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // Username uniqueness check
    const users = getAllUsers();
    if (users.some((u: any) => u.username === username)) {
      setError('This Special Username is already taken. Please choose another.');
      toast({ title: 'Username already taken', description: 'Please choose a unique Special Username.', variant: 'destructive' });
      return;
    }
    // Create initials from first and last name
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
    const initials = `${firstInitial}${lastInitial}`
    // Compose full name if not provided
    const displayFullName = fullName || `${firstName} ${lastName}`.trim();
    // Set user data
    const userObj = {
      firstName,
      lastName,
      initials,
      username,
      password,
      fullName: displayFullName
    };
    setUser(userObj)
    saveUserToList(userObj)
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
