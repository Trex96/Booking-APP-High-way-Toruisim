# Highway Delite - Travel Experience Booking Application

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Development Approach](#development-approach)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Project Overview

Highway Delite is a full-stack travel experience booking application that allows users to:
- Browse curated travel experiences
- View detailed information about each experience
- Select available dates and time slots
- Apply promo codes during checkout
- Complete bookings with confirmation

The application follows modern web development practices with a focus on user experience, performance, and maintainability.

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router architecture
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless functions for backend endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

### Development Tools
- **npm** - Package manager
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing

## Project Structure

```
.
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   │   ├── experiences/   # Experience endpoints
│   │   ├── bookings/      # Booking endpoints
│   │   └── promo/         # Promo code endpoints
│   ├── details/[id]/      # Experience details page
│   ├── checkout/          # Checkout page
│   ├── confirmation/      # Booking confirmation page
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ExperienceCard.tsx
│   ├── Header.tsx
│   └── AnimatedBackground.tsx
├── lib/                   # Utilities and data
│   ├── models/            # MongoDB models
│   ├── db.ts              # Database connection
│   └── data.ts            # Static data (fallback)
├── docs/                  # Documentation
├── public/                # Static assets
├── scripts/               # Utility scripts
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EcoHarbor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:3000

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with initial data
- `npm run lint` - Run ESLint

## Database Schema

### Experience
```typescript
interface IExperience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: IDateSlot[];
}

interface IDateSlot {
  date: string;
  available: number;
  times: ITimeSlot[];
}

interface ITimeSlot {
  time: string;
  available: number;
  soldOut?: boolean;
}
```

### Booking
```typescript
interface IBooking {
  experienceId: string;
  experienceTitle: string;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  subtotal: number;
  taxes: number;
  total: number;
  promoCode: string | null;
  refId: string;
}
```

### PromoCode
```typescript
interface IPromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxUses: number | null;
  usedCount: number;
  expirationDate: Date | null;
  isActive: boolean;
}
```

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get experience by ID

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings

### Promo Codes
- `POST /api/promo` - Validate a promo code

## Development Approach

### MongoDB Integration
The application uses MongoDB with Mongoose for data persistence. Models are defined in `lib/models/` with proper validation and relationships.

### Next.js API Routes
Backend functionality is implemented using Next.js API routes, providing a serverless architecture that's easy to deploy and scale.

### Framer Motion Animations
Smooth animations and transitions are implemented throughout the application using Framer Motion, with proper separation of client and server components.

### Responsive Design
The UI is fully responsive, working on mobile, tablet, and desktop devices using Tailwind CSS responsive utilities.

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Manual Deployment
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Kill the process using the port or change the port in package.json

2. **MongoDB connection error**
   - Verify MONGODB_URI in .env file
   - Ensure MongoDB instance is running

3. **Animation issues**
   - Ensure Framer Motion components are in client components
   - Check for proper "use client" directives

### Getting Help
If you encounter issues not covered in this documentation, please:
1. Check the browser console for errors
2. Check the terminal for server errors
3. Review the Next.js documentation
4. Open an issue in the repository