var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    q = url.parse(req.url, true).query;

    res.write(q.year + " " q.month);
    res.end();
}).listen(process.env.PORT || 8080);

