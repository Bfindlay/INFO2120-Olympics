const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Import API module
const API = require('./API');
app.use('/api', API);

// Add static dependencies to path
app.use('/build', express.static(path.join(__dirname, '/dist/build')));
app.use('/public', express.static(path.join(__dirname, '/src/public/')));


app.listen(PORT, () => {
  console.log(`----- SERVER RUNNING ON ${PORT} -----`);
});

// Default route for homepage 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});
