# Development Guide

## Getting Started

This guide will help you set up and contribute to the Highway Delite project.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- npm 9.x or later
- MongoDB (local instance or cloud)
- Git

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd EcoHarbor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/bookit
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production, use your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/bookit
```

### 4. Database Seeding
Seed the database with initial data:
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

Understanding the project structure is crucial for effective development:

```
.
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes (backend)
│   ├── details/[id]/      # Dynamic route for experience details
│   ├── checkout/          # Checkout page
│   ├── confirmation/      # Booking confirmation page
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utilities and data
│   ├── models/            # MongoDB models
│   ├── db.ts              # Database connection
│   └── data.ts            # Static data (fallback)
├── docs/                  # Documentation
├── public/                # Static assets
├── scripts/               # Utility scripts
└── tests/                 # Test files (to be created)
```

## Development Workflow

### Creating New Features

1. **Branch Creation**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development**
   - Follow the existing code style and patterns
   - Write TypeScript interfaces for new data structures
   - Implement proper error handling
   - Add animations where appropriate using Framer Motion

3. **Testing**
   - Test your changes locally
   - Ensure responsive design works on all screen sizes
   - Verify API endpoints return correct data

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Pull Request**
   - Create a pull request with a descriptive title
   - Include screenshots or GIFs for UI changes
   - Reference any related issues

### Code Style and Conventions

#### TypeScript
- Use TypeScript for all new components and utilities
- Define interfaces for props and state
- Use proper typing for API responses

```typescript
interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
  about: string;
  dates: DateSlot[];
}
```

#### Component Structure
- Use functional components with hooks
- Separate client and server components appropriately
- Add "use client" directive for client components using hooks or Framer Motion

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function MyComponent() {
  const [state, setState] = useState(initialValue);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Component content */}
    </motion.div>
  );
}
```

#### API Routes
- Implement proper error handling
- Validate input data
- Use appropriate HTTP status codes
- Return JSON responses

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Required field is missing' },
        { status: 400 }
      );
    }
    
    // Process request
    // ...
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Database Models

When creating new database models:

1. **Define the Schema**
   ```typescript
   const schema = new mongoose.Schema({
     field: { type: String, required: true }
   });
   ```

2. **Add Validation**
   - Use Mongoose validation
   - Add custom validation where necessary
   - Ensure proper indexing for frequently queried fields

3. **Export the Model**
   ```typescript
   export default mongoose.models.ModelName || mongoose.model('ModelName', schema);
   ```

### Animations

When adding animations:

1. **Use Framer Motion**
   - Import from "framer-motion"
   - Use motion components for animations
   - Implement proper spring physics for interactive elements

2. **Performance Considerations**
   - Animate only opacity and transform properties
   - Use layout animations sparingly
   - Test animations on lower-end devices

3. **Accessibility**
   - Respect user's reduced motion preferences
   - Provide non-animated fallbacks

### Responsive Design

1. **Mobile-First Approach**
   - Start with mobile styles
   - Use Tailwind's responsive prefixes (sm:, md:, lg:, xl:)

2. **Flexible Layouts**
   - Use CSS Grid and Flexbox
   - Implement proper spacing and sizing
   - Test on various screen sizes

3. **Touch Targets**
   - Ensure buttons and links are at least 44px
   - Provide adequate spacing between interactive elements

## Testing

### Unit Testing

Create tests for components and utility functions:
```typescript
// Example test structure
import { render, screen } from '@testing-library/react';
import ExperienceCard from '@/components/ExperienceCard';

describe('ExperienceCard', () => {
  it('renders experience title correctly', () => {
    const experience = {
      id: 'test',
      title: 'Test Experience',
      // ... other properties
    };
    
    render(<ExperienceCard experience={experience} />);
    
    expect(screen.getByText('Test Experience')).toBeInTheDocument();
  });
});
```

### Integration Testing

Test API endpoints:
```typescript
// Example API test
import { GET } from '@/app/api/experiences/route';

describe('GET /api/experiences', () => {
  it('returns all experiences', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
```

### End-to-End Testing

Use Cypress or Playwright for end-to-end tests:
```javascript
// Example E2E test
describe('Booking Flow', () => {
  it('completes a booking successfully', () => {
    cy.visit('/');
    cy.get('[data-testid="experience-card"]').first().click();
    // ... rest of test
  });
});
```

## Debugging

### Common Issues and Solutions

1. **Framer Motion in Server Components**
   - Error: "Attempted to call createMotionComponent() from the server"
   - Solution: Move Framer Motion components to client components with "use client" directive

2. **MongoDB Connection Issues**
   - Error: "MongoServerSelectionError"
   - Solution: Verify MONGODB_URI in .env file and ensure MongoDB is running

3. **Next.js 15 Params Handling**
   - Error: "params.id is undefined"
   - Solution: Use `use(params)` to unwrap Promise-based params in Next.js 15

4. **Port Already in Use**
   - Error: "listen EADDRINUSE"
   - Solution: Kill the process using the port or change the port in package.json

### Debugging Tools

1. **Browser Developer Tools**
   - Network tab for API requests
   - Console for JavaScript errors
   - React DevTools for component hierarchy

2. **MongoDB Compass**
   - Visual interface for database inspection
   - Query debugging

3. **VS Code Extensions**
   - ESLint for code linting
   - Prettier for code formatting
   - Tailwind CSS IntelliSense

## Performance Optimization

### Code Splitting
Next.js automatically code-splits pages and components. To optimize further:
- Use dynamic imports for large components
- Implement proper loading states

### Image Optimization
Use Next.js Image component:
```typescript
<Image
  src="/images/example.jpg"
  alt="Example"
  width={400}
  height={300}
  priority // For above-the-fold images
/>
```

### Caching Strategy
Implement appropriate caching:
```typescript
// For data that doesn't change frequently
const res = await fetch(url, { next: { revalidate: 3600 } });

// For data that changes frequently
const res = await fetch(url, { cache: 'no-store' });
```

## Deployment

### Environment Variables
Ensure all environment variables are set in the deployment environment:
- `MONGODB_URI`
- `NEXT_PUBLIC_API_URL`

### Build Process
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## Contributing

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

### Code Review Guidelines

Reviewers should check for:
- Code quality and readability
- Proper error handling
- Performance considerations
- Security implications
- Test coverage
- Documentation updates

### Reporting Issues

When reporting issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment information (browser, OS, etc.)

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Framer Motion Documentation](https://www.framer.com/docs/)

### Learning Resources
- [Next.js Learn Course](https://nextjs.org/learn)
- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [MongoDB University](https://university.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Browser debugging
- [VS Code](https://code.visualstudio.com/) - Code editor