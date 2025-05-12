require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const itemRoutes = require('./routes/item.routes');
const { errorHandler } = require('./middleware/errorHandler');

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
