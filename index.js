require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const worksRoutes = require('./routes/worksRoutes');

dotenv.config();
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://moonowlll.github.io',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/works', worksRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend server running on http://localhost:${PORT}`));
