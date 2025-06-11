const db = require('../models/db');

exports.submitResult = async (req, res) => {
  const { userId, score, total } = req.body;

  try {
    // Обновлённая вставка: значения через $1, $2, $3, дата автоматически (NOW())
    await db.query(
      'INSERT INTO quiz_results (user_id, score, total, date) VALUES ($1, $2, $3, NOW())',
      [userId, score, total]
    );
    res.json({ message: 'Результат сохранён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка записи', error: err.message });
  }
};

exports.getUserResults = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await db.query(
      'SELECT score, total, date FROM quiz_results WHERE user_id = $1 ORDER BY date DESC LIMIT 1',
      [userId]
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения результата', error: err.message });
  }
};

exports.getUserHistory = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await db.query(
      'SELECT score, total, date FROM quiz_results WHERE user_id = $1 ORDER BY date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении истории', error: err.message });
  }
};
