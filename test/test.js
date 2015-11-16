"use strict";

var expect = require('chai').expect;
var request = require('request');
var server = require('../index');
var redis = require('redis');
var client = redis.createClient();
var base_url = 'http://localhost:5000';

describe('server', () => {
	after((done) => {
		client.flushdb();
		done();
	});

	describe('API: ', () => {

		it('POST / should return a shortened URL', (done) => {
			request.post({url: base_url}, (err, res, body) => {
				let parsedBody = JSON.parse(body);
				expect(res.statusCode).to.equal(200);
				expect(parsedBody.id).to.exist;
				expect(parsedBody.url).to.exist;
				done();
			});
		});

		it('GET /:id should redirect a user', (done) => {
			client.set('someUrl', 'http://github.com', () => {
				request.get({url: `${base_url}/someUrl`, followRedirect: false},
					(err, res, body) => {
					expect(res.headers.location).to.equal('http://github.com');
					expect(res.statusCode).to.equal(301);
					done();
				});
			});
		});

		it('GET /:id to non-existent id should return 404', (done) => {
			request.get({url: `${base_url}/nonExistentId`, followRedirect: false},
				(err, res, body) => {
				expect(res.statusCode).to.equal(404);
				done();
			})
		});

	});

});
