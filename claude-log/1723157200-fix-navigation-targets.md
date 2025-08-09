# Fix Navigation Menu Target Behavior - 2025-08-09

## Task Completed
Updated navigation to ensure internal menu links navigate within the same window instead of opening new windows or frames.

## Files Modified

- `src/data/navigation.json` - Removed `target: "view_frame"` from internal links
- `src/components/layout/Sidebar.tsx` - Updated route mapping and removed target attribute for internal links

## Changes Made

### Navigation Data (`navigation.json`)
- **Removed** `target: "view_frame"` from all internal pages:
  - Home (general2.html)
  - Facilities (facilities.html) 
  - Membership (membership.html)
  - Meetings (meetings.html)
  - The Rod (TheRod.html)
  - The Bow (TheBow.html)
  - The Gun (TheGun.html)
  - Club History (history.html)
  - Outdoor Organizations & Activity Links (links.html)
  - Civilian Marksmanship Program (cmp.html)
  - Club Clothing (ClubClothing/clubclothing.html)
  - Contact Us (contact.html)
  - Previous Events! (PreviousEvents.html)

- **Kept** `target: "_blank"` and `external: true` for external links:
  - Range Rules PDF
  - Archery Range Rules PDF  
  - Sunrise/Sunset Times (external website)

### Sidebar Component (`Sidebar.tsx`)
- **Added** React route mappings for:
  - `cmp.html` → `/cmp`
  - `contact.html` → `/contact`

- **Removed** `target={item.target}` attribute from regular `<a>` tags for internal pages

## Navigation Behavior After Fix

### Internal Pages (No new window/frame)
- ✅ Home - navigates to `/` 
- ✅ Facilities - navigates to `/facilities`
- ✅ CMP - navigates to `/cmp` 
- ✅ Contact - navigates to `/contact`
- ✅ Club Clothing - navigates to `/clubclothing`
- ✅ All other internal pages - regular page navigation (no target attribute)

### External Links (Keep new window behavior)
- ✅ Range Rules PDF - opens in new tab
- ✅ Archery Range Rules PDF - opens in new tab
- ✅ Sunrise/Sunset Times - opens in new tab

## Technical Details

The original navigation had `target: "view_frame"` which was meant for HTML frameset layouts. In modern React applications:

1. **React Router Links**: Use `<Link to="/route">` for internal navigation
2. **External Links**: Use `<ExternalLink>` component with `target="_blank"`
3. **Fallback Links**: Regular `<a>` tags without target attribute for same-window navigation

## Build Results
✅ Build successful after navigation changes
✅ Navigation bundle optimized (1.08 kB gzipped)
✅ No TypeScript errors
✅ All routes properly mapped

## User Experience Impact
- ✅ Internal navigation stays within the same browser window
- ✅ External links appropriately open in new tabs
- ✅ Consistent navigation behavior throughout the site
- ✅ Improved accessibility and usability