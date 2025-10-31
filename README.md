# BookIt: Experiences & Slots

A complete end-to-end web application where users can explore travel experiences, select available slots, and complete bookings.

## Features

- Browse travel experiences
- View experience details and available slots
- Book experiences with date/time selection
- Apply promo codes
- Complete checkout process
- View booking confirmation

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

## Project Structure

```
├── app/                 # Next.js 15 App Router pages
│   ├── api/             # API routes
│   ├── details/[id]/    # Experience details page
│   ├── checkout/        # Checkout page
│   ├── confirmation/    # Booking confirmation page
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
├── lib/                 # Utilities, database connection, and models
│   ├── models/          # MongoDB models
│   └── data.ts          # Static data (fallback)
├── scripts/             # Database seeding scripts
├── docs/                # Comprehensive documentation
└── public/              # Static assets
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

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EcoHarbor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update the `MONGODB_URI` in `.env` file

4. **Run database seeding**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

7. **Start production server**
   ```bash
   npm start
   ```

## Documentation

For detailed information about the project, please refer to the documentation in the `docs/` directory:

- [Main Documentation](docs/README.md) - Overview, setup, and usage
- [Technical Documentation](docs/TECHNICAL.md) - Architecture, implementation details, and development approach
- [API Documentation](docs/API.md) - Detailed API endpoints and data models
- [Development Guide](docs/DEVELOPMENT.md) - Contributing guidelines, coding standards, and workflow

## Environment Variables

Create a `.env` file with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=your_api_url
```

## Deployment

This application can be deployed to Vercel with zero configuration. Make sure to set the environment variables in your Vercel project settings.

## Data Models

### Experience
- `id`: String (unique)
- `title`: String
- `location`: String
- `price`: Number
- `image`: String (image URL)
- `description`: String
- `about`: String
- `dates`: Array of date slots

### Booking
- `experienceId`: String
- `experienceTitle`: String
- `date`: String
- `time`: String
- `quantity`: Number
- `fullName`: String
- `email`: String
- `subtotal`: Number
- `taxes`: Number
- `total`: Number
- `promoCode`: String (optional)
- `refId`: String (unique)

### PromoCode
- `code`: String (unique)
- `discountType`: Enum ('percentage' or 'fixed')
- `discountValue`: Number
- `maxUses`: Number (optional)
- `usedCount`: Number
- `expirationDate`: Date (optional)
- `isActive`: Boolean