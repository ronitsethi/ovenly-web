import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { shopifyFetch } from '../lib/shopify'
import { PREDICTIVE_SEARCH_QUERY } from '../lib/queries'
import './SearchOverlay.css'

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef(null)
  const debounceRef = useRef(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const search = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([])
      return
    }
    setIsSearching(true)
    try {
      const data = await shopifyFetch(PREDICTIVE_SEARCH_QUERY, { query: searchQuery })
      const products = (data?.products?.edges || []).map(({ node }) => ({
        id: node.id,
        title: node.title,
        handle: node.handle,
        available: node.availableForSale,
        price: node.priceRange?.minVariantPrice,
        image: node.images?.edges?.[0]?.node,
      }))
      setResults(products)
    } catch (err) {
      console.error('Search error:', err)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleInput = (e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(val), 350)
  }

  const handleResultClick = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="search-overlay" role="dialog" aria-label="Search products">
      <div className="search-backdrop" onClick={onClose} />
      <div className="search-panel">
        <div className="search-input-wrap">
          <span className="search-icon-input" aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            type="search"
            className="search-input"
            placeholder="Search cakes, brownies, cookies…"
            value={query}
            onChange={handleInput}
            autoComplete="off"
            id="search-input"
          />
          <button className="search-close" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {/* Results */}
        <div className="search-results">
          {isSearching && (
            <div className="search-loading">
              <div className="search-spinner" />
              <span>Searching…</span>
            </div>
          )}

          {!isSearching && query.length >= 2 && results.length === 0 && (
            <div className="search-no-results">
              <span className="search-no-icon">🍰</span>
              <p>No results for "{query}"</p>
              <p className="search-no-hint">Try "chocolate", "cupcakes", or "brownies"</p>
            </div>
          )}

          {results.length > 0 && (
            <ul className="search-results-list">
              {results.map(product => (
                <li key={product.id}>
                  <Link
                    to={`/product/${product.handle}`}
                    className="search-result-item"
                    onClick={handleResultClick}
                  >
                    <div className="search-result-img">
                      {product.image ? (
                        <img src={product.image.url} alt={product.image.altText || product.title} />
                      ) : (
                        <span className="search-result-placeholder">🍰</span>
                      )}
                    </div>
                    <div className="search-result-info">
                      <p className="search-result-name">{product.title}</p>
                      {product.price && (
                        <p className="search-result-price">
                          ₹{parseFloat(product.price.amount).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                    {!product.available && (
                      <span className="search-result-badge">Sold out</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.length < 2 && !isSearching && (
            <div className="search-hints">
              <p className="search-hints-title">Popular searches</p>
              <div className="search-hints-tags">
                {['Chocolate Cake', 'Cupcakes', 'Brownies', 'Cheesecake', 'Macarons', 'Cookies'].map(tag => (
                  <button
                    key={tag}
                    className="search-hint-tag"
                    onClick={() => {
                      setQuery(tag)
                      search(tag)
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
