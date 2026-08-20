# Changes

### 2026-08-20 — Pin Rakshabandhan collection near the front of the menu tabs
- **What changed:** The new "Rakshabandhan 2026" menu collection now appears right after Bestsellers instead of at the end of the tab list.
- **Why:** User reported the collection was showing up last and wanted it near the front.
- **Where:** `src/pages/MenuPage.jsx`
- **Technical details:** Added an `isRakshabandhan` matcher (checks handle/title for "raksha") to the existing collection-pinning logic, inserting it into the pin order between Bestsellers and Father's Day/Mango.
