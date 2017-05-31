var express = require('express');
var router = express.Router();

// we npm installed request...its in the node_modules folder
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	var students = ['Guido', 'Porscha', 'Hayes', 'Nick','Daniel'];
  	res.render('index', { 
  	title: 'Express',
  	studentsArray:students 
  });
});

router.get('/test', function(req,res,next){
	res.send('<h1>Router Check</h1>');
});

// make a route for /weather. Specifically, a get route.
// If someone makes an HTTP get request to the route below(first arg)
// then run the anon function. The anon function has 2 objects automatically, 
// request,and response.
router.get('/weather', (req,res)=>{
	// set up a var to the api key
	var apikey = 'e312dbeb8840e51f92334498a261ca1d';
	// build the url we are going to request
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=Atlanta&units=imperial&APPID="+apikey;
    // make an http get request to the weather url.
    // because this is an async tasks, we provide a function to run, when JS
    // gets back. It has 3 objects, error, response, and data. 
    // Error will be null if there is no error.
    // response holds the status code and any ohter HTTP stuff.
    // Data holds the JSON, if any.
    request.get(weatherUrl,(error,response,data)=>{
    	console.log(typeof(data));
    	// The JSON comes back in string format. Convert to native JSON
    	var weatherData = JSON.parse(data);
    	// call res.render. Takes 2 args:
    	// 1. the ejs file to fetch
    	// 2.an object that will be passed to the ejs file. Each property 
    	// will be available as a var inside of the
    	res.render('weather',{weatherObject:weatherData});
    	res.send("Check console.");
    });
});

module.exports = router;
