const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const client_id = 'KXN5VLJL5L1LB5R224SN1RCPZT53UMZ2ZM5OFDTVSD0BWBWE';
const client_secret = '1I4IGZ5MWNITR2QJNSATOKRAIPERMGMXPLHR5RVJEWB2E4IP';

router.route('/get-api').get(function(req, res) {
	request({
    	url: 'https://api.foursquare.com/v2/venues/explore',
	    method: 'GET',
	    qs: {
	      client_id: client_id,
	      client_secret: client_secret,
	      ll: '40.7243,-74.0018',
	      query: 'coffee',
	      v: '20180323',
	      limit: 1,
	    },
  	},
  	function(err, res, body) {
		if (err) {
      		console.error(err);
    	} 
    	else {
      		console.log(body);
    	}
  	});
});

router.route('/auth').get(function(req, res) {
	request.get({
    	url: 'https://foursquare.com/oauth2/authenticate?client_id='+client_id+'&response_type=200&redirect_uri=http://localhost:3000/auth/callback',
	    method: 'GET',
  	},
  	function(err, res, body) {
		console.log(res);
  	});
});

router.route('/auth/callback').get(function(req, res) {
	res.end("hi");
});

module.exports = router;