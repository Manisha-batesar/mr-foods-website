import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Snowflake } from 'lucide-react'

const drinks = [
  // Soft Drinks
  { id: 1, name: 'Coca Cola', price: 49, category: 'Soft Drinks', image: "/images/cocacola.jpg" },
  { id: 2, name: 'Pepsi', price: 49, category: 'Soft Drinks', image: '/images/pepsi.jpg' },
  { id: 3, name: 'Sprite', price: 49, category: 'Soft Drinks', image: '/images/sprite.jpg' },
  { id: 4, name: 'Fanta Orange', price: 49, category: 'Soft Drinks', image: '/images/fenta.jpg' },
  { id: 5, name: 'Mountain Dew', price: 49, category: 'Soft Drinks', image:'/images/mountaindew.jpg' },
  { id: 6, name: 'Thumbs Up', price: 49, category: 'Soft Drinks', image:'/images/thumsup.jpg'},
  
  // Coffee
  { id: 7, name: 'Cappuccino', price: 89, category: 'Coffee', image: '/images/cappuccino.jpg' },
  { id: 8, name: 'Latte', price: 99, category: 'Coffee', image: '/images/latte.jpg' },
  { id: 9, name: 'Espresso', price: 79, category: 'Coffee', image:'/images/espresso.jpg' },
  { id: 10, name: 'Americano', price: 89, category: 'Coffee', image: '/images/americano.jpg' },
  { id: 11, name: 'Iced Coffee', price: 109, category: 'Coffee', image: '/images/iced Coffee.jpg' },
  { id: 12, name: 'Cold Brew', price: 119, category: 'Coffee', image: '/images/Cold Brew.jpg' },
  
  // Mojitos
  { id: 13, name: 'Classic Mojito', price: 129, category: 'Mojitos', image: '/images/classic mojito.jpg?height=200&width=200' },
  { id: 14, name: 'Strawberry Mojito', price: 149, category: 'Mojitos', image:  '/images/Strawberry Mojito.jpg?height=200&width=200' },
  { id: 15, name: 'Mango Mojito', price: 149, category: 'Mojitos', image:  '/images/Mango Mojito.jpg?height=200&width=200' },
  { id: 16, name: 'Blue Curacao Mojito', price: 159, category: 'Mojitos', image:  '/images/Blue Curacao Mojito.jpg?height=200&width=200' },
  { id: 17, name: 'Virgin Mojito', price: 119, category: 'Mojitos', image:  '/images/Virgin Mojito.jpg?height=200&width=200' },
  
  // Additional Drinks
  { id: 18, name: 'Fresh Lime Soda', price: 69, category: 'Fresh Drinks', image:  '/images/Fresh Lime Soda.jpg?height=200&width=200' },
  { id: 19, name: 'Mango Lassi', price: 89, category: 'Fresh Drinks', image: '/images/Mango Lassi.jpg?height=200&width=200' },
  { id: 20, name: 'Iced Tea', price: 79, category: 'Fresh Drinks', image:  '/images/Iced Tea.jpg?height=200&width=200' },
]

export default function ColdDrinksPage() {
  const categories = [...new Set(drinks.map(drink => drink.category))]

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
                        href="/order-now"
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
