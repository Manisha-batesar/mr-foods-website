"use client"

export default function SimpleTestPage() {
  const testCompleteFlow = () => {
    console.log('🚀 Starting complete flow test...')
    
    // Clear everything first
    localStorage.clear()
    console.log('🧹 Cleared localStorage')
    
    // Create test user
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      initials: 'TU',
      username: 'testuser123',
      password: 'password',
      fullName: 'Test User'
    }
    
    // Save user
    localStorage.setItem('user', JSON.stringify(testUser))
    console.log('👤 Created test user:', testUser)
    
    // Create multiple test orders
    const testOrders = [
      {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        items: [{
          id: '1',
          name: 'Test Burger',
          price: 150,
          quantity: 1,
          image: '',
          category: 'Fast Food'
        }],
        total: 150,
        status: 'pending',
        orderTime: Date.now(),
        username: testUser.username,
        customerName: testUser.fullName
      },
      {
        id: `ORD-${Date.now() + 1}`,
        date: new Date().toISOString(),
        items: [{
          id: '2',
          name: 'Test Pizza',
          price: 300,
          quantity: 1,
          image: '',
          category: 'Italian'
        }],
        total: 300,
        status: 'completed',
        orderTime: Date.now() - 1000000, // 16+ minutes ago
        username: testUser.username,
        customerName: testUser.fullName
      }
    ]
    
    const ordersState = {
      orders: testOrders
    }
    
    localStorage.setItem('ordersState', JSON.stringify(ordersState))
    console.log('🍔 Created test orders:', testOrders)
    
    alert('Complete flow test ready! Refresh the page, then navigate to order history to see the orders.')
  }
  
  const checkData = () => {
    console.log('=== CHECKING CURRENT DATA ===')
    console.log('User in localStorage:', localStorage.getItem('user'))
    console.log('Orders in localStorage:', localStorage.getItem('ordersState'))
    console.log('Current URL:', window.location.href)
    
    // Parse and display nicely
    const user = localStorage.getItem('user')
    const orders = localStorage.getItem('ordersState')
    
    if (user) {
      const parsedUser = JSON.parse(user)
      console.log('Parsed user:', parsedUser)
      alert(`User found: ${parsedUser.fullName} (${parsedUser.username})`)
    } else {
      alert('No user found in localStorage')
    }
    
    if (orders) {
      const parsedOrders = JSON.parse(orders)
      console.log('Parsed orders:', parsedOrders)
      alert(`Found ${parsedOrders.orders?.length || 0} orders`)
    } else {
      alert('No orders found in localStorage')
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Simple Test</h1>
        
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">⚠️ This is a direct localStorage test</h2>
            <p className="text-sm">This bypasses React contexts and directly writes to localStorage to test if the basic data storage works.</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={testCompleteFlow}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold block"
            >
              1. Create Test User & Orders (Complete Flow)
            </button>
            
            <button
              onClick={checkData}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold block"
            >
              2. Check Current Data (Check Console)
            </button>
            
            <a
              href="/order-history"
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold block text-center"
            >
              3. Go to Order History
            </a>
            
            <button
              onClick={() => {
                localStorage.clear()
                alert('All data cleared!')
                window.location.reload()
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold block"
            >
              Clear All Data
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Open browser console (F12 → Console)</li>
              <li>Click "Create Test User & Order" and watch console</li>
              <li>Click "Check Current Data" to verify it saved</li>
              <li>Click "Go to Order History" to see if orders show up</li>
              <li>If orders don't show up, the issue is with React contexts</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
