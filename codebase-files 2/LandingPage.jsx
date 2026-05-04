import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css'

// ────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────
const galleryImages = [
  { src: '/images/img1.jpg',  alt: 'Boxed cookies' },
  { src: '/images/img2.jpg',  alt: 'Branded packaging' },
  { src: '/images/img3.jpg',  alt: 'Premium cake' },
  { src: '/images/img4.jpg',  alt: 'Artisan confection' },
  { src: '/images/img5.jpg',  alt: 'Anniversary cake' },
  { src: '/images/img6.jpg',  alt: 'Beautiful dessert' },
  { src: '/images/img7.jpg',  alt: 'Fresh bakery' },
  { src: '/images/img8.jpg',  alt: 'Tiramisu tubs' },
  { src: '/images/img9.jpg',  alt: 'Custom cake' },
  { src: '/images/img10.jpg', alt: 'Cupcakes' },
  { src: '/images/img11.jpg', alt: 'Macarons' },
  { src: '/images/img12.jpg', alt: 'Signature bakes' },
]

const offerings = [
  { n: '01', title: 'Celebration Cakes',   desc: 'Custom & signature designs. Belgian chocolate, red velvet, cheesecakes & more — for every occasion.', img: '/images/img5.jpg'  },
  { n: '02', title: 'Cupcakes',            desc: 'Beautifully crafted boxes of four or six. From Belgian chocolate to vanilla & blueberry.',              img: '/images/img10.jpg' },
  { n: '03', title: 'Brownies & Cookies',  desc: "Brookies, chocochip, biscoff s'mores, nutella deep dish — baked fresh to order.",                       img: '/images/img1.jpg'  },
  { n: '04', title: 'Tea Cakes',           desc: 'Orange chiffon, carrot cake, banana bread, marble cake & more wholesome loaves.',                         img: '/images/img4.jpg'  },
  { n: '05', title: 'Tubs & Jars',         desc: 'Dessert tubs in tiramisu, banoffee, ferrero rocher & indulgent jars in 350ml sizes.',                     img: '/images/img8.jpg'  },
  { n: '06', title: 'Berliners & Macarons',desc: 'Pillowy filled berliners and French-style macarons in seasonal flavours.',                                img: '/images/img11.jpg' },
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

// ────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="lp-hero" aria-label="Hero">
      <div className="lp-hero-decor" aria-hidden="true">
        <div className="lp-hero-arc" />
        <span className="lp-hero-spark lp-hero-spark--a"><Sparkle size={18} color="#A51627"/></span>
        <span className="lp-hero-spark lp-hero-spark--b"><Sparkle size={10} color="#754015"/></span>
        <span className="lp-hero-spark lp-hero-spark--c"><Sparkle size={14} color="#EE5483"/></span>
      </div>

      <div className="container">
        <div className="lp-hero-badge fade-up" style={{ animationDelay: '0.05s' }}>
          <span className="sparkle"></span>
          <span className="label-caps">Crafted With Love · Est. India</span>
          <span className="sparkle"></span>
        </div>

        <h1 className="lp-hero-headline display-xl fade-up" style={{ animationDelay: '0.15s' }}>
          Dazzling <em>desserts</em><br/>
          for every <span className="lp-underline">occasion
            <svg viewBox="0 0 200 14" preserveAspectRatio="none">
              <path d="M2 9 Q 50 -2 100 6 T 198 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </span>.
        </h1>

        <p className="lp-hero-sub fade-up" style={{ animationDelay: '0.3s' }}>
          A small kitchen with big sparkle. Premium handcrafted bakes — Belgian chocolate, house-made compotes, freshly whipped creams — because your moments deserve to <em>shine</em>.
        </p>

        <div className="lp-hero-cta fade-up" style={{ animationDelay: '0.45s' }}>
          <Link to="/menu" className="btn-primary">Order Now <IconArrow width="14" height="14"/></Link>
          <a href="tel:+919140223957" className="btn-outline"><IconPhone width="14" height="14"/> Call Us</a>
        </div>

        <div className="lp-hero-meta fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="lp-hero-rating">
            <div className="lp-stars" aria-hidden="true">
              <IconStar width="12" height="12"/><IconStar width="12" height="12"/><IconStar width="12" height="12"/><IconStar width="12" height="12"/><IconStar width="12" height="12"/>
            </div>
            <span className="label-caps">Loved by 1,200+ celebrations</span>
          </div>
        </div>
      </div>

      <div className="lp-hero-photo fade-up" style={{ animationDelay: '0.35s' }}>
        <div className="lp-hero-photo-frame">
          <img src="/images/img5.jpg" alt="Anniversary cake with pink roses" />
          <div className="lp-hero-photo-tag">
            <span className="label-caps">No. 5 — Floral · Belgian White</span>
          </div>
        </div>
        <div className="lp-hero-stamp" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="lp-stamp-circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"/>
            </defs>
            <text className="lp-hero-stamp-text">
              <textPath href="#lp-stamp-circ">CRAFTED WITH LOVE · OVEN'LY · CRAFTED WITH LOVE · OVEN'LY · </textPath>
            </text>
            <circle cx="60" cy="60" r="22" fill="#A51627"/>
            <text x="60" y="65" textAnchor="middle" fontSize="11" fontFamily="Cormorant Garamond" fill="#FFCCD4" fontStyle="italic">since</text>
            <text x="60" y="78" textAnchor="middle" fontSize="14" fontFamily="Cormorant Garamond" fontWeight="600" fill="#FFCCD4">'24</text>
          </svg>
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
// Story
// ────────────────────────────────────────────────────────────
function StorySection() {
  return (
    <section className="lp-story" aria-labelledby="lp-story-h">
      <div className="container">
        <div className="lp-section-head">
          <div className="divider">
            <div className="divider-line"></div>
            <span className="label-caps lp-section-eyebrow">Our Story · 01</span>
            <div className="divider-line"></div>
          </div>
          <h2 className="display-lg" id="lp-story-h">
            Baked fresh.<br/><em>Crafted with care.</em>
          </h2>
        </div>

        <div className="lp-story-photo">
          <img src="/images/img8.jpg" alt="Tiramisu tubs with gold seal" loading="lazy"/>
          <div className="lp-story-quote">
            <span className="lp-quote-mark">“</span>
            <p>Every bake is a labour of love — premium ingredients, strict hygiene, and one small kitchen that pours its whole heart into your celebration.</p>
            <span className="label-caps">— The Oven'ly Kitchen</span>
          </div>
        </div>

        <p className="lp-story-body">
          We use only premium quality ingredients — from rich <em>Belgian chocolate</em> to house-made compotes and freshly whipped creams — because your celebrations deserve nothing less than extraordinary.
        </p>
        <p className="lp-story-body">
          Birthday, anniversary, gifting moment, or a quiet self-treat — we make it sparkle.
        </p>

        <div className="lp-stats">
          <div className="lp-stat">
            <span className="lp-stat-num display-lg">15<span>+</span></span>
            <span className="label-caps">Cake Flavours</span>
          </div>
          <div className="lp-stat">
            <span className="lp-stat-num display-lg">100<span>%</span></span>
            <span className="label-caps">In-House Made</span>
          </div>
          <div className="lp-stat">
            <span className="lp-stat-num display-lg">GST</span>
            <span className="label-caps">Inclusive Pricing</span>
          </div>
        </div>
      </div>
    </section>
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
            <span className="label-caps lp-section-eyebrow">Who Are We · 02</span>
            <div className="divider-line"></div>
          </div>
          <h2 className="display-lg" id="lp-who-h">
            <em>From our kitchen,</em><br/>to you.
          </h2>
        </div>

        <div className="lp-who-photo">
          <img src="/images/founders.jpg" alt="Tarunika and Advika, founders of Oven'ly" loading="lazy"/>
          <div className="lp-who-photo-caption">
            <span className="label-caps">Tarunika &amp; Advika</span>
            <span className="lp-who-photo-sub">Founders</span>
          </div>
        </div>

        <div className="lp-who-letter">
          <p className="lp-who-lead">
            We didn't plan Oven'ly to become what it is today.
          </p>
          <p>
            It started with the two of us — experimenting, figuring things out, and slowly finding our own rhythm in the middle of it all.
          </p>
          <p>
            Over time, it became more than just desserts. It became about creating something people could <em>feel</em> — not just taste.
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
              <span className="label-caps lp-section-eyebrow">Gallery · 03</span>
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
            <figcaption className="label-caps">No. {String(i + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────
// Occasions
// ────────────────────────────────────────────────────────────
function OccasionsStrip() {
  const items = ['Birthdays', 'Anniversaries', 'Weddings', 'Baby Showers', 'Office Gifting', 'Just Because']
  return (
    <section className="lp-occasions">
      <div className="container">
        <div className="divider">
          <div className="divider-line"></div>
          <span className="label-caps lp-section-eyebrow">For the Occasion · 04</span>
          <div className="divider-line"></div>
        </div>
        <h2 className="display-lg lp-occ-headline">
          We bake for the moments that <em>matter.</em>
        </h2>
        <ul className="lp-occ-list">
          {items.map((it, i) => (
            <li key={i} className="lp-occ-pill">
              <Sparkle size={9} color="#A51627"/>
              <span>{it}</span>
            </li>
          ))}
        </ul>
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
      <StorySection/>
      <WhoAreWeSection/>
      <GallerySection/>
      <OccasionsStrip/>
      <CTABanner/>

      <footer className="footer">
        <div className="container">
          <img src="/Logo.png" alt="Oven'ly" className="footer-logo"/>
          <p className="footer-tagline label-caps">Crafted with love</p>
          <div className="footer-links">
            <a href="tel:+919140223957" className="footer-link">+91 91402 23957</a>
            <span className="footer-dot">·</span>
            <a href="https://www.instagram.com/o.v.e.n.ly" className="footer-link" target="_blank" rel="noreferrer">@o.v.e.n.ly</a>
          </div>
          <p className="footer-copy">© 2026 Oven'ly. All prices inclusive of GST.</p>
        </div>
      </footer>
    </main>
  )
}
