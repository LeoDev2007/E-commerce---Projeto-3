import { createContext, useEffect, useState } from 'react'
import { doc, getDoc, setDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'
import type { CartItem } from '../types'

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isInCart: (itemId: number) => boolean
  total: number
}

const CartContext = createContext<CartContextType>({} as CartContextType)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const [cart, setCart] = useState<CartItem[]>([])

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  useEffect(() => {
    if (!user) {
      setCart([])
      return
    }

    const fetchCart = async () => {
      const docRef = doc(db, 'cart', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setCart(docSnap.data().items ?? [])
      }
    }

    fetchCart()
  }, [user])

  const addToCart = async (item: CartItem) => {
    if (!user) return
    const docRef = doc(db, 'cart', user.uid)
    await setDoc(docRef, { items: arrayUnion(item) }, { merge: true })
    setCart(prev => [...prev, item])
  }

  const removeFromCart = async (itemId: number) => {
    if (!user) return
    const updatedCart = cart.filter(i => i.id !== itemId)
    const docRef = doc(db, 'cart', user.uid)
    await setDoc(docRef, { items: updatedCart })
    setCart(updatedCart)
  }

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!user) return
    const updatedCart = cart.map(i =>
      i.id === itemId ? { ...i, quantity, price: i.unitPrice * quantity } : i
    )
    const docRef = doc(db, 'cart', user.uid)
    await setDoc(docRef, { items: updatedCart })
    setCart(updatedCart)
  }

  const clearCart = async () => {
    if (!user) return
    const docRef = doc(db, 'cart', user.uid)
    await setDoc(docRef, { items: [] })
    setCart([])
  }

  const isInCart = (itemId: number) => cart.some(i => i.id === itemId)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }