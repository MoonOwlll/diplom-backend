const db = require('../models/db');

exports.submitResult = (req, res) => {
  const { userId, score, total } = req.body;

  db.query(
    'INSERT INTO quiz_results (user_id, score, total) VALUES (?, ?, ?)',
    [userId, score, total],
    (err) => {
      if (err) return res.status(500).json({ message: 'Ошибка записи', error: err.message });
      res.json({ message: 'Результат сохранён' });
    }
  );
};

exports.getUserResults = (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT score, total, date FROM quiz_results WHERE user_id = ? ORDER BY date DESC LIMIT 1';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Ошибка получения результата', error: err.message });
    res.json(results[0] || null);
  });
};

exports.getUserHistory = (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT score, total, date FROM quiz_results WHERE user_id = ? ORDER BY date DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Ошибка при получении истории', error: err.message });
    res.json(results);
  });
};

