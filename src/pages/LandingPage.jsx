import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: '/images/hero-cake.png',
    alt: 'Chocolate ganache cake dripping with glossy ganache',
    headline: <>Every bite, a little <em>celebration.</em></>,
    sub: 'Handcrafted with the finest Belgian chocolate — our signature ganache cake is made for moments that matter.',
  },
  {
    image: '/images/hero-macarons.png',
    alt: 'Elegant macaron tower in pastel pink and cream',
    headline: <>Desserts that <em>sparkle</em> like you.</>,
    sub: 'From intimate gatherings to grand celebrations — our macaron towers make every table unforgettable.',
  },
  {
    image: '/images/hero-brownie.png',
    alt: 'Gooey fudgy brownie with molten centre',
    headline: <>Made with love, <em>tasted with joy.</em></>,
    sub: 'Rich, fudgy, and impossibly gooey — our brownies are baked fresh daily with premium cocoa.',
  },
]

const bestSellers = [
  { name: 'Chocolate Ganache', tag: 'Bestseller', price: '₹1,450', image: '/images/img3.jpg', alt: 'Belgian chocolate ganache cake' },
  { name: 'Macaron Box', tag: 'Popular', price: '₹850', image: '/images/img11.jpg', alt: 'Assorted macarons box' },
  { name: 'Red Velvet Cake', tag: 'Fan Favourite', price: '₹1,350', image: '/images/img5.jpg', alt: 'Red velvet cake with cream cheese' },
  { name: 'Signature Brownie', tag: 'Classic', price: '₹125', image: '/images/img4.jpg', alt: 'Fudgy signature brownie' },
  { name: 'Tiramisu Tub', tag: 'New', price: '₹450', image: '/images/img8.jpg', alt: 'Tiramisu in a glass tub' },
  { name: 'Cupcake Box', tag: 'Gift Ready', price: '₹600', image: '/images/img10.jpg', alt: 'Decorated cupcakes in box' },
]

const galleryImages = [
  { src: '/images/gallery1.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery2.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery3.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery4.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery5.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery6.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery7.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery8.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery9.jpg',  alt: 'Oven\'ly creation' },
  { src: '/images/gallery10.jpg', alt: 'Oven\'ly creation' },
  { src: '/images/gallery11.jpg', alt: 'Oven\'ly creation' },
  { src: '/images/gallery12.jpg', alt: 'Oven\'ly creation' },
]

const reviews = [
  { name: 'Priya M.', occasion: 'Anniversary', rating: 5, text: 'The chocolate ganache cake was absolutely divine! My husband couldn\'t believe it was homemade. Every layer was perfect — moist, rich, and not too sweet. Will order again for every special occasion.' },
  { name: 'Ananya S.', occasion: 'Birthday', rating: 5, text: 'Ordered the macaron tower for my daughter\'s 5th birthday and it was the showstopper! Everyone kept asking where we got it from. The flavours were incredible, especially the raspberry.' },
  { name: 'Rahul K.', occasion: 'Corporate Event', rating: 5, text: 'We\'ve been ordering from Oven\'ly for all our office celebrations. The brownie boxes never disappoint — fudgy, fresh, and beautifully packaged. Best in Lucknow, hands down.' },
  { name: 'Meera T.', occasion: 'Housewarming', rating: 5, text: 'The red velvet cake stole the show at our housewarming! So soft, so creamy, and that cream cheese frosting? Perfection. Thank you Tarunika and Advika! 💕' },
  { name: 'Vikram D.', occasion: 'Date Night', rating: 5, text: 'Surprised my wife with the tiramisu tub and she was blown away. It tasted exactly like the one we had in Italy. Absolute game changer for dessert lovers.' },
]


// ────────────────────────────────────────────────────────────
// Inline icons
// ────────────────────────────────────────────────────────────
const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
  </svg>
)
const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 4h4l1.6 4-2 1.4a13 13 0 0 0 6 6L16 13.4l4 1.6v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>
  </svg>
)
const IconInsta = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
  </svg>
)
const IconStar = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.5 14.6 9l6.9.5-5.3 4.4 1.7 6.7L12 17l-5.9 3.6 1.7-6.7L2.5 9.5 9.4 9 12 2.5Z"/>
  </svg>
)
const Sparkle = ({ size = 10, color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
    <path d="M12 0 13.6 10.4 24 12 13.6 13.6 12 24 10.4 13.6 0 12 10.4 10.4Z"/>
  </svg>
)
const IconQuote = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M11.3 3.3C7 5.5 4.2 9 4.2 13c0 3.2 2.4 5.5 5 5.5 2.3 0 4.3-1.8 4.3-4.3 0-2.3-1.6-3.8-3.5-4.2.3-2.2 2-4.3 4.3-5.5L11.3 3.3zM22 3.3c-4.2 2.2-7 5.8-7 9.7 0 3.2 2.4 5.5 5 5.5 2.3 0 4.3-1.8 4.3-4.3 0-2.3-1.6-3.8-3.5-4.2.3-2.2 2-4.3 4.3-5.5L22 3.3z"/>
  </svg>
)

// ────────────────────────────────────────────────────────────
// Hero — Full-bleed clickable carousel
// ────────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = useCallback((idx) => {
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % heroSlides.length)
  }, [])

  // Auto-advance every 5s
  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next])

  // Reset timer on manual navigation
  const handleDot = (idx) => {
    clearInterval(timerRef.current)
    goTo(idx)
    timerRef.current = setInterval(next, 5000)
  }

  const slide = heroSlides[current]

  return (
    <section className="lp-hero" aria-label="Hero">
      {/* Background image */}
      <div className="lp-hero-bg">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`lp-hero-bg-slide${i === current ? ' active' : ''}`}
          >
            <img src={s.image} alt={s.alt} />
          </div>
        ))}
        <div className="lp-hero-bg-overlay" />
      </div>

      <div className="container lp-hero-content">
        <div className="lp-hero-badge fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="lp-stars">
            {[...Array(5)].map((_, i) => <IconStar key={i} width="12" height="12" />)}
          </span>
          <span>4.9 · 500+ happy customers</span>
        </div>

        <h1 className="lp-hero-headline display-xl fade-up" style={{ animationDelay: '0.2s' }} key={`h-${current}`}>
          {slide.headline}
        </h1>

        <p className="lp-hero-sub fade-up" style={{ animationDelay: '0.35s' }} key={`s-${current}`}>
          {slide.sub}
        </p>

        <div className="lp-hero-cta fade-up" style={{ animationDelay: '0.5s' }}>
          <Link to="/menu" className="btn-primary">Order Now <IconArrow width="14" height="14"/></Link>
          <Link to="/menu" className="btn-outline btn-outline--light">Explore Menu</Link>
        </div>

        {/* Dot indicators */}
        <div className="lp-hero-dots fade-up" style={{ animationDelay: '0.6s' }}>
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`lp-hero-dot${i === current ? ' active' : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// Marquee
// ────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Cakes', 'Cupcakes', 'Macarons', 'Brownies', 'Berliners', 'Tubs & Jars', 'Tea Cakes', 'Cheesecakes', 'Pudding Bowls']
  return (
    <div className="lp-marquee" aria-hidden="true">
      <div className="lp-marquee-track">
        {Array(3).fill(null).map((_, k) => (
          <div className="lp-marquee-group" key={k}>
            {items.map((it, i) => (
              <span className="lp-marquee-item" key={i}>
                <span>{it}</span>
                <Sparkle size={10} color="#FFCCD4"/>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Best Sellers
// ────────────────────────────────────────────────────────────
function BestSellersSection() {
  const trackRef = useRef(null)
  const scroll = (dir) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.lp-bs-card')
    const w = card ? card.offsetWidth + 16 : 240
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section className="lp-bestsellers" aria-labelledby="lp-bs-h">
      <div className="container">
        <div className="lp-section-head lp-section-head--row">
          <div>
            <div className="divider">
              <div className="divider-line"></div>
              <span className="label-caps lp-section-eyebrow">Most Loved</span>
              <div className="divider-line"></div>
            </div>
            <h2 className="display-lg" id="lp-bs-h">
              Our <em>best sellers.</em>
            </h2>
          </div>
          <div className="lp-bs-nav">
            <button className="lp-gal-arrow" aria-label="Previous" onClick={() => scroll(-1)}>
              <IconArrow width="16" height="16" style={{ transform: 'rotate(180deg)' }}/>
            </button>
            <button className="lp-gal-arrow" aria-label="Next" onClick={() => scroll(1)}>
              <IconArrow width="16" height="16"/>
            </button>
          </div>
        </div>
      </div>

      <div className="lp-bs-track" ref={trackRef}>
        {bestSellers.map((item, i) => (
          <Link to="/menu" className="lp-bs-card" key={i}>
            <div className="lp-bs-img">
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="lp-bs-tag">{item.tag}</span>
            </div>
            <div className="lp-bs-info">
              <h3 className="lp-bs-name">{item.name}</h3>
              <span className="lp-bs-price">{item.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}


// ────────────────────────────────────────────────────────────
// Who Are We — condensed letter from the founders
// ────────────────────────────────────────────────────────────
function WhoAreWeSection() {
  return (
    <section className="lp-who" aria-labelledby="lp-who-h">
      <div className="container">
        <div className="lp-section-head">
          <div className="divider">
            <div className="divider-line"></div>
            <span className="label-caps lp-section-eyebrow">Who Are We</span>
            <div className="divider-line"></div>
          </div>
          <h2 className="display-lg" id="lp-who-h">
            <em>From our kitchen,</em><br/>to you.
          </h2>
        </div>

        <div className="lp-who-photo">
          <img src="/images/founders.jpg" alt="Tarunika and Advika, founders of Oven'ly" loading="lazy"/>
        </div>

        <div className="lp-who-letter">
          <p className="lp-who-lead">
            We didn't plan Oven'ly to become what it is today.
          </p>
          <p>
            It started with the two of us — experimenting, figuring things out, and slowly finding our rhythm. Over time, it became more than just desserts. It became about creating something people could <em>feel</em> — not just taste. Every box that leaves our kitchen carries a piece of that — care, detail, and a lot of heart.
          </p>

          <div className="lp-who-sign">
            <span className="lp-who-sign-pre">With love,</span>
            <span className="lp-who-sign-names">Tarunika &amp; Advika</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// Gallery
// ────────────────────────────────────────────────────────────
function GallerySection() {
  const trackRef = useRef(null)
  const scroll = (dir) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.lp-gal-card')
    const w = card ? card.offsetWidth + 12 : 240
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }
  return (
    <section className="lp-gallery" aria-labelledby="lp-gallery-h">
      <div className="container">
        <div className="lp-section-head lp-section-head--row">
          <div>
            <div className="divider">
              <div className="divider-line"></div>
              <span className="label-caps lp-section-eyebrow">Gallery</span>
              <div className="divider-line"></div>
            </div>
            <h2 className="display-lg" id="lp-gallery-h">
              Made to <em>impress.</em>
            </h2>
          </div>
          <div className="lp-gal-nav">
            <button className="lp-gal-arrow" aria-label="Previous" onClick={() => scroll(-1)}>
              <IconArrow width="16" height="16" style={{ transform: 'rotate(180deg)' }}/>
            </button>
            <button className="lp-gal-arrow" aria-label="Next" onClick={() => scroll(1)}>
              <IconArrow width="16" height="16"/>
            </button>
          </div>
        </div>
      </div>

      <div className="lp-gal-track" ref={trackRef}>
        {galleryImages.map((img, i) => (
          <figure className="lp-gal-card" key={i}>
            <img src={img.src} alt={img.alt} loading="lazy"/>
          </figure>
        ))}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// Reviews / Social Proof
// ────────────────────────────────────────────────────────────
function ReviewsSection() {
  const trackRef = useRef(null)
  const scroll = (dir) => {
    if (!trackRef.current) return
    const card = trackRef.current.querySelector('.lp-review-card')
    const w = card ? card.offsetWidth + 16 : 300
    trackRef.current.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  return (
    <section className="lp-reviews" aria-labelledby="lp-reviews-h">
      <div className="container">
        <div className="lp-section-head lp-section-head--row">
          <div>
            <div className="divider">
              <div className="divider-line"></div>
              <span className="label-caps lp-section-eyebrow">Customer Love</span>
              <div className="divider-line"></div>
            </div>
            <h2 className="display-lg" id="lp-reviews-h">
              What our <em>customers</em> say.
            </h2>
          </div>
          <div className="lp-gal-nav">
            <button className="lp-gal-arrow" aria-label="Previous reviews" onClick={() => scroll(-1)}>
              <IconArrow width="16" height="16" style={{ transform: 'rotate(180deg)' }}/>
            </button>
            <button className="lp-gal-arrow" aria-label="Next reviews" onClick={() => scroll(1)}>
              <IconArrow width="16" height="16"/>
            </button>
          </div>
        </div>

        {/* Overall rating badge */}
        <div className="lp-reviews-badge">
          <span className="lp-stars">
            {[...Array(5)].map((_, i) => <IconStar key={i} width="14" height="14" />)}
          </span>
          <span>Rated <strong>4.9</strong> by 500+ customers</span>
        </div>
      </div>

      <div className="lp-reviews-track" ref={trackRef}>
        {reviews.map((review, i) => (
          <div className="lp-review-card" key={i}>
            <IconQuote width="24" height="24" className="lp-review-quote" />
            <div className="lp-review-stars">
              {[...Array(review.rating)].map((_, j) => <IconStar key={j} width="12" height="12" />)}
            </div>
            <p className="lp-review-text">{review.text}</p>
            <div className="lp-review-meta">
              <span className="lp-review-name">{review.name}</span>
              <span className="lp-review-occasion">{review.occasion}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// CTA
// ────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="lp-cta" aria-labelledby="lp-cta-h">
      <span className="lp-cta-glyph" aria-hidden="true">✦</span>
      <div className="container">
        <p className="label-caps lp-cta-eyebrow">Ready to order?</p>
        <h2 className="display-lg lp-cta-headline" id="lp-cta-h">
          Desserts that<br/><em>sparkle just like you!</em>
        </h2>
        <Link to="/menu" className="lp-cta-btn">Browse the Menu <IconArrow width="14" height="14"/></Link>
        <div className="lp-cta-meta">
          <a href="tel:+919140223957" className="lp-cta-link"><IconPhone width="13" height="13"/> +91 91402 23957</a>
          <span className="lp-cta-dot">·</span>
          <a href="https://www.instagram.com/o.v.e.n.ly" className="lp-cta-link" target="_blank" rel="noreferrer"><IconInsta width="13" height="13"/> @o.v.e.n.ly</a>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="page landing-page" id="main-content">
      <Hero/>
      <Marquee/>
      <BestSellersSection/>
      <WhoAreWeSection/>
      <GallerySection/>
      <ReviewsSection/>
      <CTABanner/>
    </main>
  )
}
