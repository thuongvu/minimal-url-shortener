# Minimal url shortener

### Installation
Install [redis](http://redis.io/download).
Run `redis-server`.
[Clone this repo](git@github.com:thuongvu/minimal-url-shortener.git).
Run `npm install`.
Run `node index.js`.

### Usage

Using curl in a terminal:

POSTing a url to receive a shortened url

#### Input:
```
curl -X POST -H "Content-Type: application/json" -d '{"url": "http://github.com"}' http://localhost:5000
```

####Output:
```
{"id":"E1zT2UMXl", url: "http://localhost/E1zT2UMXl"}
```

GET /:id redirects the user to the specified url

#### Input:
```
curl -Ls -o /dev/null -w %{url_effective} http://localhost:5000/NyMomLf7g
```

#### Output
```
http://github.com
```

### Tests
```
npm test
```

### License
MIT

