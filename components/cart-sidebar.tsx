'use client';

import { useCart } from "@/components/cart-context"
import { useUser } from "@/components/user-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

export function CartSidebar() {
  const { state, removeItem, updateQuantity, clearCart, setCartOpen } = useCart()
  const { user } = useUser()
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
    if (!user) {
      toast({
        title: "Please log in to place your order.",
        description: "You need to be logged in to place an order.",
        duration: 3000,
        variant: "destructive"
      })
      return
    }
    setCartOpen(false)
    router.push(`/order-now`)
    // Don't clear cart here - it will be cleared after successful order confirmation
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg p-4 bg-gradient-to-br from-purple-50 to-white rounded-l-2xl shadow-2xl border-l border-purple-100 flex flex-col min-h-screen">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg font-bold text-purple-700">
            <ShoppingBag className="h-5 w-5 text-purple-400" />
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
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
                <ShoppingBag className="h-10 w-10 text-purple-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button 
                  onClick={() => setCartOpen(false)}
                  className="bg-[#CF9FFF] hover:bg-[#9163be] px-4 py-2 text-sm shadow"
                >
                  Order Now
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-2 custom-scrollbar">
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow border border-purple-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-md border border-purple-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate text-base">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ₹{item.price.toFixed(2)} each
                        </p>
                        <p className="text-xs font-medium text-purple-600">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 hover:bg-purple-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center font-medium text-base">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 hover:bg-purple-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-100"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4 mt-4 space-y-3 bg-white rounded-xl shadow-lg sticky bottom-6 z-20 mx-[-16px] px-4 pb-4 flex flex-col" style={{boxShadow:'0 8px 32px 0 rgba(207,159,255,0.10)'}}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-semibold text-gray-700">Total:</span>
                  <span className="text-xl font-bold text-purple-600">
                    ₹{state.total.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="space-y-2 mt-2">
                  <Button 
                    onClick={handleConfirmOrder}
                    className="w-full text-white font-semibold transition-all duration-300 transform hover:scale-105 text-base py-3 rounded-lg shadow-md bg-gradient-to-r from-[#CF9FFF] to-[#B87FFF]"
                    size="lg"
                  >
                    Confirm My Order
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart}
                    className="w-full bg-[#F3E8FF] hover:bg-[#E9D5FF] text-base py-3 rounded-lg border border-purple-200"
                    size="lg"
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
