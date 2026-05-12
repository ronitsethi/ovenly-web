import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { shopifyFetch } from '../lib/shopify'
import { ALL_COLLECTIONS_QUERY, COLLECTION_PRODUCTS_QUERY, ALL_PRODUCTS_QUERY } from '../lib/queries'
import { useCart } from '../context/CartContext'
import './MenuPage.css'

/* ============================================================
   FALLBACK MENU DATA — rich descriptions + image thumbnails
   ============================================================ */
const fallbackMenuData = [
  {
    id: 'cakes', category: 'Cakes', emoji: '🎂',
    note: 'Signature standard designs. Customised cakes priced on complexity.',
    items: [
      { name: 'Belgian Chocolate Ganache', image: '/images/img3.jpg', desc: 'Layers of moist Belgian chocolate sponge hugged by a luscious, glossy ganache — rich, indulgent, and perfect for chocolate lovers celebrating any milestone.', variants: [{ size: '750g', price: '₹1,450' }, { size: '1200g', price: '₹2,150' }] },
      { name: 'Belgian Chocolate & Salted Caramel', image: '/images/img9.jpg', desc: 'A heavenly tango of deep cocoa and buttery salted caramel, finished with crisp chocolate pearls that add the perfect crunch to every bite.', variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }] },
      { name: 'Ferrero Rocher', image: '/images/img6.jpg', desc: 'Inspired by the iconic chocolate — hazelnut nibs, crunchy Ferrero chunks, and swirls of Nutella nestled between layers of velvety chocolate sponge.', variants: [{ size: '750g', price: '₹1,950' }, { size: '1200g', price: '₹2,800' }] },
      { name: 'Classic Vanilla', image: '/images/img5.jpg', desc: 'Pure, elegant, and timeless — fluffy vanilla sponge layered with silky white chocolate ganache cream and a smooth buttercream finish. A crowd-pleaser for every occasion.', variants: [{ size: '750g', price: '₹1,250' }, { size: '1200g', price: '₹1,700' }] },
      { name: 'Red Velvet', image: '/images/img7.jpg', desc: 'That gorgeous crimson sponge with its signature velvety crumb, generously layered and enclosed in a cloud of tangy cream cheese frosting. Unforgettable.', variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }] },
    ],
  },
  {
    id: 'cupcakes', category: 'Cupcakes', emoji: '🧁',
    note: 'Available in Box of 4 and Box of 6 — perfect for gifting.',
    items: [
      { name: 'Belgian Chocolate', image: '/images/img10.jpg', desc: 'Miniature indulgences crowned with a swirl of rich chocolate buttercream — ideal for birthdays, office treats, or "just because" moments.', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
      { name: 'Vanilla', image: '/images/img12.jpg', desc: 'Light, fluffy, and topped with a cloud of vanilla frosting. Simple, sweet, and impossible to eat just one.', variants: [{ size: 'Box of 4', price: '₹500' }, { size: 'Box of 6', price: '₹750' }] },
      { name: 'Mocha', image: '/images/img2.jpg', desc: 'For the coffee enthusiast — a hint of espresso swirled into chocolate batter, topped with mocha buttercream and a dusting of cocoa.', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
    ],
  },
  {
    id: 'brownies', category: 'Brownies', emoji: '🍫',
    note: 'Rich, fudgy, and baked fresh daily with premium cocoa.',
    items: [
      { name: 'Signature', image: '/images/img4.jpg', desc: 'Our OG brownie — dense, fudgy, with a crackly top and a molten centre. The one that started it all.', variants: [{ size: 'per piece', price: '₹125' }] },
      { name: 'Biscoff', image: '/images/img1.jpg', desc: 'A layer of caramelised Biscoff spread hiding inside our signature fudge — crunchy, spiced, and dangerously addictive.', variants: [{ size: 'per piece', price: '₹175' }] },
      { name: 'Nutella', image: '/images/img8.jpg', desc: 'Swirled with creamy Nutella and studded with hazelnut pieces — one bite and you\'ll understand the obsession.', variants: [{ size: 'per piece', price: '₹175' }] },
    ],
  },
]

// Category emoji map for Shopify collections
const categoryEmojis = {}

function getEmoji() {
  return ''
}

function formatPrice(amount) {
  return `₹${parseFloat(amount).toLocaleString('en-IN')}`
}

export default function MenuPage() {
  const [collections, setCollections] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState({})
  const [drawerProduct, setDrawerProduct] = useState(null)
  const { addToCart, isLoading: cartLoading } = useCart()
  const sectionRefs = useRef({})

  useEffect(() => {
    loadCatalog()
  }, [])

  // ── Scroll-spy: highlight active category tab on scroll ──
  useEffect(() => {
    const dataSource = usingFallback || collections.length === 0
      ? fallbackMenuData.map(c => c.id)
      : collections.map(c => c.handle)

    if (dataSource.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id)
          }
        }
      },
      { rootMargin: '-200px 0px -60% 0px', threshold: 0 }
    )

    // Wait a tick for refs to be attached
    const timer = setTimeout(() => {
      dataSource.forEach(id => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [collections, usingFallback, loading])

  async function loadCatalog() {
    try {
      // First, fetch all collections
      const collData = await shopifyFetch(ALL_COLLECTIONS_QUERY)
      const colls = collData?.collections?.edges?.map(e => e.node) || []

      if (colls.length === 0) {
        // No collections — try all products
        const prodData = await shopifyFetch(ALL_PRODUCTS_QUERY)
        const prods = prodData?.products?.edges?.map(e => e.node) || []
        if (prods.length === 0) {
          setUsingFallback(true)
          setLoading(false)
          return
        }
        // Group products by productType
        const grouped = {}
        prods.forEach(p => {
          const type = p.productType || 'Other'
          if (!grouped[type]) grouped[type] = { products: [] }
          grouped[type].products.push(p)
        })
        setCollections(Object.entries(grouped).map(([type, data]) => ({
          handle: type.toLowerCase().replace(/\s+/g, '-'),
          title: type,
          products: data.products.sort((a, b) => {
            const priceA = parseFloat(a.priceRange?.minVariantPrice?.amount || 0)
            const priceB = parseFloat(b.priceRange?.minVariantPrice?.amount || 0)
            return priceA - priceB
          }),
        })))
      } else {
        // Fetch products for each collection
        const withProducts = await Promise.all(
          colls.map(async (col) => {
            const cpData = await shopifyFetch(COLLECTION_PRODUCTS_QUERY, { handle: col.handle })
            return {
              ...col,
              products: (cpData?.collection?.products?.edges?.map(e => e.node) || []).sort((a, b) => {
                const priceA = parseFloat(a.priceRange?.minVariantPrice?.amount || 0)
                const priceB = parseFloat(b.priceRange?.minVariantPrice?.amount || 0)
                return priceA - priceB
              }),
            }
          })
        )
        // Filter out empty collections, then pin Bestsellers to the front
        const nonempty = withProducts.filter(c => c.products.length > 0)
        const isBestsellers = c => c.handle === 'bestsellers' || c.title.toLowerCase() === 'bestsellers'
        setCollections([
          ...nonempty.filter(isBestsellers),
          ...nonempty.filter(c => !isBestsellers(c)),
        ])
      }
    } catch (err) {
      console.error('Failed to load catalog:', err)
      setUsingFallback(true)
    } finally {
      setLoading(false)
    }
  }

  function handleVariantSelect(productId, variantId) {
    setSelectedVariants(prev => ({ ...prev, [productId]: variantId }))
  }

  function openProductDrawer(product) {
    setDrawerProduct(product)
  }

  function handleDrawerAddToCart() {
    if (!drawerProduct) return
    const selectedId = selectedVariants[drawerProduct.id]
    const variants = drawerProduct.variants?.edges?.map(e => e.node) || []
    const variantToAdd = selectedId
      ? variants.find(v => v.id === selectedId)
      : variants[0]
    if (variantToAdd) {
      addToCart(variantToAdd.id)
      setDrawerProduct(null)
    }
  }

  // Scroll to section when tab is clicked
  function scrollToSection(id) {
    setActiveCategory(id)
    const el = document.getElementById(id)
    if (el) {
      const offset = 180 // navbar + sticky tabs height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Render Shopify products
  function renderShopifyContent() {
    const filtered = activeCategory === 'all'
      ? collections
      : collections.filter(c => c.handle === activeCategory)

    return (
      <>
        {/* Category Filter Tabs */}
        <div className="category-tabs-wrap">
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            <button
              className={`cat-tab${activeCategory === 'all' ? ' active' : ''}`}
              onClick={() => { setActiveCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              role="tab"
              aria-selected={activeCategory === 'all'}
              id="tab-all"
            >
              All
            </button>
            {collections.map(col => (
              <button
                key={col.handle}
                className={`cat-tab${activeCategory === col.handle ? ' active' : ''}`}
                onClick={() => scrollToSection(col.handle)}
                role="tab"
                aria-selected={activeCategory === col.handle}
                id={`tab-${col.handle}`}
              >
            {col.title}
              </button>
            ))}
          </div>
        </div>

        {/* Product Sections */}
        <div className="menu-content">
          {filtered.map(col => (
            <section key={col.handle} className="menu-section" id={col.handle} aria-labelledby={`heading-${col.handle}`}>
              <div className="container">
                <div className="menu-section-header">

                  <div>
                    <h2 className="display-md menu-section-title" id={`heading-${col.handle}`}>
                      {col.title}
                    </h2>
                    {col.description && <p className="menu-section-note">{col.description}</p>}
                  </div>
                </div>

                <div className="menu-items-list">
                  {col.products.map(product => {
                    const variants = product.variants?.edges?.map(e => e.node) || []
                    const images = product.images?.edges?.map(e => e.node) || []
                    const mainImage = images[0]
                    const selectedVariantId = selectedVariants[product.id] || variants[0]?.id
                    const selectedVariant = variants.find(v => v.id === selectedVariantId) || variants[0]

                    return (
                      <div
                        className="menu-item-card shopify-card"
                        key={product.id}
                        onClick={() => openProductDrawer(product)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && openProductDrawer(product)}
                      >
                        {/* Product image */}
                        {mainImage && (
                          <div className="menu-item-img">
                            <img
                              src={mainImage.url}
                              alt={mainImage.altText || product.title}
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="menu-item-top">
                          <div className="menu-item-name-wrap">
                            <h3 className="menu-item-name">{product.title}</h3>
                            {product.description && (
                              <p className="menu-item-desc">
                                {product.description.length > 100
                                  ? product.description.slice(0, 100) + '…'
                                  : product.description}
                              </p>
                            )}
                          </div>
                          <div className="menu-item-price-solo">
                            <span className="price-tag">{formatPrice(variants[0]?.price?.amount || 0)}</span>
                            {variants.length > 1 && (
                              <span className="price-size">from</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </>
    )
  }

  // Render fallback hardcoded content — now with images + rich descriptions
  function renderFallbackContent() {
    const filtered = activeCategory === 'all'
      ? fallbackMenuData
      : fallbackMenuData.filter(c => c.id === activeCategory)

    return (
      <>
        {usingFallback && (
          <div className="menu-fallback-notice">
            <p>Showing our standard menu. Online ordering coming soon!</p>
          </div>
        )}

        <div className="category-tabs-wrap">
          <div className="category-tabs" role="tablist" aria-label="Menu categories">
            <button
              className={`cat-tab${activeCategory === 'all' ? ' active' : ''}`}
              onClick={() => { setActiveCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              role="tab"
              aria-selected={activeCategory === 'all'}
            >
              All
            </button>
            {fallbackMenuData.map(cat => (
              <button
                key={cat.id}
                className={`cat-tab${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => scrollToSection(cat.id)}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-content">
          {filtered.map(cat => (
            <section key={cat.id} className="menu-section" id={cat.id}>
              <div className="container">
                <div className="menu-section-header">

                  <div>
                    <h2 className="display-md menu-section-title">{cat.category}</h2>
                    {cat.note && <p className="menu-section-note">{cat.note}</p>}
                  </div>
                </div>
                <div className="menu-items-list">
                  {cat.items.map((item, i) => (
                    <div className="menu-item-card" key={i}>
                      {/* Thumbnail image */}
                      {item.image && (
                        <div className="menu-item-thumb">
                          <img src={item.image} alt={item.name} loading="lazy" />
                        </div>
                      )}
                      <div className="menu-item-body">
                        <div className="menu-item-top">
                          <div className="menu-item-name-wrap">
                            <h3 className="menu-item-name">{item.name}</h3>
                            {item.desc && <p className="menu-item-desc">{item.desc}</p>}
                          </div>
                          {item.variants.length === 1 && (
                            <div className="menu-item-price-solo">
                              <span className="price-tag">{item.variants[0].price}</span>
                              <span className="price-size">{item.variants[0].size}</span>
                            </div>
                          )}
                        </div>
                        {item.variants.length > 1 && (
                          <div className="menu-item-variants">
                            {item.variants.map((v, vi) => (
                              <div className="variant-pill" key={vi}>
                                <span className="variant-size">{v.size}</span>
                                <span className="variant-price">{v.price}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </>
    )
  }

  return (
    <main className="page menu-page" id="main-content">
      {/* Header */}
      <section className="menu-hero">
        <div className="container">
          <p className="label-caps menu-eyebrow">Our Menu — 2026</p>
          <h1 className="display-xl menu-headline">
            The Perfect<br /><em>Dessert Menu</em>
          </h1>
          <p className="menu-sub">
            All prices inclusive of GST · Made fresh in-house · Premium quality ingredients
          </p>
        </div>
      </section>

      {/* Loading skeleton */}
      {loading && (
        <div className="menu-loading">
          <div className="menu-spinner" />
          <p>Loading our delicious menu…</p>
        </div>
      )}

      {/* Content */}
      {!loading && (usingFallback || collections.length === 0
        ? renderFallbackContent()
        : renderShopifyContent()
      )}

      {/* Order CTA */}
      <section className="menu-order-cta">
        <div className="container">
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
            Ready to celebrate?
          </p>
          <p className="menu-cta-text">
            {usingFallback
              ? 'Call us to place your order or enquire about custom cakes'
              : 'Add items to your cart or call us for custom orders'}
          </p>
          <a href="tel:+919140223957" className="btn-primary menu-cta-btn" id="menu-call-btn">
            +91 91402 23957
          </a>
          <p className="menu-note">All prices are for signature standard designs. Custom cakes priced on request.</p>
        </div>
      </section>



      {/* ── PRODUCT BOTTOM DRAWER ────────────── */}
      {drawerProduct && (() => {
        const dp = drawerProduct
        const dpVariants = dp.variants?.edges?.map(e => e.node) || []
        const dpImages = dp.images?.edges?.map(e => e.node) || []
        const dpImage = dpImages[0]
        const dpSelectedId = selectedVariants[dp.id] || dpVariants[0]?.id
        const dpSelectedVariant = dpVariants.find(v => v.id === dpSelectedId) || dpVariants[0]

        return (
          <>
            <div className="pdrawer-backdrop" onClick={() => setDrawerProduct(null)} />
            <div className="pdrawer" role="dialog" aria-label={dp.title}>
              <div className="pdrawer-handle" onClick={() => setDrawerProduct(null)}>
                <div className="pdrawer-handle-bar" />
              </div>

              <div className="pdrawer-body">
                {dpImage && (
                  <div className="pdrawer-img">
                    <img src={dpImage.url} alt={dpImage.altText || dp.title} />
                  </div>
                )}

                <div className="pdrawer-info">
                  <h3 className="pdrawer-title">{dp.title}</h3>
                  {dp.description && (
                    <p className="pdrawer-desc">{dp.description}</p>
                  )}

                  <div className="pdrawer-price">
                    {formatPrice(dpSelectedVariant?.price?.amount || 0)}
                  </div>

                  {/* Variant selector */}
                  {dpVariants.length > 1 && (
                    <div className="pdrawer-variants">
                      {dpVariants.map(v => (
                        <button
                          key={v.id}
                          className={`pdrawer-variant-btn${v.id === dpSelectedId ? ' selected' : ''}${!v.availableForSale ? ' sold-out' : ''}`}
                          onClick={() => handleVariantSelect(dp.id, v.id)}
                          disabled={!v.availableForSale}
                        >
                          <span className="pdrawer-v-name">
                            {v.title !== 'Default Title' ? v.title : v.selectedOptions?.[0]?.value}
                          </span>
                          <span className="pdrawer-v-price">{formatPrice(v.price.amount)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pdrawer-footer">
                <button
                  className="btn-primary pdrawer-add-btn"
                  onClick={handleDrawerAddToCart}
                  disabled={!dp.availableForSale || cartLoading}
                >
                  {!dp.availableForSale ? 'Sold Out' : cartLoading ? 'Adding…' : 'Add to Cart'}
                </button>
                <Link to={`/product/${dp.handle}`} className="pdrawer-detail-link" onClick={() => setDrawerProduct(null)}>
                  View full details →
                </Link>
              </div>
            </div>
          </>
        )
      })()}
    </main>
  )
}
