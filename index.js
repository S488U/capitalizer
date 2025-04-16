import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3500;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve main page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle text capitalization
app.post('/submit', (req, res) => {
  const { stringData } = req.body;

  if (!stringData?.trim()) {
    return res.status(400).json({ data: 'Type something ...' });
  }

  const capitalize = (text) =>
    text
      .split(' ')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');

  const result = capitalize(stringData);

  return res.status(200).json({ data: result });
});

// Custom About page route
app.get('/about', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Handle unknown routes with custom error page
app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Start server
app.listen(port, () => {
  console.log(`⚡ Server running at http://localhost:${port}`);
});
