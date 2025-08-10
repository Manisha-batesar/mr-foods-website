"use client"

import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react'
import { CartItem } from './cart-context'
import { useUser } from './user-context'

export interface OrderItem extends CartItem {}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: 'completed' | 'pending' | 'cancelled'
  orderTime?: number
  username: string // associate order with user
  customerName: string // display name of the user
}

interface OrdersState {
  orders: Order[]
}

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'CLEAR_ORDERS' }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }

const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      }
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        )
      }
    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: []
      }
    default:
      return state
  }
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Order) => void
  clearOrders: () => void
  updateOrderStatus: (id: string, status: Order['status']) => void
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const loadOrdersState = (): OrdersState => {
  if (typeof window === 'undefined') {
    return { orders: [] }
  }
  
  const savedState = localStorage.getItem('ordersState')
  if (savedState) {
    const parsedState = JSON.parse(savedState)
    console.log('OrdersContext: Loaded from localStorage:', parsedState);
    return parsedState
  }
  
  console.log('OrdersContext: No saved state, returning empty orders');
  return { orders: [] }
}

const saveOrdersState = (state: OrdersState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ordersState', JSON.stringify(state))
  }
}

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ordersReducer, loadOrdersState())
  const { user } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    saveOrdersState(state)
  }, [state])

  // Track when user data has been loaded (including null for no user)
  useEffect(() => {
    // Give a small delay to ensure user context has initialized
    const timer = setTimeout(() => {
      setIsUserLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const addOrder = (order: Order) => {
    console.log('📦 OrdersContext: Adding order:', order);
    console.log('📦 OrdersContext: Current user:', user?.username);
    dispatch({ type: 'ADD_ORDER', payload: order })
  }

  const clearOrders = () => {
    dispatch({ type: 'CLEAR_ORDERS' })
  }

  const updateOrderStatus = (id: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id, status } })
  }

  // Auto-update pending orders to completed after 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      state.orders.forEach(order => {
        if (order.status === 'pending' && order.orderTime && now - order.orderTime >= 15 * 60 * 1000) {
          updateOrderStatus(order.id, 'completed')
        }
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [state.orders])

  // Only filter orders if user context has loaded
  const filteredOrders = isUserLoaded && user 
    ? state.orders.filter(order => order.username === user.username) 
    : isUserLoaded 
    ? [] // No user logged in
    : state.orders; // Still loading user context, show all orders temporarily
  
  // Debug logging
  useEffect(() => {
    if (isUserLoaded) {
      console.log('📦 OrdersContext: User loaded. Username:', user?.username, 'Total orders:', state.orders.length, 'Filtered orders:', filteredOrders.length);
      console.log('📦 OrdersContext: All orders:', state.orders.map(o => ({ id: o.id, username: o.username, customerName: o.customerName })));
    }
  }, [isUserLoaded, user, state.orders, filteredOrders.length]);

  return (
    <OrdersContext.Provider value={{
      orders: filteredOrders,
      addOrder,
      clearOrders,
      updateOrderStatus
    }}>
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider')
  }
  return context
}