"use client"

import { useUser } from '@/components/user-context'
import { useOrders } from '@/components/orders-context'
import { useEffect } from 'react'

export default function DebugPage() {
  const { user } = useUser()
  const { orders, clearOrders } = useOrders()

  useEffect(() => {
    console.log('=== DEBUG PAGE LOADED ===')
    console.log('User from context:', user)
    console.log('Orders from context:', orders)
    console.log('LocalStorage user:', localStorage.getItem('user'))
    console.log('LocalStorage orders:', localStorage.getItem('ordersState'))
    console.log('LocalStorage users:', localStorage.getItem('users'))
  }, [user, orders])

  const clearAllData = () => {
    if (confirm('This will clear all your data. Are you sure?')) {
      localStorage.removeItem('ordersState')
      localStorage.removeItem('user')
      localStorage.removeItem('users')
      localStorage.removeItem('cartState')
      clearOrders()
      alert('All data cleared! Refreshing page...')
      window.location.reload()
    }
  }

  const simulateOrder = () => {
    if (!user) {
      alert('Please login first!')
      return
    }
    
    // Create a test order
    const testOrder = {
      id: `TEST-${Date.now()}`,
      date: new Date().toISOString(),
      items: [{
        id: '1',
        name: 'Test Item',
        price: 50,
        quantity: 1,
        image: '',
        category: 'Test'
      }],
      total: 50,
      status: 'pending' as const,
      orderTime: Date.now(),
      username: user.username,
      customerName: user.fullName || `${user.firstName} ${user.lastName}`.trim()
    }
    
    console.log('Debug: Simulating order:', testOrder)
    
    // Add to localStorage directly for testing
    const existingOrders = localStorage.getItem('ordersState')
    const ordersState = existingOrders ? JSON.parse(existingOrders) : { orders: [] }
    ordersState.orders.unshift(testOrder)
    localStorage.setItem('ordersState', JSON.stringify(ordersState))
    
    alert('Test order created! Check order history.')
    window.location.reload()
  }

  const showStorageData = () => {
    console.log('=== STORAGE DEBUG INFO ===')
    console.log('User:', localStorage.getItem('user'))
    console.log('Users:', localStorage.getItem('users'))
    console.log('Orders:', localStorage.getItem('ordersState'))
    console.log('Cart:', localStorage.getItem('cartState'))
    console.log('=== END DEBUG INFO ===')
  }

  const loginTestUser = () => {
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      initials: 'TU',
      username: 'testuser',
      password: 'password',
      fullName: 'Test User'
    }
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(testUser))
    
    // Also save to users list
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((u: any) => u.username === testUser.username)
    if (!existingUser) {
      users.push(testUser)
      localStorage.setItem('users', JSON.stringify(users))
    }
    
    alert('Test user created and logged in! Refresh page.')
    window.location.reload()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Debug Page</h1>
        
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Current User:</h2>
            <pre className="text-sm">{JSON.stringify(user, null, 2)}</pre>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Orders ({orders.length}):</h2>
            <pre className="text-sm">{JSON.stringify(orders, null, 2)}</pre>
          </div>
          
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">LocalStorage Data:</h2>
            <div className="space-y-2 text-sm">
              <div><strong>User:</strong> {typeof window !== 'undefined' ? localStorage.getItem('user') : 'Loading...'}</div>
              <div><strong>Users:</strong> {typeof window !== 'undefined' ? localStorage.getItem('users') : 'Loading...'}</div>
              <div><strong>Orders:</strong> {typeof window !== 'undefined' ? localStorage.getItem('ordersState') : 'Loading...'}</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={loginTestUser}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Create & Login Test User
            </button>
            
            <button 
              onClick={showStorageData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Log Storage Data to Console
            </button>
            
            <button 
              onClick={simulateOrder}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Create Test Order
            </button>
            
            <button 
              onClick={clearAllData}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear All Data & Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
