"use client"

import { useRouter } from 'next/navigation'
import { LogOut, History, User } from 'lucide-react'
import { useUser } from '@/components/user-context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useState, useEffect } from 'react'

export function UserMenu() {
  const router = useRouter()
  const { user, logout } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate initials from user's name or use stored initials
  const getInitials = (user: any) => {
    if (user?.initials) {
      return user.initials;
    }
    // Fallback: generate from fullName if available
    if (user?.fullName) {
      const names = user.fullName.trim().split(/\s+/);
      const firstInitial = names[0] ? names[0].charAt(0).toUpperCase() : '';
      const lastInitial = names[names.length - 1] ? names[names.length - 1].charAt(0).toUpperCase() : '';
      return `${firstInitial}${lastInitial}`;
    }
    // Final fallback: use username
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }
    return 'U';
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Only render a simple button if not mounted yet
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
        <span className="sr-only">Open menu</span>
        <User className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full p-0">
          <Avatar className="bg-background/50">
            <AvatarFallback className="bg-transparent">
              {user ? getInitials(user) : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        {user ? (
          <>
            <div className="flex items-center p-3">
              <Avatar className="h-8 w-8 mr-2 bg-background/50">
                <AvatarFallback className="bg-transparent">
                  {getInitials(user)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{user.fullName || user.username}</span>
                <span className="text-xs text-gray-500">Member</span>
              </div>
            </div>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="p-3 cursor-pointer"
              onClick={() => router.push('/order-history')}
            >
              <History className="mr-2 h-4 w-4" />
              Order History
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              className="p-3 cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <div className="p-3 text-sm text-gray-500 text-center">
            Please login to access your profile
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}