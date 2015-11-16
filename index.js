"use strict";

var express = require('express');
var shortid = require('shortid');
var bodyParser = require('body-parser');
var redis = require('redis');
var sanitizer = require('sanitizer');
var app = express();
var base_url = 'http://localhost';
var port = process.env.PORT || 5000;
var client = redis.createClient();

app.set(`${base_url}:${port}`);
app.use(bodyParser.json());

app.post('/', (req, res) => {
	let url = sanitizer.sanitize(req.body.url);
	let id = shortid.generate();
	client.set(id, url, () => {
		res.json({id: id, url: `${base_url}/${id}`});
	});
});

app.route('/:id').all((req, res) => {
	let id = sanitizer.sanitize(req.params.id).trim();

	client.get(id, (err, reply) => {
		if (!err && reply) {
			res.set('Location', reply).status(301).send();
		} else {
			res.status(404).send();
		}
	});
});

app.listen(port);
console.log(`Server running at ${base_url}:${port}`);
