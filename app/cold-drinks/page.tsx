"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Snowflake } from 'lucide-react'
import { ALL_FOOD_ITEMS } from '../../lib/foodData'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { useUser } from '@/components/user-context'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const drinks = ALL_FOOD_ITEMS.filter(item => item.category === 'Cold Drinks')
// const categories = [...new Set(drinks.map(drink => drink.category))]

const categories = [...new Set(drinks.map(drink => drink.category))]

export default function MenuPage() {
  const { addItem } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  
  const handleAddToCart = (product: any) => {
    addItem(product)
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    })
  }

  const handleOrderClick = (itemId: number) => {
    if (!user) {
      toast({
        title: "Please log in to place your order.",
        description: "You need to be logged in to place an order.",
        duration: 3000,
        variant: "destructive"
      })
      return
    }
    router.push(`/order-now?dishId=${itemId}`)
  }
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Snowflake className="text-blue-500 mr-2 sm:mr-3" size={32} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text">
              Cold Drinks
            </h1>
            <Snowflake className="text-blue-500 ml-2 sm:ml-3" size={32} />
          </div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Beat the heat with our refreshing collection of cold beverages, perfect for any time of the day
          </p>
        </div>

        {/* Drinks by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center" style={{ color: '#CF9FFF' }}>
              {category}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {drinks
                .filter((drink: any) => drink.category === category)
                .map((drink) => (
                  <div key={drink.id} className="food-card rounded-xl p-3 sm:p-4 lg:p-6 card-hover">
                    <div className="relative mb-3 sm:mb-4">
                      <Image
                        src={drink.image || "/placeholder.svg"}
                        alt={drink.name}
                        width={200}
                        height={200}
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-lg"
                        loading="eager"
                        unoptimized
                      />
                      <div className="absolute top-2 right-2 bg-[#CF9FFF] text-white px-2 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        ₹{drink.price}
                      </div>
                    </div>
                    
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 text-center line-clamp-2">
                      {drink.name}
                    </h3>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-lg sm:text-xl font-bold" style={{ color: '#CF9FFF' }}>
                        ₹{drink.price}
                      </div>
                      <div className='flex gap-1 sm:gap-2 flex-col w-full'>
                      <button 
                        onClick={() => handleOrderClick(drink.id)}
                        className="text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-1 text-xs sm:text-sm w-full"
                        style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                      >
                        <ShoppingCart size={12} />
                        <span>Order</span>
                      </button>
                      <Button
                  variant="default"
                  className="text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 w-full text-xs sm:text-sm"
                  style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                  onClick={() => handleAddToCart(drink)}
                >
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                  Add to Cart
                </Button>
                </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
