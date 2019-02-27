'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer');

// require and use "multer"...
var upload = multer({dest:'./uploaded/'});
var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res){
  const newFile = req.file;
 if (newFile) {
  const display = {
    filename: newFile.originalname,
    size: newFile.size,
    type: newFile.mimetype
  };
  res.json(display);
 } else {
   res.json('Please choose a file.');
 }
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
