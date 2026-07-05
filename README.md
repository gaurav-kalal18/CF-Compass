# 🧭 CF Compass

> A full-stack Codeforces analytics dashboard that transforms raw contest history into actionable insights.

CF Compass helps competitive programmers understand their strengths, identify weak topics, track rating growth, and receive personalized practice recommendations based on their Codeforces history.

## 🌐 Live Demo

**Frontend:** https://cf-compass-flame.vercel.app

**Backend API:** https://cf-compass-2bxb.onrender.com/api

---

## ✨ Features

- 📈 Rating history visualization
- 🎯 Topic-wise strengths and weaknesses
- 🧠 Competitive Programming Health Score (CP Health Score)
- 📚 Personalized practice recommendations
- 📊 Difficulty distribution analysis
- 🏆 Contest history with rating changes
- 📉 Success rate analytics
- ⚡ Real-time Codeforces API integration
- 🌙 Clean responsive dark UI

---

## 📸 Screenshots

### Overview Dashboard

![Overview](screenshots/overview.png)

---

### Topic Insights

![Insights](screenshots/insights.png)

---

### Practice Recommendations

![Practice](screenshots/practice.png)

---

### Contest History

![Contests](screenshots/contests.png)

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- Axios

### APIs

- Codeforces API

### Deployment

- Vercel (Frontend)
- Render (Backend)

### Version Control

- Git
- GitHub

## 🏗️ Project Architecture

```
CF-Compass
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── context/        # Global state management
│   │   ├── services/       # API communication
│   │   ├── styles/         # CSS files
│   │   └── utils/          # Helper functions
│   │
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   └── analytics/
│   └── server.js
│
└── README.md
```

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/gaurav-kalal18/CF-Compass.git
cd CF-Compass
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

### Backend

```bash
cd server
npm install
npm start
```

Runs on:

```
http://localhost:5000
```

## ⚙️ How It Works

1. User enters a Codeforces handle.
2. The React frontend sends requests to the Express backend.
3. The backend fetches contest and submission data from the Codeforces API.
4. Analytics modules process the raw data to compute:
   - CP Health Score
   - Topic strengths
   - Weakness analysis
   - Practice recommendations
   - Difficulty distribution
5. Processed results are returned to the frontend.
6. Interactive dashboards visualize the analytics.

## 🚀 Future Improvements

- Compare two Codeforces handles
- AI-powered practice recommendations
- Contest performance prediction
- Export analytics as PDF
- Shareable profile links
- User authentication
- Performance caching

## 👨‍💻 Author

**Gaurav Kalal**

- GitHub: https://github.com/gaurav-kalal18
- LinkedIn: (https://www.linkedin.com/in/gaurav-kalal-86a117338/)

