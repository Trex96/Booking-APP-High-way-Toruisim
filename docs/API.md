# API Documentation

## Overview

The Highway Delite API provides endpoints for managing travel experiences, bookings, and promo codes. All endpoints are implemented as Next.js API routes and follow REST conventions.

## Base URL

```
http://localhost:3000/api
```

In production, this will be your deployed application URL.

## Authentication

Currently, the API does not require authentication. For production use, authentication should be implemented.

## Rate Limiting

The API does not currently implement rate limiting. For production use, rate limiting should be implemented to prevent abuse.

## Error Handling

All API endpoints return appropriate HTTP status codes and JSON error messages:

```json
{
  "error": "Error message describing the issue"
}
```

Common HTTP status codes:
- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error

## Endpoints

### Experiences

#### Get All Experiences

```
GET /api/experiences
```

**Response:**
```json
[
  {
    "id": "kayaking-udupi",
    "title": "Kayaking",
    "location": "Udupi",
    "price": 999,
    "image": "/images/kayaking-1.jpg",
    "description": "Curated small-group experience. Certified guide. Safety first with gear included.",
    "about": "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
    "dates": [
      {
        "date": "Oct 22",
        "available": 4,
        "times": [
          {
            "time": "07:00 am",
            "available": 4
          },
          {
            "time": "9:00 am",
            "available": 2
          }
        ]
      }
    ]
  }
]
```

#### Get Experience by ID

```
GET /api/experiences/{id}
```

**Parameters:**
- `id` (path) - The unique identifier of the experience

**Response:**
```json
{
  "id": "kayaking-udupi",
  "title": "Kayaking",
  "location": "Udupi",
  "price": 999,
  "image": "/images/kayaking-1.jpg",
  "description": "Curated small-group experience. Certified guide. Safety first with gear included.",
  "about": "Scenic routes, trained guides, and safety briefing. Minimum age 10.",
  "dates": [...]
}
```

**Error Responses:**
- `404` - Experience not found

### Bookings

#### Create Booking

```
POST /api/bookings
```

**Request Body:**
```json
{
  "experienceId": "kayaking-udupi",
  "experienceTitle": "Kayaking",
  "date": "Oct 22",
  "time": "07:00 am",
  "quantity": 2,
  "fullName": "John Doe",
  "email": "john@example.com",
  "subtotal": 1998,
  "taxes": 118,
  "total": 2116,
  "promoCode": "SAVE10"
}
```

**Response:**
```json
{
  "success": true,
  "refId": "HUFABC123SO",
  "booking": {
    "experienceId": "kayaking-udupi",
    "experienceTitle": "Kayaking",
    "date": "Oct 22",
    "time": "07:00 am",
    "quantity": 2,
    "fullName": "John Doe",
    "email": "john@example.com",
    "subtotal": 1998,
    "taxes": 118,
    "total": 2116,
    "promoCode": "SAVE10",
    "refId": "HUFABC123SO",
    "_id": "507f1f77bcf86cd799439011",
    "createdAt": "2023-10-15T10:30:00.000Z",
    "updatedAt": "2023-10-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Invalid input data
- `500` - Failed to create booking

#### Get All Bookings

```
GET /api/bookings
```

**Response:**
```json
[
  {
    "experienceId": "kayaking-udupi",
    "experienceTitle": "Kayaking",
    "date": "Oct 22",
    "time": "07:00 am",
    "quantity": 2,
    "fullName": "John Doe",
    "email": "john@example.com",
    "subtotal": 1998,
    "taxes": 118,
    "total": 2116,
    "promoCode": "SAVE10",
    "refId": "HUFABC123SO",
    "_id": "507f1f77bcf86cd799439011",
    "createdAt": "2023-10-15T10:30:00.000Z",
    "updatedAt": "2023-10-15T10:30:00.000Z"
  }
]
```

### Promo Codes

#### Validate Promo Code

```
POST /api/promo
```

**Request Body:**
```json
{
  "code": "SAVE10"
}
```

**Response (Valid Code):**
```json
{
  "success": true,
  "discountType": "percentage",
  "discountValue": 10
}
```

**Response (Invalid Code):**
```json
{
  "error": "Invalid promo code"
}
```

**Error Responses:**
- `400` - Promo code is required
- `404` - Invalid promo code
- `400` - Promo code has expired
- `400` - Promo code has reached its maximum uses
- `500` - Failed to validate promo code

## Data Models

### Experience

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | String | Yes | Unique identifier |
| title | String | Yes | Experience title |
| location | String | Yes | Location of the experience |
| price | Number | Yes | Price in INR |
| image | String | Yes | Image URL |
| description | String | Yes | Short description |
| about | String | Yes | Detailed description |
| dates | Array | Yes | Available dates and times |

### DateSlot

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| date | String | Yes | Date in readable format |
| available | Number | Yes | Number of available slots |
| times | Array | Yes | Available time slots |

### TimeSlot

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| time | String | Yes | Time in readable format |
| available | Number | Yes | Number of available slots |
| soldOut | Boolean | No | Whether the slot is sold out |

### Booking

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| experienceId | String | Yes | ID of the booked experience |
| experienceTitle | String | Yes | Title of the booked experience |
| date | String | Yes | Booking date |
| time | String | Yes | Booking time |
| quantity | Number | Yes | Number of people |
| fullName | String | Yes | Booker's full name |
| email | String | Yes | Booker's email |
| subtotal | Number | Yes | Subtotal amount |
| taxes | Number | Yes | Tax amount |
| total | Number | Yes | Total amount |
| promoCode | String | No | Applied promo code |
| refId | String | Yes | Unique booking reference ID |

### PromoCode

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| code | String | Yes | Promo code |
| discountType | String | Yes | 'percentage' or 'fixed' |
| discountValue | Number | Yes | Discount amount or percentage |
| maxUses | Number | No | Maximum number of uses (null for unlimited) |
| usedCount | Number | Yes | Number of times used |
| expirationDate | Date | No | Expiration date (null for no expiration) |
| isActive | Boolean | Yes | Whether the code is active |

## Example Usage

### Fetching Experiences
```javascript
// Fetch all experiences
const response = await fetch('/api/experiences');
const experiences = await response.json();

// Fetch a specific experience
const response = await fetch('/api/experiences/kayaking-udupi');
const experience = await response.json();
```

### Creating a Booking
```javascript
const bookingData = {
  experienceId: "kayaking-udupi",
  experienceTitle: "Kayaking",
  date: "Oct 22",
  time: "07:00 am",
  quantity: 2,
  fullName: "John Doe",
  email: "john@example.com",
  subtotal: 1998,
  taxes: 118,
  total: 2116
};

const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookingData)
});

const result = await response.json();
```

### Validating a Promo Code
```javascript
const promoData = {
  code: "SAVE10"
};

const response = await fetch('/api/promo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(promoData)
});

const result = await response.json();
```