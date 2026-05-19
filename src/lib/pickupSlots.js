/**
 * Pickup Slot Utilities — Ovenly Bakery
 *
 * Business rules:
 *  - Pickup hours: 2:00 PM – 7:00 PM IST
 *  - Lead time: 2 hours from now (minimum)
 *  - Same-day cutoff: orders placed at/after 5:00 PM → no same-day pickup
 *  - Slot interval: 30 minutes
 *  - Max advance booking: 14 days
 */

const TIMEZONE = 'Asia/Kolkata'

// Store hours (24h format)
const STORE_OPEN_HOUR = 14    // 2:00 PM
const STORE_CLOSE_HOUR = 19   // 7:00 PM

// Lead time before first available slot
const LEAD_TIME_HOURS = 2

// If ordering at or after this hour, no same-day pickup
const SAME_DAY_CUTOFF_HOUR = 17 // 5:00 PM

// Time between each slot
const SLOT_INTERVAL_MINUTES = 30

// How many days ahead customers can book
const MAX_ADVANCE_DAYS = 14

/**
 * Get current time in IST as a Date-like object.
 * Returns { hours, minutes, year, month, date, dayOfWeek }
 */
function getNowIST() {
  const now = new Date()
  const istString = now.toLocaleString('en-US', { timeZone: TIMEZONE })
  const ist = new Date(istString)
  return {
    full: ist,
    hours: ist.getHours(),
    minutes: ist.getMinutes(),
    year: ist.getFullYear(),
    month: ist.getMonth(),
    date: ist.getDate(),
    dayOfWeek: ist.getDay(),
  }
}

/**
 * Format a Date to YYYY-MM-DD string
 */
function toDateString(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Get the minimum pickup date.
 * If current IST time is before the cutoff, today is valid.
 * Otherwise, tomorrow is the earliest.
 */
export function getMinPickupDate() {
  const now = getNowIST()
  const today = new Date(now.year, now.month, now.date)

  if (now.hours >= SAME_DAY_CUTOFF_HOUR) {
    // Past cutoff — earliest is tomorrow
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    return toDateString(tomorrow)
  }

  return toDateString(today)
}

/**
 * Get the maximum pickup date (14 days from today).
 */
export function getMaxPickupDate() {
  const now = getNowIST()
  const maxDate = new Date(now.year, now.month, now.date)
  maxDate.setDate(maxDate.getDate() + MAX_ADVANCE_DAYS)
  return toDateString(maxDate)
}

/**
 * Check if a given date string (YYYY-MM-DD) is today in IST.
 */
function isToday(dateString) {
  const now = getNowIST()
  const todayStr = toDateString(new Date(now.year, now.month, now.date))
  return dateString === todayStr
}

/**
 * Generate available time slots for a given date.
 *
 * For today:
 *   - Slots start at (now + 2 hours), rounded UP to next 30-min mark
 *   - Slots end at store close (7:00 PM)
 *   - If no valid slots remain, returns empty array
 *
 * For future dates:
 *   - Full range: 2:00 PM → 7:00 PM in 30-min intervals
 *
 * @param {string} dateString — YYYY-MM-DD
 * @returns {Array<{value: string, label: string}>}
 */
export function getAvailableTimeSlots(dateString) {
  if (!dateString) return []

  const slots = []

  let startHour = STORE_OPEN_HOUR
  let startMinute = 0

  if (isToday(dateString)) {
    const now = getNowIST()

    // Earliest possible time = now + lead time
    let earliestHour = now.hours + LEAD_TIME_HOURS
    let earliestMinute = now.minutes

    // Round up to next 30-min mark
    if (earliestMinute > 0 && earliestMinute <= 30) {
      earliestMinute = 30
    } else if (earliestMinute > 30) {
      earliestMinute = 0
      earliestHour += 1
    }

    // Clamp to store open
    if (earliestHour < STORE_OPEN_HOUR) {
      earliestHour = STORE_OPEN_HOUR
      earliestMinute = 0
    }

    startHour = earliestHour
    startMinute = earliestMinute
  }

  // Generate slots from start to store close
  let h = startHour
  let m = startMinute

  while (h < STORE_CLOSE_HOUR || (h === STORE_CLOSE_HOUR && m === 0)) {
    const totalMinutes = h * 60 + m
    const closeMinutes = STORE_CLOSE_HOUR * 60

    if (totalMinutes > closeMinutes) break

    const period = h >= 12 ? 'PM' : 'AM'
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
    const displayMin = String(m).padStart(2, '0')
    const label = `${displayHour}:${displayMin} ${period}`
    const value = `${String(h).padStart(2, '0')}:${displayMin}`

    slots.push({ value, label })

    // Advance by interval
    m += SLOT_INTERVAL_MINUTES
    if (m >= 60) {
      m -= 60
      h += 1
    }
  }

  return slots
}

/**
 * Format a date string (YYYY-MM-DD) to a friendly display format.
 * e.g. "Mon, 19 May 2026"
 */
export function formatDateDisplay(dateString) {
  if (!dateString) return ''
  const [y, m, d] = dateString.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: TIMEZONE,
  })
}

/**
 * Format a time value (HH:MM) to friendly display.
 * e.g. "14:30" → "2:30 PM"
 */
export function formatTimeDisplay(timeValue) {
  if (!timeValue) return ''
  const [h, m] = timeValue.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
  return `${displayHour}:${String(m).padStart(2, '0')} ${period}`
}
