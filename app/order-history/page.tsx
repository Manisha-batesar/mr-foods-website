"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/user-context'
import { useOrders } from '@/components/orders-context'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function OrderHistoryPage() {
  const router = useRouter()
  const { user } = useUser()
  const { orders } = useOrders()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-2">You have not ordered anything yet.</p>
            <p className="text-gray-500">Your order history will appear here once you place an order.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge variant={
                    order.status === 'completed' ? 'default' :
                    order.status === 'cancelled' ? 'destructive' : 
                    'secondary'
                  }>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.image && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden mr-4">
                            <Image
                              src={item.image}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-xl font-bold">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}