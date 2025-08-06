import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Snowflake } from 'lucide-react'
import { ALL_FOOD_ITEMS } from '../../lib/foodData'

const drinks = ALL_FOOD_ITEMS.filter(item => item.category === 'Cold Drinks')
const categories = [...new Set(drinks.map(drink => drink.category))]

export default function ColdDrinksPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Snowflake className="text-blue-500 mr-3" size={40} />
            <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
              Cold Drinks
            </h1>
            <Snowflake className="text-blue-500 ml-3" size={40} />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Beat the heat with our refreshing collection of cold beverages, perfect for any time of the day
          </p>
        </div>

        {/* Drinks by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#CF9FFF' }}>
              {category}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {drinks
                .filter(drink => drink.category === category)
                .map((drink) => (
                  <div key={drink.id} className="food-card rounded-xl p-6 card-hover">
                    <div className="relative mb-4">
                      <Image
                        src={drink.image || "/placeholder.svg"}
                        alt={drink.name}
                        width={200}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        ₹{drink.price}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                      {drink.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold" style={{ color: '#CF9FFF' }}>
                        ₹{drink.price}
                      </div>
                      <Link 
                        href={`/order-now?dishId=${drink.id}`}
                        className="text-white px-3 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 text-sm"
                        style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                      >
                        <ShoppingCart size={14} />
                        <span>Order</span>
                      </Link>
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
