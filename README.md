# FloatChat — AI-Powered Ocean Data Discovery & Visualization Platform

> An advanced environmental intelligence and oceanographic exploration platform powered by real-world ARGO observation floats and conversational AI.

![FloatChat Preview](https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80)

---

## 🌊 Overview

**FloatChat** transforms complex oceanographic datasets into actionable scientific insights for researchers, students, coastal communities, and climate policymakers.

By integrating the international **ARGO array of over 3,900 autonomous profiling floats**, FloatChat provides:
- Seamless natural language queries over salinity, temperature, pressure, and dissolved oxygen
- Real-time thermohaline depth profiles (0 to 2,000 meters)
- Spatial trajectory maps and anomaly tracking for marine heatwaves and hypoxia risks
- Secured user authentication and research workspace persistence using Node.js, Express, and MongoDB

---

## 🚀 Key Modules & Capabilities

1. **AI Ocean Assistant**: Natural language querying of global ocean parameters, seasonal thermoclines, and water column metrics.
2. **Interactive ARGO Explorer**: Geographic GIS tracking of autonomous floats with trajectory timelines and CTD profiles.
3. **Ocean Time Machine**: Multi-year temporal comparative modeling of ocean warming and salinity changes.
4. **Oxygen Depletion Analysis**: Real-time identification of low-oxygen zones (hypoxia) and marine ecosystem vulnerability.
5. **Ocean–Monsoon Analyzer**: Exploration of sea surface temperature (SST) teleconnections, the Indian Ocean Dipole (IOD), and monsoon rainfall.
6. **Ocean Anomaly Detection**: Statistical anomaly detection for marine heatwaves and localized extreme events.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (v19) with Vite
- **Styling**: Tailwind CSS (v4) with custom deep ocean theme & glassmorphism
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **Motion**: Framer Motion
- **HTTP Client**: Axios with configured JWT bearer interceptor
- **Typography**: Google Fonts (Inter & Outfit)

### Backend
- **Runtime**: Node.js & Express.js (ES Modules)
- **Database**: MongoDB Atlas with Mongoose ORM
- **Security & Auth**: JWT (JSON Web Tokens), bcryptjs password hashing
- **Environment**: dotenv configuration

---

## 📂 Project Architecture

```
capstoneaqua/
├── index.html                 # App shell with Inter/Outfit typography & meta tags
├── package.json               # Root dependencies and scripts
├── vite.config.js             # Vite + Tailwind CSS configuration
├── .env                       # Frontend environment configuration (VITE_API_URL)
│
├── src/
│   ├── assets/                # Visual assets and icons
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Transparent-to-solid scroll navbar with mobile drawer
│   │   ├── Footer.jsx         # Comprehensive footer with official data source attributions
│   │   ├── Hero.jsx           # Full-width atmospheric hero with real-time ARGO telemetry
│   │   ├── FeatureCard.jsx    # Glassmorphic feature cards with interactive hover effects
│   │   └── ProtectedRoute.jsx # Authentication route guard
│   ├── context/
│   │   ├── AuthContext.jsx    # Authentication state management (JWT, user, sessions)
│   │   └── ToastContext.jsx   # Non-intrusive floating alert system
│   ├── pages/
│   │   ├── Home.jsx           # Full scientific landing page
│   │   ├── Login.jsx          # Split-screen oceanographic login portal
│   │   ├── Signup.jsx         # Researcher registration with password strength meter
│   │   └── Dashboard.jsx      # Authenticated ocean intelligence workspace
│   ├── services/
│   │   ├── api.js             # Axios instance with request/response interceptors
│   │   └── authService.js     # Auth API client (register, login, me, logout)
│   ├── App.jsx                # Main application routing and providers
│   ├── index.css              # Custom ocean color palette, glassmorphism, scrollbars
│   └── main.jsx               # React DOM entry point
│
└── server/
    ├── config/
    │   └── db.js              # Mongoose MongoDB Atlas connection
    ├── controllers/
    │   └── authController.js  # Registration, login, and user profile handlers
    ├── middleware/
    │   └── authMiddleware.js  # JWT verification middleware
    ├── models/
    │   └── User.js            # User schema with bcrypt pre-save hashing & validation
    ├── routes/
    │   └── authRoutes.js      # Express auth route definitions
    ├── .env                   # Server environment credentials (PORT, MONGODB_URI, JWT_SECRET)
    ├── package.json           # Backend package configuration
    └── server.js              # Express server setup and endpoint mounting
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas cluster URI

### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables
Ensure the `.env` files are configured:

**Root `.env` (Frontend):**
```env
VITE_API_URL=http://localhost:5000/api
```

**`server/.env` (Backend):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/floatchat?retryWrites=true&w=majority
DB_NAME=floatchat
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

### 3. Run the Backend Server
```bash
# From project root
npm run server

# Or directly in server folder
cd server
npm start
```

### 4. Run the Frontend Development Server
```bash
# In a new terminal tab
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛡️ Scientific Data Citations

FloatChat references data conforming to standard international formats from:
- **ARGO**: International Argo Project (Global float array data)
- **NOAA**: National Oceanic and Atmospheric Administration
- **OBIS**: Ocean Biodiversity Information System
- **NASA**: Earth Observing System Data and Information System (EOSDIS)
- **INCOIS**: Indian National Centre for Ocean Information Services
