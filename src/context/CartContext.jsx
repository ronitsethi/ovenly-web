/**
 * Cart Context — manages Shopify cart state using the Storefront API directly.
 * Provides add/update/remove/checkout operations and persists cart ID in localStorage.
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { shopifyFetch } from '../lib/shopify'
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
} from '../lib/queries'

const CartContext = createContext(null)

const CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        totalAmount { amount currencyCode }
        subtotalAmount { amount currencyCode }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
                image { url altText }
                product { title handle }
              }
            }
          }
        }
      }
    }
  }
`

function parseCart(cart) {
  if (!cart) return null
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity || 0,
    cost: cart.cost,
    lines: (cart.lines?.edges || []).map(({ node }) => ({
      id: node.id,
      quantity: node.quantity,
      variantId: node.merchandise?.id,
      variantTitle: node.merchandise?.title,
      price: node.merchandise?.price,
      image: node.merchandise?.image,
      productTitle: node.merchandise?.product?.title,
      productHandle: node.merchandise?.product?.handle,
    })),
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  // Load existing cart on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('ovenly_cart_id')
    if (savedCartId) {
      shopifyFetch(CART_QUERY, { cartId: savedCartId })
        .then(data => {
          if (data?.cart) {
            setCart(parseCart(data.cart))
          } else {
            localStorage.removeItem('ovenly_cart_id')
          }
        })
        .catch(() => localStorage.removeItem('ovenly_cart_id'))
    }
  }, [])

  const showNotification = useCallback((message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 2500)
  }, [])

  const addToCart = useCallback(async (variantId, quantity = 1) => {
    setIsLoading(true)
    try {
      if (!cart) {
        // Create new cart
        const data = await shopifyFetch(CART_CREATE_MUTATION, {
          input: {
            lines: [{ merchandiseId: variantId, quantity }],
          },
        })
        const newCart = data?.cartCreate?.cart
        if (newCart) {
          localStorage.setItem('ovenly_cart_id', newCart.id)
          setCart(parseCart(newCart))
          showNotification('Added to cart ✦')
          setIsCartOpen(true)
        }
      } else {
        // Add to existing cart
        const data = await shopifyFetch(CART_LINES_ADD_MUTATION, {
          cartId: cart.id,
          lines: [{ merchandiseId: variantId, quantity }],
        })
        const updatedCart = data?.cartLinesAdd?.cart
        if (updatedCart) {
          setCart(parseCart(updatedCart))
          showNotification('Added to cart ✦')
          setIsCartOpen(true)
        }
      }
    } catch (err) {
      console.error('Add to cart error:', err)
      showNotification('Failed to add — try again')
    } finally {
      setIsLoading(false)
    }
  }, [cart, showNotification])

  const updateQuantity = useCallback(async (lineId, quantity) => {
    if (!cart) return
    setIsLoading(true)
    try {
      if (quantity <= 0) {
        // Remove line
        const data = await shopifyFetch(CART_LINES_REMOVE_MUTATION, {
          cartId: cart.id,
          lineIds: [lineId],
        })
        const updatedCart = data?.cartLinesRemove?.cart
        if (updatedCart) setCart(parseCart(updatedCart))
      } else {
        // Update quantity
        const data = await shopifyFetch(CART_LINES_UPDATE_MUTATION, {
          cartId: cart.id,
          lines: [{ id: lineId, quantity }],
        })
        const updatedCart = data?.cartLinesUpdate?.cart
        if (updatedCart) setCart(parseCart(updatedCart))
      }
    } catch (err) {
      console.error('Update quantity error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const data = await shopifyFetch(CART_LINES_REMOVE_MUTATION, {
        cartId: cart.id,
        lineIds: [lineId],
      })
      const updatedCart = data?.cartLinesRemove?.cart
      if (updatedCart) setCart(parseCart(updatedCart))
    } catch (err) {
      console.error('Remove item error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    }
  }, [cart])

  const totalQuantity = cart?.totalQuantity || 0

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        checkout,
        totalQuantity,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
