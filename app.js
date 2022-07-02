const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('*', (req, res) => 
{
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, () => 
{
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});