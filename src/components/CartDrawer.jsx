import { useState, useRef, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import {
  getMinPickupDate,
  getMaxPickupDate,
  getAvailableTimeSlots,
  formatDateDisplay,
  formatTimeDisplay,
} from '../lib/pickupSlots'
import './CartDrawer.css'

/* ─── Fixed pickup address ─── */
const PICKUP_ADDRESS = {
  line1: '9/72 D, \'Santushti\'',
  line2: 'Opposite Benajhabar Telephone Exchange',
  area: 'Arya Nagar, Kanpur',
  pin: '208002',
}

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    isLoading,
    updateQuantity,
    removeItem,
    updateNote,
    updateAttributes,
    checkout,
    totalQuantity,
  } = useCart()

  /* ── Form state ── */
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [pickupDate, setPickupDate] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [noteOpen, setNoteOpen] = useState(false)
  const [noteValue, setNoteValue] = useState('')
  const noteInitialized = useRef(false)

  /* ── Time slots derived from selected date ── */
  const [timeSlots, setTimeSlots] = useState([])

  useEffect(() => {
    if (pickupDate) {
      const slots = getAvailableTimeSlots(pickupDate)
      setTimeSlots(slots)
      // If previously selected time is no longer valid, reset it
      if (pickupTime && !slots.find(s => s.value === pickupTime)) {
        setPickupTime('')
      }
    } else {
      setTimeSlots([])
      setPickupTime('')
    }
  }, [pickupDate]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Sync note from cart on first load ── */
  if (cart?.note && !noteInitialized.current) {
    setNoteValue(cart.note)
    noteInitialized.current = true
  }

  /* ── Handlers ── */
  const handlePhoneChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    setPhone(digits)
  }

  const isPhoneValid = phone.length === 10
  const isNameValid = customerName.trim().length >= 2
  const isFormComplete = isNameValid && isPhoneValid && pickupDate && pickupTime

  /**
   * On checkout, batch-update all attributes then redirect.
   */
  const handleCheckout = async () => {
    if (!isFormComplete) return

    const attributes = [
      { key: 'Customer Name', value: customerName.trim() },
      { key: 'Phone Number', value: `+91${phone}` },
      { key: 'Pickup Date', value: formatDateDisplay(pickupDate) },
      { key: 'Pickup Time', value: formatTimeDisplay(pickupTime) },
      { key: 'Pickup Address', value: `${PICKUP_ADDRESS.line1}, ${PICKUP_ADDRESS.line2}, ${PICKUP_ADDRESS.area} – ${PICKUP_ADDRESS.pin}` },
    ]

    await updateAttributes(attributes)

    // Also persist the special instructions note
    if (noteValue.trim()) {
      await updateNote(noteValue.trim())
    }

    checkout()
  }

  /* ── Derived ── */
  const lines = cart?.lines || []
  const subtotal = cart?.cost?.subtotalAmount
  const total = cart?.cost?.totalAmount
  const minDate = getMinPickupDate()
  const maxDate = getMaxPickupDate()

  /* ── Checkout button label ── */
  const getCheckoutLabel = () => {
    if (isLoading) return 'Processing…'
    if (!isNameValid) return 'Enter Your Name'
    if (!isPhoneValid) return 'Enter Phone Number'
    if (!pickupDate) return 'Select Pickup Date'
    if (!pickupTime) return 'Select Time Slot'
    return 'Proceed to Payment'
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop${isCartOpen ? ' open' : ''}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`cart-drawer${isCartOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="cart-header">
          <h2 className="cart-title">
            Your Cart
            {totalQuantity > 0 && (
              <span className="cart-count-badge">{totalQuantity}</span>
            )}
          </h2>
          <button
            className="cart-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {lines.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-sub">
                Add some delicious treats from our menu!
              </p>
              <button
                className="btn-primary cart-empty-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <ul className="cart-items">
                {lines.map(line => (
                  <li key={line.id} className="cart-item">
                    <div className="cart-item-info">
                      <p className="cart-item-name">{line.productTitle}</p>
                      {line.variantTitle !== 'Default Title' && (
                        <p className="cart-item-variant">{line.variantTitle}</p>
                      )}
                      <p className="cart-item-price">
                        ₹{parseFloat(line.price?.amount || 0).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="cart-qty-controls">
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="cart-qty-value">{line.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="cart-remove-btn"
                        onClick={() => removeItem(line.id)}
                        disabled={isLoading}
                        aria-label={`Remove ${line.productTitle}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* ─── Pickup Details Section ─── */}
              <div className="cart-pickup-section">
                <div className="cart-section-header">
                  <span className="cart-section-icon">🧁</span>
                  <h3 className="cart-section-title">Pickup Details</h3>
                </div>

                {/* Customer Name */}
                <div className="cart-field">
                  <label className="cart-field-label" htmlFor="cart-name">
                    <span className="cart-field-icon">👤</span>
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    id="cart-name"
                    className="cart-field-input"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                  />
                  {customerName.length > 0 && !isNameValid && (
                    <p className="cart-field-hint">Please enter at least 2 characters</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="cart-field">
                  <label className="cart-field-label" htmlFor="cart-phone">
                    <span className="cart-field-icon">📱</span>
                    <span>Mobile Number</span>
                  </label>
                  <div className="cart-phone-wrap">
                    <span className="cart-phone-prefix">+91</span>
                    <input
                      type="tel"
                      id="cart-phone"
                      className="cart-field-input cart-phone-input"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </div>
                  {phone.length > 0 && !isPhoneValid && (
                    <p className="cart-field-hint">Enter a valid 10-digit number</p>
                  )}
                </div>

                {/* Pickup Date */}
                <div className="cart-field">
                  <label className="cart-field-label" htmlFor="pickup-date">
                    <span className="cart-field-icon">📅</span>
                    <span>Pickup Date</span>
                  </label>
                  <input
                    type="date"
                    id="pickup-date"
                    className="cart-field-input"
                    value={pickupDate}
                    min={minDate}
                    max={maxDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                  {pickupDate && (
                    <p className="cart-field-selected">
                      {formatDateDisplay(pickupDate)}
                    </p>
                  )}
                </div>

                {/* Time Slot */}
                <div className="cart-field">
                  <label className="cart-field-label" htmlFor="pickup-time">
                    <span className="cart-field-icon">🕐</span>
                    <span>Time Slot</span>
                  </label>
                  {!pickupDate ? (
                    <p className="cart-field-hint-muted">Select a date first</p>
                  ) : timeSlots.length === 0 ? (
                    <p className="cart-field-hint">No slots available for this date. Try tomorrow!</p>
                  ) : (
                    <div className="cart-time-grid">
                      {timeSlots.map(slot => (
                        <button
                          key={slot.value}
                          type="button"
                          className={`cart-time-chip${pickupTime === slot.value ? ' active' : ''}`}
                          onClick={() => setPickupTime(slot.value)}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pickup Address (fixed) */}
                <div className="cart-field">
                  <label className="cart-field-label">
                    <span className="cart-field-icon">📍</span>
                    <span>Pickup Address</span>
                  </label>
                  <div className="cart-address-card">
                    <p className="cart-address-line cart-address-bold">{PICKUP_ADDRESS.line1}</p>
                    <p className="cart-address-line">{PICKUP_ADDRESS.line2}</p>
                    <p className="cart-address-line">{PICKUP_ADDRESS.area}</p>
                    <p className="cart-address-line cart-address-pin">{PICKUP_ADDRESS.pin}</p>
                  </div>
                </div>

                {/* Special Instructions (collapsible) */}
                <div className="cart-field cart-field-last">
                  <button
                    className="cart-si-toggle"
                    onClick={() => setNoteOpen(!noteOpen)}
                    aria-expanded={noteOpen}
                  >
                    <span className="cart-field-label" style={{ marginBottom: 0 }}>
                      <span className="cart-field-icon">📝</span>
                      <span>Special Instructions</span>
                    </span>
                    <span className={`cart-si-chevron${noteOpen ? ' open' : ''}`}>+</span>
                  </button>
                  {noteOpen && (
                    <div className="cart-si-body">
                      <textarea
                        className="cart-si-textarea"
                        placeholder="E.g. message on cake, allergies, any preferences…"
                        value={noteValue}
                        onChange={(e) => setNoteValue(e.target.value)}
                        onBlur={() => updateNote(noteValue)}
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer — only show if items exist */}
        {lines.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              {subtotal && (
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>₹{parseFloat(subtotal.amount).toLocaleString('en-IN')}</span>
                </div>
              )}
              {total && (
                <div className="cart-total-row cart-total-final">
                  <span>Total</span>
                  <span>₹{parseFloat(total.amount).toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>
            <p className="cart-note">Taxes calculated at checkout</p>
            <button
              className="btn-primary cart-checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading || !isFormComplete}
            >
              {getCheckoutLabel()}
            </button>
          </div>
        )}

        {/* Loading overlay */}
        {isLoading && (
          <div className="cart-loading">
            <div className="cart-spinner" />
          </div>
        )}
      </aside>
    </>
  )
}
