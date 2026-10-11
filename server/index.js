const express = require('express');
const cors = require('cors');
const { DatabaseSync } = require('node:sqlite');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const db = new DatabaseSync('derma.db');
db.exec(`CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  concern TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);

const ADMIN_KEY = process.env.ADMIN_KEY || 'change-me';
function requireAdmin(req, res, next) {
  if (req.header('x-admin-key') !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Public: patient submits a request
app.post('/api/appointments', (req, res) => {
  const { name, email, phone, concern, preferredDate } = req.body;
  if (!name || !email || !phone || !concern || !preferredDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const result = db.prepare(
    'INSERT INTO appointments (name, email, phone, concern, preferred_date) VALUES (?, ?, ?, ?, ?)'
  ).run(name, email, phone, concern, preferredDate);
  res.status(201).json({ id: result.lastInsertRowid });
});

// Admin: list requests
app.get('/api/appointments', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM appointments ORDER BY created_at DESC').all());
});

// Admin: update status
app.patch('/api/appointments/:id', requireAdmin, (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ ok: true });
});

const path = require('path');
const dist = path.join(__dirname, '..', 'client', 'dist', 'client', 'browser');
app.use(express.static(dist));
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
  res.sendFile(path.join(dist, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));