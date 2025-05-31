const express = require('express');
const cors = require('cors');
const identify = require('./identify');

const app = express();
app.use(cors());
app.use(express.json());

// Add this GET / route to confirm the API is running
app.get('/', (req, res) => {
  res.send('API is running!');
});

// POST /identify
app.post('/identify', identify);

// Port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
