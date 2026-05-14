import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import './LandingPage.css'

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const galleryImages = [
  { src: '/images/gallery/Cover-image.jpg',  alt: 'Oven\'ly signature spread' },
  { src: '/images/gallery/gallery-2.jpg',    alt: 'Artisan dessert' },
  { src: '/images/gallery/gallery-4.jpg',    alt: 'Premium bake' },
  { src: '/images/gallery/gallery-5.jpg',    alt: 'Handcrafted treat' },
  { src: '/images/gallery/gallery-7.jpg',    alt: 'Fresh from the oven' },
  { src: '/images/gallery/gallery-8.jpg',    alt: 'Beautifully plated' },
  { src: '/images/gallery/gallery-9.jpg',    alt: 'Custom creation' },
  { src: '/images/gallery/gallery-11.jpg',   alt: 'Sweet indulgence' },
  { src: '/images/gallery/gallery-12.jpg',   alt: 'Signature bake' },
]

const reviewsData = [
  {
    quote: "Just wanted to say a big thank you \u2014 from chocolates to cheesecakes to my fav belgium choc cake, you've always made every occasion extra special for us. Love the taste, the designs, the effort & how you're always there even at the last minute. Super grateful for you & your magic bakes.",
    author: 'A Sweet Someone',
  },
  {
    quote: "Absolutely loved it. The texture was just right \u2014 creamy and decadent without being too heavy. Every bite felt like a little treat. Definitely something I'd come back for!",
    author: 'A Happy Customer',
  },
  {
    quote: "Heyyy IT WAS ALL SUPER YUMMY! Especially the berry belgian chocolate one that he had ordered. Omg that was insane! And even the belgian chocolate cake was insane. Tysmmm!",
    author: 'A Kind Soul',
  },
  {
    quote: "Your cakes are as delicious as ever. Everybody loved the cake. Thank you so much. Last year on the same day I ordered a cake and this cake was as delicious as the previous one. I lovee your cakes. More power to you.",
    author: 'A Happy Customer',
  },
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

const carouselSlides = [
  { src: '/images/hero-carousel-1.jpg', title: 'Craving something sweet?', subtitle: 'Baked from scratch, just for you.' },
  { src: '/images/hero-carousel-2.jpg', title: 'Indulge a little.', subtitle: 'Handcrafted with love.' },
  { src: '/images/hero-carousel-3.jpg', title: 'Freshly baked happiness.', subtitle: 'Every bite tells a story.' },
  { src: '/images/hero-carousel-4.jpg', title: 'Made with love.', subtitle: 'Premium ingredients, always.' },
  { src: '/images/hero-carousel-5.jpg', title: 'Celebrate sweetly.', subtitle: 'Desserts for every occasion.' },
]

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="lp-fullscreen-carousel" aria-label="Hero Carousel">
      {carouselSlides.map((slide, i) => (
        <div 
          key={i} 
          className={`lp-carousel-slide ${i === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.src})` }}
        >
        </div>
      ))}
      <div className="lp-carousel-overlay"></div>
      
      <div className="lp-carousel-content-wrapper">
        <div className="lp-carousel-content" key={currentSlide}>
          <h1 className="lp-carousel-headline fade-up">
            {carouselSlides[currentSlide].title}
          </h1>
          <p className="lp-carousel-sub fade-up" style={{ animationDelay: '0.15s' }}>
            {carouselSlides[currentSlide].subtitle}
          </p>
          <div className="lp-carousel-cta-wrap fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/menu" className="lp-carousel-cta">Order Now <IconArrow width="14" height="14"/></Link>
          </div>
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
                <Sparkle size={10} color="#FDA1B0"/>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}


// ────────────────────────────────────────────────────────────
// Who Are We — letter from the founders
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
            Two sisters, one kitchen, and a dream that quietly turned into Oven'ly.
          </p>
          <p>
            Every box that leaves our kitchen carries a piece of that — care, detail, and a lot of heart.
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
// Reviews
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
              <span className="label-caps lp-section-eyebrow">Reviews</span>
              <div className="divider-line"></div>
            </div>
            <h2 className="display-lg" id="lp-reviews-h">
              What people <em>say.</em>
            </h2>
          </div>
          <div className="lp-gal-nav">
            <button className="lp-gal-arrow" aria-label="Previous review" onClick={() => scroll(-1)}>
              <IconArrow width="16" height="16" style={{ transform: 'rotate(180deg)' }}/>
            </button>
            <button className="lp-gal-arrow" aria-label="Next review" onClick={() => scroll(1)}>
              <IconArrow width="16" height="16"/>
            </button>
          </div>
        </div>
      </div>

      <div className="lp-reviews-track" ref={trackRef}>
        {reviewsData.map((r, i) => (
          <div className="lp-review-card" key={i}>
            <div className="lp-review-quote-mark">&ldquo;</div>
            <p className="lp-review-text">{r.quote}</p>
            <div className="lp-review-author">
              <div className="lp-review-stars">
                {Array(5).fill(null).map((_, si) => <IconStar key={si} width="12" height="12"/>)}
              </div>
              <span className="lp-review-name">&mdash; {r.author}</span>
            </div>
          </div>
        ))}
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

      <GallerySection/>
      <WhoAreWeSection/>
      <ReviewsSection/>
      <Footer/>
    </main>
  )
}
