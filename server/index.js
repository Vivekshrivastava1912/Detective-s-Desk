const express = require('express');
const app = express();
const PORT = 8000;

// Ek test route
app.get('/', (req, res) => {
  res.send('Hello! Mera backend server start ho gaya hai!');
});
 
app.listen(PORT, () => {
  console.log(`Server is running :- ${PORT}`);
});