# Technical Documentation

## Architecture Overview

Highway Delite follows a modern full-stack architecture using Next.js 15 with the App Router. The application is structured to separate concerns while maintaining close integration between frontend and backend components.

### Key Architectural Decisions

1. **Next.js App Router**: Utilizes the latest Next.js routing system with React Server Components for optimal performance
2. **API Routes**: Implements backend functionality within the Next.js framework using serverless functions
3. **MongoDB Integration**: Uses Mongoose ODM for structured data modeling and validation
4. **Component Architecture**: Separates client and server components appropriately for optimal performance

## Database Design

### Experience Model
The Experience model represents travel experiences with nested date and time slot information:

```javascript
const experienceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  about: { type: String, required: true },
  dates: [{
    date: { type: String, required: true },
    available: { type: Number, required: true, default: 0 },
    times: [{
      time: { type: String, required: true },
      available: { type: Number, required: true, default: 0 },
      soldOut: { type: Boolean, default: false }
    }]
  }]
}, {
  timestamps: true
});
```

### Booking Model
The Booking model stores completed bookings with all relevant information:

```javascript
const bookingSchema = new mongoose.Schema({
  experienceId: { type: String, required: true },
  experienceTitle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  quantity: { type: Number, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  subtotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  total: { type: Number, required: true },
  promoCode: { type: String, default: null },
  refId: { type: String, required: true, unique: true }
}, {
  timestamps: true
});
```

### PromoCode Model
The PromoCode model handles discount codes with validation rules:

```javascript
const promoCodeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  maxUses: { type: Number, default: null },
  usedCount: { type: Number, default: 0 },
  expirationDate: { type: Date, default: null },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});
```

## API Implementation

### Experience API (`/api/experiences`)

#### GET `/api/experiences`
Fetches all experiences from the database:
```typescript
export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find({});
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
```

#### GET `/api/experiences/:id`
Fetches a specific experience by ID:
```typescript
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const experience = await Experience.findOne({ id });
    
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    );
  }
}
```

### Booking API (`/api/bookings`)

#### POST `/api/bookings`
Creates a new booking:
```typescript
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Generate a unique reference ID
    const refId = "HUF" + Math.random().toString(36).substring(2, 8).toUpperCase() + "SO";
    
    // Create the booking
    const booking = new Booking({
      ...body,
      refId
    });
    
    await booking.save();
    
    return NextResponse.json({
      success: true,
      refId,
      booking
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
```

### Promo Code API (`/api/promo`)

#### POST `/api/promo`
Validates promo codes with comprehensive checks:
```typescript
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { code } = body;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Promo code is required' },
        { status: 400 }
      );
    }
    
    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true
    });
    
    if (!promoCode) {
      return NextResponse.json(
        { error: 'Invalid promo code' },
        { status: 404 }
      );
    }
    
    // Check expiration
    if (promoCode.expirationDate && new Date(promoCode.expirationDate) < new Date()) {
      return NextResponse.json(
        { error: 'Promo code has expired' },
        { status: 400 }
      );
    }
    
    // Check usage limits
    if (promoCode.maxUses && promoCode.usedCount >= promoCode.maxUses) {
      return NextResponse.json(
        { error: 'Promo code has reached its maximum uses' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      success: true,
      discountType: promoCode.discountType,
      discountValue: promoCode.discountValue
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
```

## Frontend Implementation

### Component Architecture

The frontend follows a component-based architecture with proper separation of concerns:

#### Server Components
- `app/page.tsx` - Home page (fetches data server-side)
- `app/details/[id]/page.tsx` - Experience details page
- `app/checkout/page.tsx` - Checkout page
- `app/confirmation/page.tsx` - Confirmation page

#### Client Components
- `components/Header.tsx` - Navigation header with search
- `components/ExperienceCard.tsx` - Experience card component
- `components/AnimatedBackground.tsx` - Animated background elements

### Data Fetching Strategy

The application uses a hybrid approach for data fetching:

1. **Server-side fetching** for initial page loads to improve SEO and performance
2. **Client-side fetching** for dynamic interactions and real-time updates

Example of server-side data fetching:
```typescript
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Fetch experiences from API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/experiences`, { 
    cache: 'no-store' 
  });
  const experiences: Experience[] = await res.json();
  // ... rest of component
}
```

### Animation Implementation

Animations are implemented using Framer Motion with proper client/server component separation:

#### Staggered Animations
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
```

#### Interactive Animations
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Apply
</motion.button>
```

## State Management

The application uses React's built-in state management with hooks:

### useState
For local component state:
```typescript
const [searchQuery, setSearchQuery] = useState("");
const [selectedDate, setSelectedDate] = useState(0);
```

### useEffect
For side effects and data fetching:
```typescript
useEffect(() => {
  const fetchExperience = async () => {
    // ... data fetching logic
  };
  fetchExperience();
}, [unwrappedParams.id]);
```

### Custom Hooks
Custom hooks could be extracted for reusable logic, though the current implementation keeps related logic within components for simplicity.

## Responsive Design

The application is fully responsive using Tailwind CSS:

### Mobile-First Approach
```html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

### Flexible Components
```html
<motion.div className="flex flex-col sm:flex-row gap-2">
```

### Touch-Friendly Interactions
```html
<button className="px-6 py-3 bg-primary text-black font-medium rounded-md">
```

## Performance Optimizations

### Code Splitting
Next.js automatically code-splits pages and components for optimal loading.

### Image Optimization
Next.js Image component for optimized image loading:
```typescript
<Image
  src={experience.image}
  alt={experience.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
  className="object-cover"
/>
```

### Caching Strategy
API responses use appropriate caching headers:
```typescript
const res = await fetch(url, { cache: 'no-store' });
```

## Security Considerations

### Input Validation
All API endpoints validate input data:
```typescript
if (!code) {
  return NextResponse.json(
    { error: 'Promo code is required' },
    { status: 400 }
  );
}
```

### Environment Variables
Sensitive information is stored in environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
```

### CORS
API routes implement proper CORS handling through Next.js middleware.

## Testing Strategy

### Unit Testing
Components and utility functions should be tested with Jest:
```javascript
// Example test structure
describe('ExperienceCard', () => {
  it('renders experience title correctly', () => {
    // ... test implementation
  });
});
```

### Integration Testing
API endpoints should be tested with integration tests:
```javascript
// Example test structure
describe('GET /api/experiences', () => {
  it('returns all experiences', async () => {
    // ... test implementation
  });
});
```

### End-to-End Testing
User flows should be tested with Cypress or Playwright:
```javascript
// Example test structure
describe('Booking Flow', () => {
  it('completes a booking successfully', () => {
    // ... test implementation
  });
});
```

## Deployment Considerations

### Environment Configuration
Different environments require different configuration:
```env
# Development
MONGODB_URI=mongodb://localhost:27017/bookit

# Production
MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/bookit
```

### Build Process
Next.js optimized build process:
```bash
npm run build
```

### Performance Monitoring
Implement monitoring for:
- Page load times
- API response times
- Database query performance
- Error rates

## Future Enhancements

### Planned Features
1. User authentication and accounts
2. Admin dashboard for managing experiences and bookings
3. Email notifications for bookings
4. Payment integration
5. Advanced search and filtering
6. User reviews and ratings

### Technical Improvements
1. Implement TypeScript interfaces for all API responses
2. Add comprehensive error logging
3. Implement rate limiting for API endpoints
4. Add automated testing suite
5. Implement CI/CD pipeline
6. Add performance monitoring