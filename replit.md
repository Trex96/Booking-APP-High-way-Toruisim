# Highway Delite - Experience Booking Platform

## Overview
Highway Delite is a modern, responsive experience booking website built with Next.js 15, TypeScript, and Tailwind CSS. The platform allows users to browse and book adventure experiences like kayaking, hiking, boat cruises, and more.

**Technology Stack:**
- Next.js 15.5.6 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icons)

**Current State:** 
Fully functional booking platform with complete user flow from browsing to confirmation.

## Recent Changes (October 31, 2025)
- Initial project setup with Next.js, TypeScript, and Tailwind CSS
- Created complete booking flow: Homepage → Details → Checkout → Confirmation
- Implemented search functionality to filter experiences
- Added responsive design with mobile-first approach
- Fixed Next.js 15 async searchParams requirement
- Optimized images with proper sizes and priority props
- Integrated stock images for all adventure experiences

## Project Architecture

### Directory Structure
```
/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with experience grid
│   ├── details/[id]/page.tsx     # Experience details page
│   ├── checkout/page.tsx         # Checkout form
│   ├── confirmation/page.tsx     # Booking confirmation
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── Header.tsx                # Navigation header
│   └── ExperienceCard.tsx        # Experience card component
├── lib/                          # Utilities and data
│   └── data.ts                   # Experience data structure
├── public/images/                # Static images
├── tailwind.config.ts            # Tailwind configuration
├── next.config.ts                # Next.js configuration
└── package.json                  # Dependencies
```

### Key Features
1. **Homepage**: Grid layout displaying all available experiences with search functionality
2. **Search**: Real-time filtering of experiences by title, location, or description
3. **Experience Details**: 
   - Large hero image
   - Date selector with availability indicators (e.g., "4 left")
   - Time slot selection with "sold out" status
   - Quantity selector
   - Dynamic price calculation (subtotal + taxes)
4. **Checkout**: 
   - Customer information form (name, email)
   - Promo code input
   - Terms & safety policy checkbox
   - Order summary
5. **Confirmation**: Success page with generated booking reference ID

### Design System
- **Primary Color**: Yellow (#FDB927) - used for buttons and accents
- **Typography**: System fonts with clean, modern appearance
- **Layout**: Responsive grid system (4 columns on desktop, 2 on tablet, 1 on mobile)
- **Components**: Rounded corners, subtle shadows, hover effects

### Data Structure
Experiences include:
- ID, title, location, price
- Hero image
- Description and detailed about text
- Multiple date slots with availability
- Time slots per date with capacity tracking
- Sold-out status tracking

### State Management
- URL-based navigation for search (query parameters)
- SessionStorage for booking data persistence between pages
- React useState for component-level state (date/time selection, quantity)

### API Routes
Currently using static data. Future enhancement: Add API routes for dynamic experience management.

## Development

### Running the Project
```bash
npm run dev
```
Server runs on http://localhost:5000

### Building for Production
```bash
npm run build
npm start
```

### Key Dependencies
- next: ^15.1.6
- react: ^18
- tailwindcss: ^3.4.1
- lucide-react: ^0.460.0
- autoprefixer: Latest

## Future Enhancements
1. **Backend Integration**: 
   - Database for experience storage (PostgreSQL/MongoDB)
   - User authentication and account management
   - Booking history tracking
   
2. **Payment Processing**:
   - Stripe/Razorpay integration
   - Real payment gateway
   
3. **Admin Dashboard**:
   - Manage experiences (add/edit/delete)
   - View bookings
   - Update availability
   
4. **Enhanced Features**:
   - Email confirmations
   - PDF ticket generation
   - Reviews and ratings
   - Image galleries
   - Maps integration for locations
   
5. **Performance**:
   - Image optimization with next/image
   - Server-side caching
   - Database connection pooling

## Notes
- Images are sourced from stock photo libraries
- Promo code functionality is placeholder (shows alert)
- Tax calculation is hardcoded at 5.9%
- Booking reference IDs are randomly generated (format: HUF*****SO)
- All data is in-memory and resets on page refresh
