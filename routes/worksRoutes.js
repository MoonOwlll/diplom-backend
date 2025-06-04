const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Получить все произведения
router.get('/', (req, res) => {
  db.query('SELECT id, title, author, year FROM works', (err, results) => {
    if (err) return res.status(500).json({ message: 'Ошибка при получении списка', error: err.message });
    res.json(results);
  });
});

// Получить конкретное произведение
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM works WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Ошибка при получении произведения', error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Произведение не найдено' });
    res.json(results[0]);
  });
});

module.exports = router;
