"use client"

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react'
import { CartItem } from './cart-context'

export interface OrderItem extends CartItem {}

export interface Order {
  id: string
  date: string
  items: OrderItem[]
  total: number
  status: 'completed' | 'pending' | 'cancelled'
}

interface OrdersState {
  orders: Order[]
}

type OrdersAction =
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'CLEAR_ORDERS' }

const ordersReducer = (state: OrdersState, action: OrdersAction): OrdersState => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
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
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const loadOrdersState = (): OrdersState => {
  if (typeof window === 'undefined') {
    return { orders: [] }
  }
  
  const savedState = localStorage.getItem('ordersState')
  if (savedState) {
    return JSON.parse(savedState)
  }
  
  return { orders: [] }
}

const saveOrdersState = (state: OrdersState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ordersState', JSON.stringify(state))
  }
}

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ordersReducer, loadOrdersState())

  useEffect(() => {
    saveOrdersState(state)
  }, [state])

  const addOrder = (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order })
  }

  const clearOrders = () => {
    dispatch({ type: 'CLEAR_ORDERS' })
  }

  return (
    <OrdersContext.Provider value={{
      orders: state.orders,
      addOrder,
      clearOrders
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