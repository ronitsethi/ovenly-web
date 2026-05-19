import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { shopifyFetch } from '../lib/shopify'
import { PRODUCT_BY_HANDLE_QUERY, ADDONS_QUERY } from '../lib/queries'
import { useCart } from '../context/CartContext'
import './ProductPage.css'

function formatPrice(amount) {
  return `₹${parseFloat(amount).toLocaleString('en-IN')}`
}

function isCakeProduct(product) {
  const type = (product?.productType || '').toLowerCase()
  const tags = (product?.tags || []).map(t => t.toLowerCase())
  return type.includes('cake') || tags.includes('cake') || tags.includes('cakes')
}

export default function ProductPage() {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const [addons, setAddons] = useState([])
  const [selectedAddons, setSelectedAddons] = useState({})
  const { addToCart, isLoading: cartLoading } = useCart()

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle })
        if (data?.product) {
          setProduct(data.product)
          const v = data.product.variants?.edges?.map(e => e.node) || []
          setSelectedVariant(v[0] || null)
        }
      } catch (err) { console.error(err) }
      finally { setLoading(false) }
    }
    load()
    window.scrollTo(0, 0)
  }, [handle])

  // Fetch add-ons
  useEffect(() => {
    shopifyFetch(ADDONS_QUERY)
      .then(data => {
        const addonProducts = data?.products?.edges?.map(e => e.node) || []
        setAddons(addonProducts.filter(p => p.availableForSale && p.variants?.edges?.[0]?.node?.availableForSale))
      })
      .catch(err => console.warn('Could not load add-ons:', err))
  }, [])

  function toggleAddon(addonId) {
    setSelectedAddons(prev => ({ ...prev, [addonId]: !prev[addonId] }))
  }

  function handleAddToCart() {
    if (!selectedVariant) return
    const addonVariantIds = Object.entries(selectedAddons)
      .filter(([, checked]) => checked)
      .map(([addonProductId]) => {
        const addon = addons.find(a => a.id === addonProductId)
        return addon?.variants?.edges?.[0]?.node?.id
      })
      .filter(Boolean)
    addToCart(selectedVariant.id, 1, addonVariantIds)
  }

  if (loading) return <main className="page product-page"><div className="product-loading"><div className="product-spinner"/><p>Loading…</p></div></main>
  if (!product) return <main className="page product-page"><div className="product-not-found"><h1>Product not found</h1><Link to="/menu" className="btn-primary">Back to Menu</Link></div></main>

  const images = product.images?.edges?.map(e => e.node) || []
  const variants = product.variants?.edges?.map(e => e.node) || []
  const showAddons = isCakeProduct(product) && addons.length > 0

  return (
    <main className="page product-page" id="main-content">
      <div className="product-breadcrumb"><div className="container"><Link to="/menu" className="breadcrumb-link">← Back to Menu</Link></div></div>
      <div className="product-layout"><div className="container"><div className="product-grid">
        <div className="product-gallery">
          <div className="product-main-img">
            {images[activeImage] ? <img src={images[activeImage].url} alt={images[activeImage].altText || product.title}/> : <div className="product-img-placeholder"></div>}
          </div>
          {images.length > 1 && <div className="product-thumbs">{images.map((img, i) => <button key={img.id} className={`product-thumb${i === activeImage ? ' active' : ''}`} onClick={() => setActiveImage(i)}><img src={img.url} alt=""/></button>)}</div>}
        </div>
        <div className="product-info">
          {product.productType && <p className="label-caps product-type">{product.productType}</p>}
          <h1 className="display-lg product-title">{product.title}</h1>
          <div className="product-price-display">
            <span className="product-current-price">{formatPrice(selectedVariant?.price?.amount || 0)}</span>
            {selectedVariant?.compareAtPrice && <span className="product-compare-price">{formatPrice(selectedVariant.compareAtPrice.amount)}</span>}
          </div>
          {variants.length > 1 && <div className="product-variants">
            <p className="product-variant-label label-caps">{variants[0]?.selectedOptions?.[0]?.name || 'Size'}</p>
            <div className="product-variant-options">{variants.map(v => <button key={v.id} className={`product-variant-btn${v.id === selectedVariant?.id ? ' selected' : ''}${!v.availableForSale ? ' sold-out' : ''}`} onClick={() => setSelectedVariant(v)} disabled={!v.availableForSale}><span>{v.title !== 'Default Title' ? v.title : v.selectedOptions?.[0]?.value}</span><span className="pv-price">{formatPrice(v.price.amount)}</span></button>)}</div>
          </div>}

          {/* Add-ons (cakes only) */}
          {showAddons && (
            <div className="product-addons">
              <h3 className="product-addons-title">Add-ons</h3>
              {addons.map(addon => {
                const addonVariant = addon.variants?.edges?.[0]?.node
                const addonPrice = addonVariant?.price?.amount
                return (
                  <label key={addon.id} className="product-addon-row">
                    <input
                      type="checkbox"
                      className="product-addon-check"
                      checked={!!selectedAddons[addon.id]}
                      onChange={() => toggleAddon(addon.id)}
                    />
                    <span className="product-addon-name">{addon.title}</span>
                    <span className="product-addon-price">+ {formatPrice(addonPrice)}</span>
                  </label>
                )
              })}
            </div>
          )}

          <button className="btn-primary product-add-btn" onClick={handleAddToCart} disabled={!product.availableForSale || cartLoading} id="product-add-to-cart">
            {!product.availableForSale ? 'Sold Out' : cartLoading ? 'Adding…' : 'Add to Cart'}
          </button>
          {product.descriptionHtml && <div className="product-description"><h3 className="product-desc-title">Description</h3><div className="product-desc-body" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}/></div>}
          {product.tags?.length > 0 && <div className="product-tags">{product.tags.map(t => <span key={t} className="product-tag">{t}</span>)}</div>}
        </div>
      </div></div></div>
      <Footer/>
    </main>
  )
}
