"use client"

import { useState } from 'react'
import { useUser } from '@/components/user-context'
import { useOrders } from '@/components/orders-context'
import { toast } from '@/hooks/use-toast'

export default function TestPage() {
  const { user, setUser } = useUser()
  const { orders, addOrder } = useOrders()
  const [testResult, setTestResult] = useState('')

  const runFullTest = () => {
    setTestResult('Starting test...\n')
    
    // Step 1: Create a test user
    const testUser = {
      firstName: 'Test',
      lastName: 'User', 
      initials: 'TU',
      username: 'testuser',
      password: 'password',
      fullName: 'Test User'
    }
    
    setTestResult(prev => prev + 'Step 1: Setting user...\n')
    setUser(testUser)
    
    setTimeout(() => {
      setTestResult(prev => prev + 'Step 2: User set, creating order...\n')
      
      // Step 2: Create a test order
      const testOrder = {
        id: `TEST-${Date.now()}`,
        date: new Date().toISOString(),
        items: [{
          id: '1',
          name: 'Test Burger',
          price: 120,
          quantity: 1,
          image: '',
          category: 'Test Food'
        }],
        total: 120,
        status: 'pending' as const,
        orderTime: Date.now(),
        username: testUser.username,
        customerName: testUser.fullName
      }
      
      setTestResult(prev => prev + 'Step 3: Adding order...\n')
      addOrder(testOrder)
      
      setTimeout(() => {
        setTestResult(prev => prev + `Step 4: Test complete!\nUser: ${user?.username}\nOrders: ${orders.length}\nResult: ${orders.length > 0 ? 'SUCCESS' : 'FAILED'}\n`)
        
        if (orders.length > 0) {
          toast({
            title: "Test Successful!",
            description: "Order system is working. Check order history.",
            variant: "default"
          })
        } else {
          toast({
            title: "Test Failed",
            description: "Order was not added. Check console for errors.",
            variant: "destructive"
          })
        }
      }, 500)
    }, 500)
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">System Test</h1>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Current Status:</h2>
            <p><strong>User:</strong> {user ? `${user.fullName} (${user.username})` : 'Not logged in'}</p>
            <p><strong>Orders:</strong> {orders.length} orders found</p>
          </div>

          {orders.length > 0 && (
            <div className="bg-green-50 p-4 rounded">
              <h2 className="text-xl font-bold mb-2">Your Orders:</h2>
              {orders.map(order => (
                <div key={order.id} className="border-b py-2">
                  <p><strong>#{order.id}</strong></p>
                  <p>Customer: {order.customerName}</p>
                  <p>Total: ₹{order.total}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded">
            <h2 className="text-xl font-bold mb-2">Test Output:</h2>
            <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
          </div>
          
          <div className="space-x-4">
            <button
              onClick={runFullTest}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
            >
              Run Full System Test
            </button>
            
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
            >
              Clear All & Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
