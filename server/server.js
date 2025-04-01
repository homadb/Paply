const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const resumeRoutes = require("./routes/resume");
app.use("/api/resume", resumeRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
