const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB connection error:', err));

const cvSchema = new mongoose.Schema({ content: String });
const CV = mongoose.model('CV', cvSchema);

app.post('/save-cv', async (req, res) => {
  const newCV = new CV({ content: req.body.content });
  await newCV.save();
  res.send('CV saved');
});

app.listen(3000, () => console.log('Server running on port 3000'));