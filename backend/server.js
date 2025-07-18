const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/leaderboard', (req, res) => {
  res.json([
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 88 },
    { name: 'Charlie', score: 78 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});