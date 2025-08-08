'use client';

import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CartSidebar() {
  const { state, removeItem, updateQuantity, clearCart, setCartOpen } = useCart()
  const router = useRouter()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    // Implement checkout logic here
    alert("Proceeding to checkout...")
  }

  const handleConfirmOrder = () => {
    // Convert cart items to query parameters and navigate to order page
    const cartItemIds = state.items.map(item => `cartItem=${encodeURIComponent(item.id)}`).join('&')
    const quantities = state.items.map(item => `quantity=${item.quantity}`).join('&')
    
    setCartOpen(false)
    router.push(`/order-now?fromCart=true&${cartItemIds}&${quantities}`)
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
            {state.items.length > 0 && (
              <Badge variant="secondary">
                {state.items.reduce((total, item) => total + item.quantity, 0)} items
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button 
                  onClick={() => setCartOpen(false)}
                  className="bg-[#CF9FFF]  hover:bg-[#9163be]"
                >
                  Order Now
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </p>
                        <p className="text-sm font-medium text-purple-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-[#dc262660]"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 hover:bg-[#53af4c6a] "
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-[#dc2626e3] hover:bg-[#dc262660] "
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-purple-600">
                    ${state.total.toFixed(2)}
                  </span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className=" w-full bg-[#CF9FFF] hover:bg-[#9163be]"
                    size="lg"
                  >
                    Checkout
                  </Button>
                  
                  <Button 
                    onClick={handleConfirmOrder}
                    className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
                    size="lg"
                  >
                    Confirm My Order
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full bg-[#CF9FFF]  hover:bg-[#9163be]"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
