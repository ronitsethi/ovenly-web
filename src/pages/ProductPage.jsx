import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { shopifyFetch } from '../lib/shopify'
import { PRODUCT_BY_HANDLE_QUERY } from '../lib/queries'
import { useCart } from '../context/CartContext'
import './ProductPage.css'

export default function ProductPage() {
  const { handle } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
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

  if (loading) return <main className="page product-page"><div className="product-loading"><div className="product-spinner"/><p>Loading…</p></div></main>
  if (!product) return <main className="page product-page"><div className="product-not-found"><h1>Product not found</h1><Link to="/menu" className="btn-primary">Back to Menu</Link></div></main>

  const images = product.images?.edges?.map(e => e.node) || []
  const variants = product.variants?.edges?.map(e => e.node) || []
  const fmt = (a) => `₹${parseFloat(a).toLocaleString('en-IN')}`

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
            <span className="product-current-price">{fmt(selectedVariant?.price?.amount || 0)}</span>
            {selectedVariant?.compareAtPrice && <span className="product-compare-price">{fmt(selectedVariant.compareAtPrice.amount)}</span>}
          </div>
          {variants.length > 1 && <div className="product-variants">
            <p className="product-variant-label label-caps">{variants[0]?.selectedOptions?.[0]?.name || 'Size'}</p>
            <div className="product-variant-options">{variants.map(v => <button key={v.id} className={`product-variant-btn${v.id === selectedVariant?.id ? ' selected' : ''}${!v.availableForSale ? ' sold-out' : ''}`} onClick={() => setSelectedVariant(v)} disabled={!v.availableForSale}><span>{v.title !== 'Default Title' ? v.title : v.selectedOptions?.[0]?.value}</span><span className="pv-price">{fmt(v.price.amount)}</span></button>)}</div>
          </div>}
          <button className="btn-primary product-add-btn" onClick={() => selectedVariant && addToCart(selectedVariant.id)} disabled={!product.availableForSale || cartLoading} id="product-add-to-cart">
            {!product.availableForSale ? 'Sold Out' : cartLoading ? 'Adding…' : 'Add to Cart'}
          </button>
          {product.descriptionHtml && <div className="product-description"><h3 className="product-desc-title">Description</h3><div className="product-desc-body" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}/></div>}
          {product.tags?.length > 0 && <div className="product-tags">{product.tags.map(t => <span key={t} className="product-tag">{t}</span>)}</div>}
        </div>
      </div></div></div>
      <footer className="footer"><div className="container"><img src="/Logo.png" alt="Oven'ly" className="footer-logo"/><p className="footer-tagline label-caps">Crafted with love</p><div className="footer-links"><a href="tel:+919140223957" className="footer-link">+91 91402 23957</a><span className="footer-dot">·</span><a href="https://www.instagram.com/o.v.e.n.ly" className="footer-link" target="_blank" rel="noreferrer">@o.v.e.n.ly</a></div><p className="footer-copy">© 2026 Oven'ly</p></div></footer>
    </main>
  )
}
