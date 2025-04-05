# Notice Board Application

A full-stack notice board application where teachers and admins can post notices, and students can view them. Built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (Login/Register)
- Role-based access control (Student, Teacher, Admin)
- Notice creation and management
- Real-time updates
- Responsive design with Tailwind CSS
- JWT-based authentication
- MongoDB database

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd notice-board
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

4. Create a `.env` file in the server directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notice-board
JWT_SECRET=your_jwt_secret_key_here
```

5. Start the server:

```bash
cd ../server
npm run dev
```

6. Start the client (in a new terminal):

```bash
cd ../client
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## User Roles

### Student

- Can view all notices
- Cannot create, edit, or delete notices

### Teacher

- Can view all notices
- Can create new notices
- Can delete their own notices
- Cannot edit notices

### Admin

- Can view all notices
- Can create new notices
- Can edit any notice
- Can delete any notice

## Technologies Used

- Frontend:

  - React
  - React Router
  - Axios
  - Tailwind CSS
  - React Toastify

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT
  - bcryptjs

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
