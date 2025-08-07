# GitHub Copilot Instructions for MR Foods Website

## Project Overview
MR Foods is a modern food delivery website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. It features a restaurant menu, cart functionality, and order placement system with a beautiful purple-themed UI.

## Tech Stack & Architecture
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables + shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Context API for cart functionality
- **UI Components**: Radix UI primitives with custom styling

## Key Features
- Responsive design with mobile-first approach
- Shopping cart with persistent state
- Dynamic menu categories (Indian Food, Chinese Food, Fast Food, Rajasthani Food, Cold Drinks)
- Order placement system with confirmation
- Animated UI elements and gradient effects
- Dark/light theme support via CSS variables

## Code Style & Standards

### Component Structure
```typescript
"use client" // Only when needed (client components)

import { useState, useEffect } from 'react'
import { ComponentProps } from '@/types' // Define proper types
import { Button } from '@/components/ui/button'
import { useCart } from '@/components/cart-context'

export default function ComponentName() {
  // Always use TypeScript interfaces
  // Use proper state management
  // Follow React best practices
}
```

### Naming Conventions
- **Files**: kebab-case for files (`order-now.tsx`, `cart-sidebar.tsx`)
- **Components**: PascalCase (`CartSidebar`, `FoodCard`)
- **Variables**: camelCase (`customerName`, `totalBill`)
- **Constants**: UPPER_SNAKE_CASE (`FOOD_CATEGORIES`, `ALL_FOOD_ITEMS`)

### UI/UX Guidelines

#### Color Scheme
- **Primary**: Purple gradient `#CF9FFF` to `#B87FFF`
- **Secondary**: White with purple borders
- **Background**: Light gradient `from-purple-50 to-white`
- **Text**: Gray scale for hierarchy
- **Use CSS variables**: Prefer `style={{ color: '#CF9FFF' }}` for brand colors

#### Typography
- **Headings**: Use gradient text for main titles with `.gradient-text` class
- **Body**: Gray-600/700 for readability
- **Fonts**: Inter font family (already configured)

#### Components & Interactions
- **Buttons**: Use gradient backgrounds with hover transforms
- **Cards**: Apply `.card-hover` class for consistent hover effects
- **Forms**: Purple focus states with smooth transitions
- **Animations**: Use custom CSS animations (gradientShift, float, etc.)

### Data Management
- **Food Data**: Centralized in `/lib/foodData.ts`
- **Cart State**: Global context via `CartProvider`
- **Types**: Define interfaces for all data structures
- **Images**: Store in `/public/images/` with descriptive names

### Performance Best Practices
- Use Next.js Image component for optimization
- Implement lazy loading for images
- Use `"use client"` sparingly - only for interactive components
- Optimize bundle size with dynamic imports when needed

### Responsive Design
```css
/* Mobile-first approach */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
px-4 md:px-6 lg:px-8
text-lg md:text-xl lg:text-2xl
```

### Error Handling
- Provide fallback images for missing food photos
- Handle empty cart states gracefully
- Show loading states during transitions
- Use toast notifications for user feedback

### Accessibility
- Proper semantic HTML elements
- Alt text for all images
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance

### Code Organization
```
/app                    # Next.js app router pages
/components            # Reusable components
  /ui                  # shadcn/ui components
  cart-context.tsx     # Global state
  cart-sidebar.tsx     # Feature components
/lib                   # Utilities and data
  foodData.ts         # Menu data
  utils.ts            # Helper functions
/public/images         # Static assets
```

### Component Patterns

#### Custom Hooks
```typescript
// Create custom hooks for complex logic
export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
```

#### Form Handling
```typescript
// Use controlled components with proper validation
const [customerName, setCustomerName] = useState('')
const [selectedItems, setSelectedItems] = useState<{[key: number]: boolean}>({})
```

#### Styling Patterns
```typescript
// Consistent button styling
className="text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
style={{ background: 'linear-gradient(135deg, #CF9FFF, #B87FFF)' }}
```

### Testing Considerations
- Write unit tests for utility functions
- Test cart functionality thoroughly
- Verify responsive design on all devices
- Test order flow end-to-end
- Validate form inputs and error states

### Security Best Practices
- Validate all user inputs
- Sanitize data before displaying
- Use TypeScript for type safety
- Implement proper error boundaries

### SEO & Performance
- Use proper meta tags and page titles
- Implement structured data for food items
- Optimize images with Next.js Image component
- Use semantic HTML for better indexing
- Implement proper loading states

### Future Enhancements
- Add user authentication
- Implement payment integration
- Add order tracking functionality
- Include customer reviews and ratings
- Add search and filtering capabilities

## Common Patterns to Follow

1. **Always use TypeScript** - Define proper interfaces
2. **Consistent spacing** - 4-space indentation, logical grouping
3. **Error boundaries** - Handle edge cases gracefully  
4. **Loading states** - Show user feedback during async operations
5. **Mobile-first** - Design for mobile, enhance for desktop
6. **Purple branding** - Maintain consistent color usage throughout
7. **Smooth animations** - Use CSS transitions and transforms
8. **Clean code** - Follow single responsibility principle
9. **Type safety** - Avoid `any` types, use proper interfaces
10. **Performance** - Optimize images and minimize re-renders

Remember: This is a food delivery website focused on user experience, visual appeal, and smooth ordering functionality. Prioritize usability, accessibility, and brand consistency in all implementations.