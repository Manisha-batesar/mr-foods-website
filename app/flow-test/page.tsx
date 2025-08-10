"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/user-context'
import { useOrders } from '@/components/orders-context'

export default function FlowTestPage() {
  const router = useRouter()
  const { user, setUser } = useUser()
  const { orders, addOrder } = useOrders()
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    console.log(logMessage)
    setLogs(prev => [...prev, logMessage])
  }

  useEffect(() => {
    addLog('🔍 FlowTest: Component mounted')
    addLog(`🔍 FlowTest: User: ${user ? user.username : 'null'}`)
    addLog(`🔍 FlowTest: Orders count: ${orders.length}`)
  }, [])

  useEffect(() => {
    addLog(`👤 FlowTest: User changed to: ${user ? user.username : 'null'}`)
  }, [user])

  useEffect(() => {
    addLog(`📦 FlowTest: Orders count changed to: ${orders.length}`)
  }, [orders.length])

  const createTestUser = () => {
    addLog('🚀 Creating test user...')
    const testUser = {
      firstName: 'Flow',
      lastName: 'Tester',
      initials: 'FT',
      username: 'flowtest123',
      password: 'password',
      fullName: 'Flow Tester'
    }
    
    setUser(testUser)
    addLog(`✅ Test user created: ${testUser.username}`)
  }

  const createTestOrder = () => {
    if (!user) {
      addLog('❌ Cannot create order - no user logged in')
      return
    }

    addLog('🛒 Creating test order...')
    const testOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: [{
        id: '1',
        name: 'Flow Test Burger',
        price: 199,
        quantity: 1,
        image: '',
        category: 'Test Food'
      }],
      total: 199,
      status: 'pending' as const,
      orderTime: Date.now(),
      username: user.username,
      customerName: user.fullName || `${user.firstName} ${user.lastName}`
    }

    addOrder(testOrder)
    addLog(`✅ Test order created: ${testOrder.id}`)
  }

  const checkLocalStorage = () => {
    addLog('🔍 Checking localStorage...')
    const userStr = localStorage.getItem('user')
    const ordersStr = localStorage.getItem('ordersState')
    
    addLog(`📱 localStorage user: ${userStr ? 'exists' : 'null'}`)
    addLog(`📱 localStorage orders: ${ordersStr ? 'exists' : 'null'}`)
    
    if (userStr) {
      try {
        const parsedUser = JSON.parse(userStr)
        addLog(`📱 Parsed user: ${parsedUser.username}`)
      } catch (e) {
        addLog('❌ Error parsing user from localStorage')
      }
    }
    
    if (ordersStr) {
      try {
        const parsedOrders = JSON.parse(ordersStr)
        addLog(`📱 Parsed orders count: ${parsedOrders.orders?.length || 0}`)
      } catch (e) {
        addLog('❌ Error parsing orders from localStorage')
      }
    }
  }

  const clearAllData = () => {
    addLog('🧹 Clearing all data...')
    localStorage.clear()
    setUser(null)
    // Force page reload to reset contexts
    window.location.reload()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Complete Flow Test</h1>
        
        {/* Current State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h2 className="font-bold text-blue-800 mb-2">👤 Current User</h2>
            {user ? (
              <div className="text-sm text-blue-700">
                <p>Username: {user.username}</p>
                <p>Full Name: {user.fullName || `${user.firstName} ${user.lastName}`}</p>
              </div>
            ) : (
              <p className="text-sm text-blue-700">No user logged in</p>
            )}
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h2 className="font-bold text-green-800 mb-2">📦 Current Orders</h2>
            <p className="text-sm text-green-700">Count: {orders.length}</p>
            {orders.map(order => (
              <div key={order.id} className="text-xs text-green-600 mt-1">
                {order.id} - {order.customerName} - ₹{order.total}
              </div>
            ))}
          </div>
        </div>

        {/* Test Actions */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold">Test Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={createTestUser}
              className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
            >
              1. Create Test User
            </button>
            
            <button
              onClick={createTestOrder}
              className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              disabled={!user}
            >
              2. Create Test Order
            </button>
            
            <button
              onClick={checkLocalStorage}
              className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 font-medium"
            >
              3. Check localStorage
            </button>
            
            <button
              onClick={() => router.push('/order-history')}
              className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-medium"
            >
              4. View Order History
            </button>
            
            <button
              onClick={() => router.push('/order-now')}
              className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-medium"
              disabled={!user}
            >
              5. Order Now Page
            </button>
            
            <button
              onClick={clearAllData}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
            >
              Clear All Data
            </button>
          </div>
        </div>

        {/* Live Logs */}
        <div className="bg-gray-50 border p-4 rounded-lg">
          <h2 className="font-bold mb-4">Live Logs (also check browser console)</h2>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
            {logs.length === 0 && (
              <div className="text-gray-500">No logs yet...</div>
            )}
          </div>
        </div>
        
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <h3 className="font-bold mb-2">🧪 Test Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Create Test User" - should see user info appear above</li>
            <li>Click "Create Test Order" - should see order count increase</li>
            <li>Click "Check localStorage" - should confirm data is saved</li>
            <li>Click "View Order History" - should see the test order displayed</li>
            <li>Open browser console (F12) to see detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
