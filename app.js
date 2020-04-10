const express = require('express'),
bodyParser = require('body-parser'),
request = require('request'),
app = express()

const apiKey = '19ca2f980f1a2e5b6d880907194222c2';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error! You fucked up.'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error! You fucked up.'});
      } else {
        let weatherText = `Currently in ${weather.name} : ${weather.main.temp} Deg FH!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000,function(){
	console.log("Server started.");
})