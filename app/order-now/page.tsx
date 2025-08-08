"use client"

import { useState, useEffect } from 'react'
import { Check, ShoppingCart, User, Hash, CheckCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ALL_FOOD_ITEMS } from '../../lib/foodData'
import { useCart } from '@/components/cart-context'

// Combined menu items from both food and drinks
const allItems = ALL_FOOD_ITEMS

export default function OrderNowPage() {
  const router = useRouter();
  const { state: cartState, clearCart } = useCart();
  
  const [customerName, setCustomerName] = useState('')
  const [numberOfPlates, setNumberOfPlates] = useState(1)
  const [selectedItems, setSelectedItems] = useState<{[key: number]: boolean}>({})
  const [totalBill, setTotalBill] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Initialize selected items and total from cart
  useEffect(() => {
    if (cartState.items.length > 0) {
      const cartSelections: {[key: number]: boolean} = {};
      cartState.items.forEach(item => {
        cartSelections[parseInt(item.id)] = true;
      });
      setSelectedItems(cartSelections);
      setTotalBill(cartState.total);
    }
  }, [cartState.items, cartState.total]);

  const handleItemToggle = (itemId: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleConfirmOrder = () => {
    const hasValidData = customerName.trim() && Object.values(selectedItems).some(selected => selected);
    if (hasValidData) {
      setShowConfirmation(true)
      // Clear the cart immediately after successful order
      clearCart()
      // Reset form after 15 seconds
      setTimeout(() => {
        setShowConfirmation(false)
        setCustomerName('')
        setNumberOfPlates(1)
        setSelectedItems({})
      }, 15000)
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setCustomerName('')
    setNumberOfPlates(1)
    setSelectedItems({})
  }

  const categories = [...new Set(allItems.map(item => item.category))]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart style={{ color: '#CF9FFF' }} className="mr-3" size={40} />
            <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
              Confirm Your Cart Order
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Review your cart items and confirm your order
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Navigation buttons for easy access */}
          {!showConfirmation && (
            <div className="mb-6 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center space-x-2"
              >
                <span>🏠</span>
                <span>Home</span>
              </button>
              <button
                onClick={() => router.push('/menu')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center space-x-2"
              >
                <span>🍽️</span>
                <span>Menu</span>
              </button>
              <button
                onClick={() => router.push('/cold-drinks')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 flex items-center space-x-2"
              >
                <span>🥤</span>
                <span>Cold Drinks</span>
              </button>
            </div>
          )}

          {/* Customer Details - Always show, but pre-filled when coming from cart */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: '#CF9FFF' }}>
              <User className="mr-3" size={24} />
              Customer Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{ 
                    borderColor: '#CF9FFF'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#B87FFF'}
                  onBlur={(e) => e.target.style.borderColor = '#CF9FFF'}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Number of Plates *
                </label>
                <div className="flex items-center space-x-3">
                  <Hash style={{ color: '#CF9FFF' }} size={20} />
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={numberOfPlates}
                    onChange={(e) => setNumberOfPlates(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
                    disabled={true}
                    style={true ? { backgroundColor: '#f9fafb', color: '#6b7280' } : {}}
                  />
                </div>
                {true && (
                  <p className="text-sm text-gray-500 mt-1">Plates calculated based on cart quantities</p>
                )}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#CF9FFF' }}>
              Your Selected Items
            </h2>
            
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 bg-purple-50 px-4 py-2 rounded-lg">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {allItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center justify-between p-4 border-2 rounded-lg transition-all duration-300 ${
                          selectedItems[item.id]
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                        } cursor-pointer`}
                      >
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedItems[item.id] || false}
                            onChange={() => handleItemToggle(item.id)}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 border-2 rounded mr-3 flex items-center justify-center ${
                            selectedItems[item.id]
                              ? 'text-white'
                              : 'border-gray-300'
                          }`}
                          style={{
                            borderColor: selectedItems[item.id] ? '#CF9FFF' : '#d1d5db',
                            backgroundColor: selectedItems[item.id] ? '#CF9FFF' : 'transparent'
                          }}>
                            {selectedItems[item.id] && (
                              <Check className="text-white" size={14} />
                            )}
                          </div>
                          <span className="font-medium text-gray-800">
                            {item.name}
                          </span>
                          {true && (
                            <span className="ml-2 text-sm text-purple-600 font-semibold">
                              {(() => {
                                const itemIndex = cartState.items.findIndex(cartItem => parseInt(cartItem.id) === item.id);
                                const quantity = itemIndex >= 0 ? (cartState.items[itemIndex].quantity ? parseInt(String(cartState.items[itemIndex].quantity)) : 1) : 0;
                                return quantity > 0 ? `×${quantity}` : '';
                              })()}
                            </span>
                          )}
                        </div>
                        <span className="font-bold" style={{ color: '#CF9FFF' }}>
                          ₹{item.price}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#CF9FFF' }}>Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Number of Plates:</span>
                <span className="font-semibold">
                  As per item quantities
                </span>
              </div>
              <div className="flex justify-between">
                <span>Selected Items:</span>
                <span className="font-semibold">
                  {cartState.items.length}
                </span>
              </div>
              <div className="border-t border-purple-200 pt-2 mt-4">
                <div className="flex justify-between text-xl font-bold" style={{ color: '#CF9FFF' }}>
                  <span>Total Bill:</span>
                  <span>₹{totalBill}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button
            onClick={handleConfirmOrder}
            disabled={!customerName.trim() || !Object.values(selectedItems).some(selected => selected)}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
              customerName.trim() && Object.values(selectedItems).some(selected => selected)
                ? 'text-white shadow-lg hover:shadow-xl cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{
              background: customerName.trim() && Object.values(selectedItems).some(selected => selected)
                ? 'linear-gradient(135deg, #CF9FFF, #B87FFF)'
                : undefined
            }}
          >
            Confirm Order - ₹{totalBill}
          </button>
        </div>

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 order-popup shadow-2xl border-4 relative" 
                 style={{ borderColor: '#CF9FFF' }}>
              {/* Close Button */}
              <button
                onClick={handleCloseConfirmation}
                className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Close confirmation"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              
              <div className="text-center">
                {/* Cute animated checkmark */}
                <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-white" size={32} />
                </div>
                
                {/* Main heading */}
                <h3 className="text-2xl font-bold mb-3 gradient-text">
                  Order Confirmed! 🎉
                </h3>
                
                {/* Customer name */}
                <p className="text-lg text-gray-700 mb-3">
                  Thank you, <span className="font-bold" style={{ color: '#CF9FFF' }}>{customerName}</span>! ❤️
                </p>
                
                {/* Ready time message */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-3 border-2 border-purple-200">
                  <p className="text-purple-800 font-bold text-sm mb-1">
                    Your delicious food will be ready in
                  </p>
                  <div className="text-2xl font-bold mb-1" style={{ color: '#CF9FFF' }}>
                    15 Minutes
                  </div>
                  <p className="text-purple-700 text-xs">
                    We're preparing it with love! 👨‍🍳✨
                  </p>
                </div>
                
                {/* Order details */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <p className="text-gray-600 text-xs mb-1">Order Summary:</p>
                  <p className="text-sm font-bold text-gray-800">
                    {cartState.items.length} items from cart
                  </p>
                  <p className="text-lg font-bold text-purple-600">
                    Total: ₹{totalBill}
                  </p>
                </div>
                
                {/* Navigation buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      handleCloseConfirmation();
                      router.push('/');
                    }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Go to Home
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        handleCloseConfirmation();
                        router.push('/menu');
                      }}
                      className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200"
                    >
                      Browse Menu
                    </button>
                    <button
                      onClick={() => {
                        handleCloseConfirmation();
                        router.push('/cold-drinks');
                      }}
                      className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-200"
                    >
                      Cold Drinks
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
