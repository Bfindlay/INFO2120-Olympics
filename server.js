const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');
const app = express();
const path= require('path');
const PORT = process.env.PORT || 3000;
const DEV = true;



const API = require('./API');
app.use('/build', express.static(path.join(__dirname, '/dist/build')));
app.use('/public', express.static(path.join(__dirname, '/src/public/')));
app.use('/api', API);

app.listen(PORT, () => {
  console.log('express server running on', PORT);
});

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });
