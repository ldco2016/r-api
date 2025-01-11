const express = require('express');
const cors = require('cors');

const app = express();
let redisClient = null;

app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening');
});
