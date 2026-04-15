import { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuPage.css'

/* ============================================================
   FULL MENU DATA — extracted from Oven'ly Menu 2026 PDF
   All prices inclusive of GST
   ============================================================ */
const menuData = [
  {
    id: 'cakes',
    category: 'Cakes',
    emoji: '🎂',
    note: 'Prices are for signature standard designs. Customised cakes are priced based on design complexity.',
    items: [
      {
        name: 'Belgian Chocolate Ganache',
        desc: 'Moist belgian chocolate sponge layered and coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,450' }, { size: '1200g', price: '₹2,150' }],
      },
      {
        name: 'Belgian Chocolate & Salted Caramel',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, in-house salted caramel & crisp pearls, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Raspberry',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, in-house raspberry compote, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Orange',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, in-house orange marmalade, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Almond Praline',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache and crunchy almond praline, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Hazelnut',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, in-house hazelnut praline butter and toasted hazelnut nibs, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Coffee',
        desc: 'Moist belgian chocolate sponge layered and coated with the most luscious coffee chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Belgian Chocolate & Blueberry',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, blueberry compote, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Ferrero Rocher',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate ganache, ferrero rocher chunks, hazelnut nibs and nutella, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,950' }, { size: '1200g', price: '₹2,800' }],
      },
      {
        name: 'Classic Vanilla',
        desc: 'Moist vanilla sponge layered with white chocolate ganache cream, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,250' }, { size: '1200g', price: '₹1,700' }],
      },
      {
        name: 'Pineapple',
        desc: 'Moist vanilla sponge layered with crème chantilly and pineapple compote, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
      {
        name: 'Black Forest',
        desc: 'Moist belgian chocolate sponge layered with belgian chocolate mousse and cherry compote, coated with a luscious belgian chocolate ganache.',
        variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }],
      },
      {
        name: 'Butterscotch',
        desc: 'Moist vanilla sponge layered with butterscotch flavoured cream and caramel crunches, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
      {
        name: 'Vanilla & Blueberry',
        desc: 'Moist vanilla sponge layered with crème chantilly and blueberry compote, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
      {
        name: 'Mocha',
        desc: 'Moist vanilla sponge layered with a luscious coffee mousse, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
      {
        name: 'Mixed Fruit',
        desc: 'Moist vanilla sponge layered with crème chantilly and in-house mixed fruit compote, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,750' }, { size: '1200g', price: '₹2,700' }],
      },
      {
        name: 'Red Velvet',
        desc: 'Velvety soft textured red velvet sponge, layered and enclosed with a smooth cream cheese frosting.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
      {
        name: 'Vanilla & Raspberry',
        desc: 'Moist vanilla sponge layered with crème chantilly and in-house raspberry compote, coated with buttercream.',
        variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹1,900' }],
      },
    ],
  },
  {
    id: 'bento-cakes',
    category: 'Bento Cakes',
    emoji: '🎁',
    note: '300 gram individual-serving bento cakes',
    items: [
      { name: 'Belgian Chocolate', variants: [{ size: '300g', price: '₹600' }] },
      { name: 'Belgian Chocolate & Salted Caramel', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Belgian Chocolate & Raspberry', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Ferrero Rocher', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Classic Vanilla', variants: [{ size: '300g', price: '₹600' }] },
      { name: 'Pineapple', variants: [{ size: '300g', price: '₹600' }] },
      { name: 'Vanilla & Blueberry', variants: [{ size: '300g', price: '₹600' }] },
      { name: 'Vanilla & Raspberry', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Vanilla & Biscoff', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Mocha', variants: [{ size: '300g', price: '₹700' }] },
    ],
  },
  {
    id: 'cheesecake',
    category: 'Cheesecake',
    emoji: '🍰',
    note: 'Classic New York style and flavoured variants',
    items: [
      { name: 'New York', variants: [{ size: '750g', price: '₹1,350' }, { size: '1200g', price: '₹2,000' }] },
      { name: 'Blueberry', variants: [{ size: '750g', price: '₹1,650' }, { size: '1200g', price: '₹2,350' }] },
      { name: 'Raspberry', variants: [{ size: '750g', price: '₹1,750' }, { size: '1200g', price: '₹2,500' }] },
      { name: 'Biscoff', variants: [{ size: '750g', price: '₹1,750' }, { size: '1200g', price: '₹2,500' }] },
      { name: 'Nutella', variants: [{ size: '750g', price: '₹1,750' }, { size: '1200g', price: '₹2,500' }] },
    ],
  },
  {
    id: 'bento-cheesecakes',
    category: 'Bento Cheesecakes',
    emoji: '🧀',
    note: '300 gram bento cheesecakes',
    items: [
      { name: 'Biscoff', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Nutella', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Blueberry', variants: [{ size: '300g', price: '₹700' }] },
      { name: 'Raspberry', variants: [{ size: '300g', price: '₹700' }] },
    ],
  },
  {
    id: 'cupcakes',
    category: 'Cupcakes',
    emoji: '🧁',
    note: 'Available in Box of 4 and Box of 6',
    items: [
      { name: 'Belgian Chocolate', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
      { name: 'Belgian Chocolate & Salted Caramel', variants: [{ size: 'Box of 4', price: '₹700' }, { size: 'Box of 6', price: '₹1,050' }] },
      { name: 'Belgian Chocolate & Raspberry', variants: [{ size: 'Box of 4', price: '₹700' }, { size: 'Box of 6', price: '₹1,050' }] },
      { name: 'Belgian Chocolate & Nutella', variants: [{ size: 'Box of 4', price: '₹750' }, { size: 'Box of 6', price: '₹1,150' }] },
      { name: 'Vanilla', variants: [{ size: 'Box of 4', price: '₹500' }, { size: 'Box of 6', price: '₹750' }] },
      { name: 'Vanilla & Raspberry', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
      { name: 'Vanilla & Blueberry', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
      { name: 'Mocha', variants: [{ size: 'Box of 4', price: '₹600' }, { size: 'Box of 6', price: '₹900' }] },
    ],
  },
  {
    id: 'brownies',
    category: 'Brownies',
    emoji: '🍫',
    note: 'Available in Box of 4 and Box of 6',
    items: [
      { name: 'Signature', variants: [{ size: 'per piece', price: '₹125' }] },
      { name: 'Biscoff', variants: [{ size: 'per piece', price: '₹175' }] },
      { name: 'Nutella', variants: [{ size: 'per piece', price: '₹175' }] },
      { name: 'Coffee', variants: [{ size: 'per piece', price: '₹175' }] },
      { name: 'Salted Caramel', variants: [{ size: 'per piece', price: '₹175' }] },
    ],
  },
  {
    id: 'cookies',
    category: 'Cookies',
    emoji: '🍪',
    note: 'Available in Box of 6',
    items: [
      { name: 'Chocochip', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Brookies', variants: [{ size: 'Box of 6', price: '₹700' }] },
      { name: "Biscoff S'mores", variants: [{ size: 'Box of 6', price: '₹750' }] },
      { name: 'Nutella Deep Dish', variants: [{ size: 'Box of 6', price: '₹750' }] },
      { name: 'Milk Choco Chunk', variants: [{ size: 'Box of 6', price: '₹800' }] },
    ],
  },
  {
    id: 'tubs',
    category: 'Tubs',
    emoji: '🥛',
    note: '500ml dessert tubs',
    items: [
      { name: 'Tiramisu', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Belgian Chocolate', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Belgian Chocolate & Salted Caramel', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Belgian Chocolate & Raspberry', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Vanilla & Raspberry', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Coffee & Caramel', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Banoffee', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Ferrero Rocher', variants: [{ size: '500ml', price: '₹700' }] },
      { name: 'Mocha Biscoff', variants: [{ size: '500ml', price: '₹700' }] },
    ],
  },
  {
    id: 'jars',
    category: 'Jars',
    emoji: '🫙',
    note: '350ml dessert jars',
    items: [
      { name: 'Belgian Chocolate', variants: [{ size: '350ml', price: '₹450' }] },
      { name: 'Biscoff Cheesecake', variants: [{ size: '350ml', price: '₹500' }] },
      { name: 'Blueberry Cheesecake', variants: [{ size: '350ml', price: '₹500' }] },
      { name: 'Nutella Cheesecake', variants: [{ size: '350ml', price: '₹500' }] },
      { name: 'Raspberry Cheesecake', variants: [{ size: '350ml', price: '₹500' }] },
      { name: 'Banana Biscoff', variants: [{ size: '350ml', price: '₹600' }] },
      { name: 'Pink Floyd', variants: [{ size: '350ml', price: '₹600' }] },
    ],
  },
  {
    id: 'berliners',
    category: 'Berliners',
    emoji: '🍩',
    note: 'Available in Box of 4',
    items: [
      { name: 'Belgian Chocolate', variants: [{ size: 'Box of 4', price: '₹750' }] },
      { name: 'Blueberry Cheesecake', variants: [{ size: 'Box of 4', price: '₹750' }] },
      { name: 'Delicate Mocha', variants: [{ size: 'Box of 4', price: '₹750' }] },
      { name: 'Nutella Ganache', variants: [{ size: 'Box of 4', price: '₹750' }] },
      { name: 'Vanilla Custard', variants: [{ size: 'Box of 4', price: '₹750' }] },
    ],
  },
  {
    id: 'macarons',
    category: 'Macarons',
    emoji: '🫐',
    note: 'Available in Box of 6',
    items: [
      { name: 'Blueberry', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Raspberry', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Salted Caramel', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Belgian Chocolate', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Belgian Chocolate & Coffee', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Pink Lemonade', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Cold Coffee', variants: [{ size: 'Box of 6', price: '₹600' }] },
      { name: 'Lemon', variants: [{ size: 'Box of 6', price: '₹600' }] },
    ],
  },
  {
    id: 'tea-cakes',
    category: 'Tea Cakes',
    emoji: '🍞',
    note: 'Wholesome loaves — available in 500g and 1000g',
    items: [
      { name: 'Orange Chiffon Cake', variants: [{ size: '500g', price: '₹850' }, { size: '1000g', price: '₹1,650' }] },
      { name: 'Carrot Cake w/ Cinnamon Crumbles', variants: [{ size: '500g', price: '₹1,000' }, { size: '1000g', price: '₹1,900' }] },
      { name: 'Banana Bread', variants: [{ size: '500g', price: '₹1,000' }, { size: '1000g', price: '₹1,900' }] },
      { name: 'Marble Cake', variants: [{ size: '500g', price: '₹1,000' }, { size: '1000g', price: '₹1,900' }] },
      { name: 'Lemon Curd Cake', variants: [{ size: '500g', price: '₹1,200' }, { size: '1000g', price: '₹2,300' }] },
      { name: 'Dates & Walnut Cake', variants: [{ size: '500g', price: '₹1,350' }, { size: '1000g', price: '₹2,600' }] },
    ],
  },
  {
    id: 'pudding-bowls',
    category: 'Pudding Bowls',
    emoji: '🍮',
    note: 'Available in Small, Medium and Big',
    items: [
      { name: 'Tiramisu', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Belgian Chocolate & Raspberry', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Belgian Chocolate & Salted Caramel', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Mixed Fruit', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Coffee & Caramel', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Vietnamese Coffee Cream', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
      { name: 'Vanilla & Raspberry', variants: [{ size: 'Small', price: '₹1,800' }, { size: 'Medium', price: '₹2,500' }, { size: 'Big', price: '₹3,500' }] },
    ],
  },
]

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? menuData
    : menuData.filter(c => c.id === activeCategory)

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

      {/* Category Filter Tabs */}
      <div className="category-tabs-wrap">
        <div className="category-tabs" role="tablist" aria-label="Menu categories">
          <button
            className={`cat-tab${activeCategory === 'all' ? ' active' : ''}`}
            onClick={() => setActiveCategory('all')}
            role="tab"
            aria-selected={activeCategory === 'all'}
            id="tab-all"
          >
            All
          </button>
          {menuData.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              role="tab"
              aria-selected={activeCategory === cat.id}
              id={`tab-${cat.id}`}
            >
              {cat.emoji} {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="menu-content">
        {filtered.map(cat => (
          <section key={cat.id} className="menu-section" id={cat.id} aria-labelledby={`heading-${cat.id}`}>
            <div className="container">
              <div className="menu-section-header">
                <div className="menu-section-emoji" aria-hidden="true">{cat.emoji}</div>
                <div>
                  <h2 className="display-md menu-section-title" id={`heading-${cat.id}`}>
                    {cat.category}
                  </h2>
                  {cat.note && <p className="menu-section-note">{cat.note}</p>}
                </div>
              </div>

              <div className="menu-items-list">
                {cat.items.map((item, i) => (
                  <div className="menu-item-card" key={i}>
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
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Order CTA */}
      <section className="menu-order-cta">
        <div className="container">
          <p className="label-caps" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>
            ✦ Ready to celebrate?
          </p>
          <p className="menu-cta-text">
            Call us to place your order or enquire about custom cakes
          </p>
          <a href="tel:+919140223957" className="btn-primary menu-cta-btn" id="menu-call-btn">
            📞 +91 91402 23957
          </a>
          <p className="menu-note">All prices are for signature standard designs. Custom cakes priced on request.</p>
        </div>
      </section>

      {/* Footer */}
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
