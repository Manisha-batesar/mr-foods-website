"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { FOOD_CATEGORIES } from '../../lib/foodData'
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'
import { useUser } from '@/components/user-context'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const categories = FOOD_CATEGORIES

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
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">
            Our Delicious Menu
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our carefully curated selection of authentic dishes from different cuisines
          </p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.filter((cat) => !cat.hideOnMenupage).map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${selectedCategory.id === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-white border-2 hover:bg-opacity-90'
                }`}
              style={{
                background: selectedCategory.id === category.id
                  ? 'linear-gradient(135deg, #CF9FFF, #B87FFF)'
                  : 'white',
                color: selectedCategory.id === category.id
                  ? 'white'
                  : '#CF9FFF',
                borderColor: '#CF9FFF'
              }}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Selected Category Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold" style={{ color: '#CF9FFF' }}>
            {selectedCategory.title}
          </h2>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory.items.map((item) => (
            <div key={item.id} className="food-card rounded-xl p-6 card-hover">
              <div className="relative mb-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: '#CF9FFF' }}>
                  ₹{item.price}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>

              <div className="flex flex-col gap-2 items-end">
                <div className="flex items-center justify-between w-full">
                  <div className="text-2xl font-bold" style={{ color: '#CF9FFF' }}>
                    ₹{item.price}
                  </div>
                  <div className='flex gap-3 flex-col'>
                  <button
                    onClick={() => handleOrderClick(item.id)}
                    className="text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                  >
                    <ShoppingCart size={16} />
                    <span>Order Now</span>
                  </button>
                   <Button
                  variant="default"
                  className="text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full"
                  style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                </div>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
