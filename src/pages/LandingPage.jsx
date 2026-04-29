import { Link } from 'react-router-dom'
import './LandingPage.css'

const galleryImages = [
  { src: '/images/img1.jpg', alt: 'Oven\'ly dessert creation' },
  { src: '/images/img2.jpg', alt: 'Handcrafted baked goods' },
  { src: '/images/img3.jpg', alt: 'Premium cake selection' },
  { src: '/images/img4.jpg', alt: 'Artisan confections' },
  { src: '/images/img5.jpg', alt: 'Celebration cakes' },
  { src: '/images/img6.jpg', alt: 'Beautiful desserts' },
  { src: '/images/img7.jpg', alt: 'Fresh bakery items' },
  { src: '/images/img8.jpg', alt: 'Specialty desserts' },
  { src: '/images/img9.jpg', alt: 'Custom occasions cakes' },
  { src: '/images/img10.jpg', alt: 'Cupcakes and treats' },
  { src: '/images/img11.jpg', alt: 'Macarons and pastries' },
  { src: '/images/img12.jpg', alt: 'Oven\'ly signature bakes' },
]

const offerings = [
  { title: 'Celebration Cakes', desc: 'Custom & signature designs. Belgian chocolate, red velvet, cheesecakes & more — for every occasion.' },
  { title: 'Cupcakes', desc: 'Beautifully crafted boxes of 4 or 6. From Belgian chocolate to vanilla & blueberry.' },
  { title: 'Brownies & Cookies', desc: 'Brookies, chocochip, biscoff s\'mores, nutella deep dish — baked fresh to order.' },
  { title: 'Tea Cakes', desc: 'Orange chiffon, carrot cake, banana bread, marble cake & more wholesome loaves.' },
  { title: 'Tubs & Jars', desc: 'Dessert tubs in tiramisu, banoffee, ferrero rocher & indulgent jars in 350ml sizes.' },
  { title: 'Berliners & Macarons', desc: 'Pillowy filled berliners and French-style macarons in seasonal flavours.' },
]

export default function LandingPage() {
  return (
    <main className="page landing-page" id="main-content">

      {/* ── HERO ─────────────────────────────── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-bg-grid">
          <div className="hero-img-card hero-img-card--1">
            <img src="/images/img3.jpg" alt="Premium cake" />
          </div>
          <div className="hero-img-card hero-img-card--2">
            <img src="/images/img8.jpg" alt="Specialty desserts" />
          </div>
          <div className="hero-img-card hero-img-card--3">
            <img src="/images/img5.jpg" alt="Celebration cakes" />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-badge fade-up" style={{ animationDelay: '0.1s' }}>
            <span className="sparkle"></span>
            <span className="label-caps">Crafted With Love</span>
            <span className="sparkle"></span>
          </div>

          <h1 className="hero-headline display-xl fade-up" style={{ animationDelay: '0.2s' }}>
            Dazzling<br />
            <em>Desserts</em><br />
            for Every<br />
            Occasion
          </h1>

          <p className="hero-sub fade-up" style={{ animationDelay: '0.35s' }}>
            Premium handcrafted bakes made in-house using only the finest ingredients — because your moments deserve to sparkle.
          </p>

          <div className="hero-cta fade-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/menu" className="btn-primary" id="hero-order-btn">
              Order Now
            </Link>
            <a href="tel:+919140223957" className="btn-outline" id="hero-call-btn">
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE STRIP ────────────────────── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="marquee-item">
              Cakes ✦ Cupcakes ✦ Macarons ✦ Brownies ✦ Berliners ✦ Tubs &amp; Jars ✦ Tea Cakes ✦ Cheesecakes ✦ Pudding Bowls ✦
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────── */}
      <section className="about-section" aria-labelledby="about-heading">
        <div className="container">
          <div className="section-label">
            <div className="divider">
              <div className="divider-line"></div>
              <span className="label-caps" style={{ color: 'var(--cherry-red)' }}>Our Story</span>
              <div className="divider-line"></div>
            </div>
          </div>
          <h2 className="display-lg about-headline" id="about-heading">
            Baked fresh.<br /><em>Crafted with care.</em>
          </h2>
          <p className="about-body">
            At Oven'ly, every bake is a labour of love. We use only premium quality ingredients — from rich Belgian chocolate to house-made compotes and freshly whipped creams — because we believe your celebrations deserve nothing less than extraordinary.
          </p>
          <p className="about-body">
            Our bakes are proudly made in-house, adhering to strict hygiene standards in every step of production and packaging. Whether it's a birthday, anniversary, gifting moment, or a quiet self-treat, we make it sparkle.
          </p>

          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number display-md">15+</span>
              <span className="stat-label label-caps">Cake Flavours</span>
            </div>
            <div className="stat-card">
              <span className="stat-number display-md">100%</span>
              <span className="stat-label label-caps">In-House Made</span>
            </div>
            <div className="stat-card">
              <span className="stat-number display-md">GST</span>
              <span className="stat-label label-caps">Inclusive Prices</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS GRID ───────────────────── */}
      <section className="offerings-section" aria-labelledby="offerings-heading">
        <div className="container">
          <div className="divider">
            <div className="divider-line"></div>
            <span className="label-caps" style={{ color: 'var(--cherry-red)' }}>What We Make</span>
            <div className="divider-line"></div>
          </div>
          <h2 className="display-lg offerings-headline" id="offerings-heading">
            Something for<br /><em>every craving</em>
          </h2>

          <div className="offerings-grid">
            {offerings.map((item, i) => (
              <div className="offering-card" key={i}>
                <h3 className="offering-title">{item.title}</h3>
                <p className="offering-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────── */}
      <section className="gallery-section" aria-labelledby="gallery-heading">
        <div className="container">
          <div className="divider">
            <div className="divider-line"></div>
            <span className="label-caps" style={{ color: 'var(--cherry-red)' }}>Gallery</span>
            <div className="divider-line"></div>
          </div>
          <h2 className="display-lg gallery-headline" id="gallery-heading">
            Made to <em>impress</em>
          </h2>
        </div>

        <div className="gallery-scroll-track">
          {galleryImages.map((img, i) => (
            <div className="gallery-card" key={i}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────── */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container">
          <p className="label-caps cta-eyebrow">Ready to order?</p>
          <h2 className="display-lg cta-headline" id="cta-heading">
            Desserts that<br /><em>sparkle just like you!</em>
          </h2>
          <Link to="/menu" className="btn-primary cta-btn" id="cta-order-btn">
            Browse the Menu
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <img src="/Logo.png" alt="Oven'ly" className="footer-logo" />
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
