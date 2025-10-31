# Apex Auto Backend API

A comprehensive Node.js/Express backend API for the Apex Auto car customization platform with MongoDB integration, JWT authentication, and full CRUD operations.

## 🚀 Features

- **JWT Authentication** - Secure user registration, login, and protected routes
- **MongoDB Integration** - Mongoose ODM with proper schemas and relationships
- **Car Customization API** - Complete build management system
- **Service Management** - CRUD operations for car modification services
- **User Management** - Profile management and authentication
- **Input Validation** - Comprehensive request validation with express-validator
- **Error Handling** - Centralized error handling middleware
- **CORS Support** - Cross-origin resource sharing for frontend integration
- **Security Headers** - XSS protection, content type validation
- **Request Logging** - Comprehensive API request logging
- **Health Checks** - API health monitoring endpoints

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Copy the `.env` file and update the values as needed:
   ```bash
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/apex_auto
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=30d
   
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system.

5. **Run the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Health Check
```http
GET /health
```

### API Documentation
```http
GET /api/docs
```

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <your_jwt_token>
```

## 🛠️ Service Endpoints

### Get All Services
```http
GET /api/services?category=engine&minPrice=100&maxPrice=5000&search=turbo&page=1&limit=20
```

### Get Service by ID
```http
GET /api/services/:id
```

### Create Service (Admin)
```http
POST /api/services
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Turbo Upgrade Kit",
  "description": "High-performance turbo system",
  "category": "engine",
  "price": 2500,
  "brand": "Apex Performance",
  "partNumber": "APX-TURBO-001",
  "specifications": {
    "power": "400hp",
    "torque": "450lb-ft"
  }
}
```

## 🏗️ Build Endpoints

### Create Build
```http
POST /api/builds
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "buildName": "My Dream Car",
  "carModel": {
    "brand": "BMW",
    "model": "M3",
    "year": 2023
  },
  "color": {
    "primary": "#FF0000",
    "secondary": "#000000",
    "accent": "#FFFFFF"
  },
  "selectedParts": [
    {
      "partId": "service_id_here",
      "quantity": 1,
      "customization": {
        "color": "#FF0000",
        "material": "carbon fiber"
      }
    }
  ],
  "description": "My custom build description",
  "isPublic": true
}
```

### Get User's Builds
```http
GET /api/builds/:userId?page=1&limit=10&status=completed&search=BMW
```

### Get Public Builds
```http
GET /api/builds?page=1&limit=10&search=BMW&brand=BMW&model=M3
```

### Update Build
```http
PUT /api/builds/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "buildName": "Updated Build Name",
  "description": "Updated description"
}
```

### Delete Build
```http
DELETE /api/builds/:id
Authorization: Bearer <your_jwt_token>
```

### Like/Unlike Build
```http
POST /api/builds/:id/like
Authorization: Bearer <your_jwt_token>
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalResults": 50,
    "limit": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

## 🗃️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'user'),
  isEmailVerified: Boolean (default: false),
  profile: {
    bio: String,
    location: String,
    website: String,
    avatar: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Service Model
```javascript
{
  name: String (required),
  description: String (required),
  category: String (required),
  price: Number (required),
  brand: String,
  partNumber: String,
  specifications: Object,
  images: [String],
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Build Model
```javascript
{
  user: ObjectId (ref: 'User'),
  buildName: String (required),
  carModel: {
    brand: String (required),
    model: String (required),
    year: Number (required)
  },
  color: {
    primary: String (required),
    secondary: String,
    accent: String
  },
  selectedParts: [{
    partId: ObjectId (ref: 'Service'),
    quantity: Number,
    customization: Object
  }],
  description: String,
  totalCost: Number,
  isPublic: Boolean (default: false),
  status: String (default: 'draft'),
  likes: [ObjectId (ref: 'User')],
  views: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds
- **Input Validation**: Express-validator for request validation
- **CORS Protection**: Configured for specific origins
- **Security Headers**: XSS protection, content type validation
- **Rate Limiting**: Protection against brute force attacks
- **Error Sanitization**: Secure error responses

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── middleware/
│   ├── auth.js              # JWT authentication
│   └── error.js             # Error handling
├── models/
│   ├── User.js              # User schema
│   ├── Service.js           # Service schema
│   └── Build.js             # Build schema
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── services.js          # Service routes
│   └── builds.js            # Build routes
├── .env                     # Environment variables
├── package.json             # Dependencies
├── server.js                # Main server file
└── README.md                # This file
```

## 🚀 Deployment

### Environment Variables for Production
```bash
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_super_secure_jwt_secret
FRONTEND_URL=https://your-frontend-domain.com
```

### PM2 Deployment
```bash
npm install -g pm2
pm2 start server.js --name "apex-auto-api"
pm2 startup
pm2 save
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@apexauto.com or create an issue in the repository.

---

**Happy coding! 🚗💨**