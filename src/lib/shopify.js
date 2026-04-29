/**
 * Shopify Storefront API Client
 * Uses @shopify/hydrogen-react for client creation
 */
import { createStorefrontClient } from '@shopify/hydrogen-react'

const client = createStorefrontClient({
  storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
  storefrontApiVersion: import.meta.env.VITE_SHOPIFY_API_VERSION,
})

export const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
export const publicToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
export const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION

/**
 * Execute a GraphQL query against the Storefront API
 * @param {string} query - GraphQL query string
 * @param {Object} variables - Query variables
 * @returns {Promise<Object>} - Response data
 */
export async function shopifyFetch(query, variables = {}) {
  const url = client.getStorefrontApiUrl()
  const headers = client.getPublicTokenHeaders()

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`Storefront API error: ${response.status} ${response.statusText}`)
    }

    const json = await response.json()

    if (json.errors) {
      console.error('Storefront API GraphQL errors:', json.errors)
      throw new Error(json.errors.map(e => e.message).join(', '))
    }

    return json.data
  } catch (error) {
    console.error('Shopify fetch error:', error)
    throw error
  }
}

export default client
