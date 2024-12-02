const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const sportRoutes = require('./routes/sportRoutes');
const consoleRoutes = require('./routes/consoleRoutes');
const genreRoutes = require('./routes/genreRoutes');
const setRoutes = require('./routes/setRoutes');
const tcgRoutes = require('./routes/tcgRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);
// Use the sport route
app.use('/api/sports', sportRoutes);
// Use the console routes
app.use('/api/consoles', consoleRoutes)
// Use the genre routes
app.use('/api/genres', genreRoutes)
// Use the set routes
app.use('/api/sets', setRoutes)
// Use the tcg routes
app.use('/api/tcgs', tcgRoutes)
// Use the product routes
app.use('/api/products', productRoutes)

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
