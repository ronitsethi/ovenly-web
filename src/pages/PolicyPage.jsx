import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import './PolicyPage.css'

// ────────────────────────────────────────────────────────────
// Policy Content
// ────────────────────────────────────────────────────────────

const policies = {
  'refund-policy': {
    title: 'Return & Refund Policy',
    sections: [
      {
        content: [
          'Due to the perishable and made-to-order nature of our bakery products, all sales are final. We do not offer returns, exchanges, or refunds once an order has been placed or delivered.',
          'However, if you receive an incorrect or damaged item, please contact us immediately with your order details and photos, and we will review the issue at our discretion.',
          'Thank you for understanding.',
        ],
      },
    ],
  },

  'privacy-policy': {
    title: 'Privacy Policy',
    lastUpdated: '14 May 2026',
    intro: 'Oven\'ly respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website, place an order, or contact us.\n\nBy using our website or placing an order with us, you agree to the practices described in this Privacy Policy.',
    sections: [
      {
        heading: '1. Information We Collect',
        content: ['We may collect the following personal information from you:'],
        list: [
          'Name',
          'Phone number',
          'Email address',
          'Billing and delivery address',
          'Order details',
          'Payment status',
          'Customisation details shared for cakes or bakery products',
          'Messages or enquiries sent to us',
          'Website usage information such as device details, IP address, browser type, and cookies',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        content: ['We use your personal information to:'],
        list: [
          'Process and fulfil your orders',
          'Deliver your products to the correct address',
          'Contact you regarding your order',
          'Share order updates and customer support responses',
          'Manage payments and payment confirmations',
          'Improve our website, products, and services',
          'Prevent fraud, misuse, or unauthorised activity',
          'Send promotional updates, offers, or marketing messages where permitted',
        ],
      },
      {
        heading: '3. Payments',
        content: [
          'Payments made through our website are processed securely through Shopify and/or third-party payment providers.',
          'We do not store your full credit card, debit card, UPI, or banking details. Payment-related information is handled by the relevant payment provider according to their own security and privacy policies.',
        ],
      },
      {
        heading: '4. Sharing of Information',
        content: ['We may share your information only when necessary with:'],
        list: [
          'Shopify, as our ecommerce platform provider',
          'Payment gateway providers',
          'Delivery or logistics partners',
          'Technology, hosting, analytics, or customer support service providers',
          'Legal or government authorities, if required by applicable law',
        ],
        footer: 'We do not sell your personal information.',
      },
      {
        heading: '5. Cookies and Website Tracking',
        content: [
          'Our website may use cookies and similar technologies to improve your browsing experience, remember preferences, analyse website traffic, and improve our services.',
          'You may disable cookies through your browser settings, but some parts of the website may not function properly if cookies are disabled.',
        ],
      },
      {
        heading: '6. Marketing Communications',
        content: [
          'We may contact you through email, SMS, phone, or WhatsApp for order updates, customer support, offers, or promotional communication.',
          'You may opt out of promotional communication at any time by contacting us or using the unsubscribe option where available. However, we may still contact you for order-related or service-related matters.',
        ],
      },
      {
        heading: '7. Data Retention',
        content: [
          'We retain your personal information only for as long as necessary to fulfil orders, provide customer support, maintain business records, comply with legal obligations, resolve disputes, and enforce our policies.',
        ],
      },
      {
        heading: '8. Data Security',
        content: [
          'We take reasonable steps to protect your personal information from unauthorised access, misuse, loss, or disclosure.',
          'However, no online platform, website, or method of electronic transmission is completely secure. You should avoid sharing sensitive information through unsecured channels.',
        ],
      },
      {
        heading: '9. Children\'s Privacy',
        content: [
          'Our website is intended for use by adults. We do not knowingly collect personal information from children.',
          'If a parent or guardian believes that a child has provided us with personal information, they may contact us and request deletion of such information.',
        ],
      },
      {
        heading: '10. Your Rights',
        content: [
          'Subject to applicable law, you may contact us to request access, correction, or deletion of your personal information.',
          'We may need to verify your identity before processing such requests.',
        ],
      },
      {
        heading: '11. Third-Party Links',
        content: [
          'Our website may contain links to third-party websites, platforms, or services. We are not responsible for the privacy practices, security, or content of such third-party websites.',
          'You should review their privacy policies before sharing any personal information with them.',
        ],
      },
      {
        heading: '12. Changes to This Privacy Policy',
        content: [
          'We may update this Privacy Policy from time to time. Any updated version will be posted on this page with the revised "Last updated" date.',
        ],
      },
      {
        heading: '13. Contact Us',
        content: [
          'For any questions, requests, or concerns regarding this Privacy Policy, you may contact us at:',
        ],
        contact: true,
      },
    ],
  },

  'terms-of-service': {
    title: 'Terms of Service',
    lastUpdated: '14 May 2026',
    intro: 'Welcome to Oven\'ly. This website is operated by Oven\'ly. Throughout the site, the terms "we", "us" and "our" refer to Oven\'ly. By visiting our website, placing an order, or purchasing from us, you agree to be bound by the following Terms of Service.\n\nPlease read these Terms carefully before using our website or placing an order.',
    sections: [
      {
        heading: '1. Use of Our Website',
        content: [
          'By using this website, you confirm that you are at least 18 years old or are using the website under the supervision of a parent or guardian.',
          'You agree not to use our website for any unlawful, fraudulent, harmful, or unauthorised purpose.',
        ],
      },
      {
        heading: '2. Products and Orders',
        content: [
          'Oven\'ly sells bakery products, cakes, desserts, and related food items. Many of our products may be freshly prepared, customised, or made to order.',
          'When you place an order, you are responsible for ensuring that all details provided are accurate, including product selection, quantity, customisation details, delivery address, contact number, date, and time.',
          'We reserve the right to refuse, cancel, or limit any order at our discretion, including where product availability, pricing errors, payment issues, delivery limitations, or suspected misuse are involved.',
        ],
      },
      {
        heading: '3. Product Images and Descriptions',
        content: [
          'We try our best to display product images, descriptions, flavours, colours, sizes, and designs as accurately as possible.',
          'However, actual products may vary slightly from images due to lighting, screen settings, ingredient availability, handmade preparation, decoration style, or packaging differences.',
          'For customised cakes or bakery items, minor variations in design, colour, decoration, or finishing may occur.',
        ],
      },
      {
        heading: '4. Pricing and Payments',
        content: [
          'All prices listed on our website are in Indian Rupees unless stated otherwise.',
          'Prices may change without prior notice. The price applicable to your order will be the price shown at the time of checkout.',
          'Orders will be processed only after successful payment, unless we specifically allow another payment arrangement.',
          'Payments may be processed through Shopify, payment gateways, UPI, cards, wallets, or other available payment methods. We are not responsible for payment failures caused by banks, payment gateways, network issues, or incorrect payment details.',
        ],
      },
      {
        heading: '5. Delivery',
        content: [
          'We offer delivery to selected locations as available on our website or as confirmed by us.',
          'Delivery timelines are estimates and may be affected by traffic, weather, incorrect address details, rider availability, operational delays, or other circumstances beyond our control.',
          'You are responsible for providing a complete and accurate delivery address and reachable phone number. If delivery fails due to incorrect information, unavailability of the recipient, locked premises, or refusal to accept the order, we will not be liable for refund or replacement.',
          'Once an order is delivered to the address provided, it will be considered completed.',
        ],
      },
      {
        heading: '6. Customer Pickup',
        content: [
          'If pickup is available and selected, you are responsible for collecting the order at the confirmed date and time.',
          'Bakery products are perishable. We are not responsible for quality issues, damage, melting, spoilage, or loss caused by delayed pickup.',
        ],
      },
      {
        heading: '7. Cancellations',
        content: [
          'Because our products are perishable and often made to order, cancellation requests may not be accepted once order preparation has started.',
          'If you want to cancel an order, you must contact us as soon as possible. Acceptance of cancellation is at our sole discretion and will depend on whether preparation, customisation, packaging, or delivery arrangements have already begun.',
          'No cancellation will be allowed for orders that have already been prepared, dispatched, delivered, or picked up.',
        ],
      },
      {
        heading: '8. Returns and Refunds',
        content: [
          'Due to the perishable and made-to-order nature of our bakery products, all sales are final.',
          'We do not offer returns, exchanges, or refunds once an order has been placed, prepared, dispatched, delivered, or picked up.',
          'However, if you receive an incorrect or damaged item, you must contact us immediately with your order details and clear photos. We will review the issue and may, at our discretion, offer a suitable resolution.',
          'Any resolution will depend on the facts of the case and does not create an automatic right to refund, replacement, or compensation.',
        ],
      },
      {
        heading: '9. Custom Orders',
        content: [
          'For customised cakes, message cakes, event orders, bulk orders, or special designs, you are responsible for providing correct details, spellings, names, dates, references, flavours, sizes, and instructions.',
          'We will not be responsible for mistakes resulting from incorrect or incomplete information provided by you.',
          'Custom designs are prepared by hand and may not be exact replicas of reference images. Reference images are used only for inspiration and guidance.',
        ],
      },
      {
        heading: '10. Allergies and Food Information',
        content: [
          'Our products may contain or come into contact with common allergens, including but not limited to milk, eggs, wheat, gluten, nuts, soy, and other ingredients.',
          'If you have any allergy, dietary restriction, or ingredient concern, you must inform us before placing an order.',
          'While we may try to accommodate requests where possible, we cannot guarantee a completely allergen-free environment.',
          'You are responsible for checking product suitability before consumption.',
        ],
      },
      {
        heading: '11. Storage and Handling',
        content: [
          'Bakery products must be stored and handled properly after delivery or pickup.',
          'Certain products may require refrigeration, careful handling, or consumption within a specific time. We are not responsible for spoilage, melting, damage, change in texture, or quality deterioration caused by improper storage, delayed consumption, heat exposure, travel, or mishandling after delivery or pickup.',
        ],
      },
      {
        heading: '12. Offers, Discounts, and Promotions',
        content: [
          'Any offers, discounts, coupon codes, or promotions are subject to availability and specific terms.',
          'We reserve the right to modify, suspend, or withdraw any offer at any time without prior notice.',
          'Offers cannot be clubbed unless specifically stated.',
        ],
      },
      {
        heading: '13. Intellectual Property',
        content: [
          'All content on this website, including text, images, product photos, logos, graphics, designs, and branding, belongs to Oven\'ly or is used with permission.',
          'You may not copy, reproduce, modify, distribute, or use our content for commercial purposes without our written consent.',
        ],
      },
      {
        heading: '14. User Content and Reviews',
        content: [
          'If you submit reviews, feedback, photos, comments, or other content to us, you allow us to use, display, reproduce, or share such content for business, marketing, or promotional purposes.',
          'You must not submit content that is false, abusive, unlawful, offensive, misleading, or violates the rights of any third party.',
        ],
      },
      {
        heading: '15. Third-Party Services',
        content: [
          'Our website may use third-party platforms and services, including Shopify, payment gateways, delivery partners, analytics tools, and social media platforms.',
          'We are not responsible for the actions, policies, errors, delays, or failures of third-party service providers.',
          'Your use of third-party services may also be governed by their own terms and policies.',
        ],
      },
      {
        heading: '16. Limitation of Liability',
        content: [
          'To the maximum extent permitted by law, Oven\'ly will not be liable for any indirect, incidental, special, or consequential loss arising from your use of our website, products, delivery services, or inability to use our services.',
          'Our total liability, if any, shall not exceed the amount paid by you for the specific order giving rise to the claim.',
          'Nothing in these Terms limits rights that cannot be excluded under applicable law.',
        ],
      },
      {
        heading: '17. Grievances and Customer Support',
        content: [
          'If you have any complaint, issue, or concern regarding your order or our services, please contact us using the details below.',
          'We will review genuine complaints and respond within a reasonable time.',
        ],
        contact: true,
      },
      {
        heading: '18. Changes to These Terms',
        content: [
          'We may update these Terms of Service from time to time. Any updated version will be posted on this page with the revised "Last updated" date.',
          'Your continued use of our website after changes are posted means you accept the updated Terms.',
        ],
      },
      {
        heading: '19. Governing Law and Jurisdiction',
        content: [
          'These Terms shall be governed by the laws of India.',
          'Any disputes arising from these Terms, our website, or our services shall be subject to the jurisdiction of the courts located in Kanpur, Uttar Pradesh, India.',
        ],
      },
    ],
  },

  'contact': {
    title: 'Contact Information',
    sections: [
      {
        content: [],
        contactFull: true,
      },
    ],
  },

  'legal-notice': {
    title: 'Legal Notice',
    lastUpdated: '14 May 2026',
    intro: 'This website is operated by Oven\'ly. By accessing or using this website, you agree to the terms, policies, and conditions published on this website, including our Terms of Service, Privacy Policy, Return & Refund Policy, and any other applicable policies.',
    sections: [
      {
        heading: 'Business Information',
        content: [],
        contact: true,
      },
      {
        heading: 'Website Content',
        content: [
          'All information, product descriptions, prices, images, designs, graphics, text, logos, and other content displayed on this website are provided for general information and shopping purposes only.',
          'We try to keep all information accurate and updated, but we do not guarantee that all content will always be error-free, complete, or current.',
          'We reserve the right to update, modify, or remove any website content, product listing, price, offer, or policy at any time without prior notice.',
        ],
      },
      {
        heading: 'Product Disclaimer',
        content: [
          'Oven\'ly sells bakery products and related food items. Product images are for reference purposes only. Actual products may vary slightly due to handmade preparation, decoration style, ingredient availability, lighting, packaging, or screen display differences.',
          'Customers are responsible for checking product details, customisation information, delivery details, allergy concerns, and storage instructions before placing an order.',
        ],
      },
      {
        heading: 'Intellectual Property',
        content: [
          'All content on this website, including product photos, text, graphics, logos, designs, branding, and layout, belongs to Oven\'ly or is used with permission.',
          'You may not copy, reproduce, modify, distribute, publish, or use any content from this website for commercial purposes without our prior written permission.',
        ],
      },
      {
        heading: 'Third-Party Services',
        content: [
          'This website may use third-party platforms and service providers, including Shopify, payment gateways, delivery partners, analytics tools, and social media platforms.',
          'We are not responsible for the actions, errors, policies, delays, or failures of third-party service providers. Your use of such services may also be subject to their own terms and privacy policies.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        content: [
          'To the maximum extent permitted by applicable law, Oven\'ly shall not be liable for any direct, indirect, incidental, special, or consequential loss arising from the use of this website, products, services, or third-party platforms linked to or used by this website.',
          'Nothing in this Legal Notice limits any rights that cannot be excluded under applicable law.',
        ],
      },
      {
        heading: 'Governing Law',
        content: [
          'This Legal Notice shall be governed by the laws of India.',
          'Any disputes arising from the use of this website or our services shall be subject to the jurisdiction of the courts located in Kanpur, Uttar Pradesh, India.',
        ],
      },
      {
        heading: 'Contact',
        content: ['For any questions regarding this Legal Notice, please contact us at:'],
        contact: true,
      },
    ],
  },
}

// ────────────────────────────────────────────────────────────
// Sidebar navigation
// ────────────────────────────────────────────────────────────
const policyNav = [
  { slug: 'refund-policy', label: 'Refund Policy' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-of-service', label: 'Terms of Service' },
  { slug: 'legal-notice', label: 'Legal Notice' },
  { slug: 'contact', label: 'Contact' },
]

// ────────────────────────────────────────────────────────────
// Contact block
// ────────────────────────────────────────────────────────────
function ContactBlock({ full }) {
  return (
    <div className="policy-contact">
      {full && (
        <>
          <div className="policy-contact-row">
            <span className="policy-contact-label">Trade name</span>
            <span>Oven'ly <em>(Unit of Springfields)</em></span>
          </div>
          <div className="policy-contact-row">
            <span className="policy-contact-label">GST number</span>
            <span>09ADUPG7894D1ZV</span>
          </div>
          <div className="policy-contact-row">
            <span className="policy-contact-label">FSSAI Registration Number</span>
            <span>22725662000226</span>
          </div>
        </>
      )}
      <div className="policy-contact-row">
        <span className="policy-contact-label">Email</span>
        <a href="mailto:ovenly.21@gmail.com">ovenly.21@gmail.com</a>
      </div>
      <div className="policy-contact-row">
        <span className="policy-contact-label">Phone</span>
        <a href="tel:+919140223957">+91 91402 23957</a>
      </div>
      <div className="policy-contact-row">
        <span className="policy-contact-label">Address</span>
        <span>9/72 D Santushti, Santushti, Kanpur, Uttar Pradesh, 208002, India</span>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────
// Page component
// ────────────────────────────────────────────────────────────
export default function PolicyPage() {
  const { slug } = useParams()
  const policy = policies[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!policy) {
    return (
      <main className="page policy-page">
        <div className="policy-layout container">
          <div className="policy-not-found">
            <h1>Page Not Found</h1>
            <p>The policy page you're looking for doesn't exist.</p>
            <Link to="/" className="btn-primary">Go Home</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="page policy-page">
      <div className="policy-layout">
        {/* Sidebar */}
        <aside className="policy-sidebar">
          <nav className="policy-nav" aria-label="Policy navigation">
            <span className="policy-nav-label label-caps">Policies</span>
            {policyNav.map((item) => (
              <Link
                key={item.slug}
                to={`/policies/${item.slug}`}
                className={`policy-nav-link${item.slug === slug ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <article className="policy-content">
          <header className="policy-header">
            <h1 className="display-lg policy-title">{policy.title}</h1>
            {policy.lastUpdated && (
              <p className="policy-date">Last updated: {policy.lastUpdated}</p>
            )}
          </header>

          {policy.intro && (
            <div className="policy-intro">
              {policy.intro.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {policy.sections.map((section, i) => (
            <section className="policy-section" key={i}>
              {section.heading && (
                <h2 className="policy-section-heading">{section.heading}</h2>
              )}
              {section.content.map((p, j) => (
                <p key={j} className="policy-text">{p}</p>
              ))}
              {section.list && (
                <ul className="policy-list">
                  {section.list.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              )}
              {section.footer && (
                <p className="policy-text policy-text--strong">{section.footer}</p>
              )}
              {section.contact && <ContactBlock />}
              {section.contactFull && <ContactBlock full />}
            </section>
          ))}

          {/* Back to home */}
          <div className="policy-back">
            <Link to="/" className="policy-back-link">
              ← Back to Home
            </Link>
          </div>
        </article>
      </div>

      <Footer/>
    </main>
  )
}
