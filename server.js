// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/identify', (req, res) => {
  console.log(req.body);
  res.send({ message: 'Received!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.post('/identify', (req, res) => {
    console.log("POST /identify called");
    console.log(req.body);
    res.send({ message: 'Received!' });
  });
  