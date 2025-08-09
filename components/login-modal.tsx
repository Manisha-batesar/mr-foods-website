'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useUser } from "./user-context"

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const { setUser } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create initials from first and last name
    const firstInitial = firstName.charAt(0).toUpperCase()
    const lastInitial = lastName.charAt(0).toUpperCase()
    const initials = `${firstInitial}${lastInitial}`
    
    // Set user data
    setUser({
      firstName,
      lastName,
      initials
    })
    
    // Close the modal
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
