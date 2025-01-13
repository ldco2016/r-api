const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.post('/api/connect-redis', async (req, res) => {
  try {
    const { host, port, username, password, connectionUrl } = req.body;

    // Validate input (ensure all required fields are provided)
    if (!host || !port || !username || !password || !connectionUrl) {
      return res
        .status(400)
        .json({ error: 'All connection parameters must be provided.' });
    }

    // Configure Redis client
    const redis = new Redis({
      host,
      port: Number(port),
      username,
      password,
      lazyConnect: true,
    });

    // Test the connection
    await redis.connect();
    await redis.ping();
    await redis.quit();

    res
      .status(200)
      .json({ message: 'Successfully connected to the Redis database!' });
  } catch (error) {
    console.error('Error connecting to Redis:', error.message);
    res.status(500).json({
      error: 'Failed to connect to Redis. Please check your credentials',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening');
});
