const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const express = require('express');
const app = express();
const path= require('path');
const PORT = process.env.PORT || 3000;
const DEV = true;
const API = require('./API');

/* For Development */
if(DEV){

  app.use('/build', express.static(path.join(__dirname, '/dist/')));
  app.use(express.static(__dirname + '/dist'));
  app.use('/public', express.static(path.join(__dirname, '/src/public/')));
  app.use('/api', API);

  app.listen(PORT +1 , () => {
    console.log('Api server running on', PORT);
  });

  app.get('/api', (req, res) => {
    res.send('Hello Api')
  })
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      proxy: {
        '/api*': {
          target: 'http://localhost:3001'
        }
      }
      
    })
    .listen(PORT, '0.0.0.0', function (err, result) {
      if (err) {
        console.log(err);
      }

      console.log('Running at http://0.0.0.0:3000');
    });

}else{
  app.use('/build', express.static('dist'))
  app.use(express.static(__dirname + '/dist'));
  app.use('/public', express.static('public'))

  app.listen(PORT, () => {
    console.log('express server running on', PORT);
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

}