# NoteNexus

**Where Ideas Connect**

NoteNexus is a full-stack application designed to manage and organize notes efficiently. This project showcases the use of React for the frontend and Node.js with Express and MongoDB for the backend.

## Getting Started

- [Client-Side Documentation](./client/README.md)
- [Server-Side Documentation](./server/README.md)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure registration and login.
- **CRUD Operations:** Create, Read, Update, and Delete notes.
- **Responsive Design:** Mobile-friendly UI with React.
- **Real-time Updates:** Seamless updates with backend integration.

## Technologies Used

- **Frontend:**
  - React
  - Redux Toolkit
  - React Router DOM
  - Axios
- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Bcrypt.js
  - JWT (JSON Web Token)

## Folder Structure

NoteNexus/
├── client/                        # React frontend
│   ├── public/                    # Public assets
│   ├── src/                       # React source files
│   │   ├── components/            # Reusable components
│   │   ├── features/              # Redux slices
│   │   ├── pages/                 # Page components
│   │   ├── App.js                 # Main React component
│   │   └── index.js               # Entry point for React
│   ├── .env                       # Environment variables for frontend
│   ├── package.json               # React dependencies
│   ├── package-lock.json          # React dependencies lock file
│   └── README.md                  # Client-side documentation

├── server/                        # Node.js backend
│   ├── controllers/               # Route handlers
│   ├── models/                    # Mongoose models
│   ├── routes/                    # API routes
│   ├── middleware/                # Authentication middleware
│   ├── config/                    # Configuration files
│   ├── .env                       # Environment variables for backend
│   ├── index.js                   # Entry point for server
│   ├── package.json               # Node.js dependencies
│   ├── package-lock.json          # Node.js dependencies lock file
│   └── README.md                  # Server-side documentation

├── .gitignore                     # Git ignore rules
├── README.md                      # Project documentation
├── package-lock.json              # Node.js dependencies lock file
└── package.json                   # Project metadata


## Setup Instructions

### Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the server directory and add your environment variables:
   ```bash
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the client directory and add your environment variables:
   ```bash
   REACT_APP_API_URL=<Your Backend API URL>
   ```
4. Start the frontend server:
   `bash
npm start
`

## API Endpoints

- **POST /api/auth/register**
  - Description: Register a new user.
- **POST /api/auth/login**
  - Description: Authenticate user and get a token.
- **GET /api/notes**
  - Description: Retrieve all notes for the authenticated user.
- **POST /api/notes**
  - Description: Create a new note.
- **PUT /api/notes/:id**
  - Description: Update an existing note.
- **DELETE /api/notes/:id**
  - Description: Delete a note.

## Contributing

We welcome contributions to improve NoteNexus! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
