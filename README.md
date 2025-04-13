# Your Cozy Corner - A Modern Blog Platform

In this digital sanctuary, I share my thoughts and experiences, hoping to bring comfort and inspiration to those who need it. When life feels uncertain or overwhelming, remember that you've discovered a space where hope and reassurance await. Together, we'll explore life's journey, finding strength in shared stories and mutual understanding. This is more than just a blog – it's a companion for those moments when you need to be reminded that brighter days are ahead.

## Features

- Clean and minimal design inspired by modern blog platforms
- Fully responsive layout
- Dynamic blog post creation and management
- Image support for blog posts
- Easy navigation between posts
- Featured posts on homepage
- Structured blog content with sections
- Fast and optimized performance

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS for styling
- Montserrat font family

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose for database operations

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd your-cozy-corner
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the server directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

## Running the Application

1. Start the server:
```bash
cd server
node server.js
```

2. In a new terminal, start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Project Structure

```
your-cozy-corner/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── App.js
│       └── index.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

## API Endpoints

- `GET /api/v1/allblogs` - Get all blog posts
- `GET /api/v1/singleblog/:id` - Get a single blog post
- `POST /api/v1/blog` - Create a new blog post
- `PATCH /api/v1/blog/:id` - Update a blog post
- `DELETE /api/v1/blog/:id` - Delete a blog post

## Deployment

The application can be deployed to various platforms:

### Railway
1. Create a Railway account
2. Connect your GitHub repository
3. Set up environment variables
4. Deploy the application

### Render
1. Create a Render account
2. Connect your GitHub repository
3. Configure build settings
4. Set environment variables
5. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern blog platforms
- Montserrat font family
- React and Node.js communities 