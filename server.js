var express = require('express');
var httpProxy = require('http-proxy');
var https = require('https');
var fs = require('fs');

var matterhornProxyURL = 'https://matterhorn.dce.harvard.edu/';
var mostRecentWatchReqUrl;

var app = express();

var proxy = httpProxy.createProxyServer({
  secure: false
});

// Serve /engage/player/* requests from the local build folder.
app.use('/engage/player', express.static('build'));

// Handle login.html requests with a redirect.
app.get('/login.html', handleLogin);

// Handle everything else with the proxy back to the Matterhorn server.
app.use(proxyFunc);


function handleLogin(req, res, next) {
  if (mostRecentWatchReqUrl) {
    res.redirect(mostRecentWatchReqUrl);
  }
  else {
    next();
  }
}

function proxyFunc(req, res, next) {
  console.log('Proxying:', req.url);

  if (req.url.indexOf('/player/watch.html') === 0) {
    mostRecentWatchReqUrl = req.url;
  }

  proxy.web(
    req,
    res,
    {
      target: matterhornProxyURL
    }
  );
}

var httpsOpts = {
  key: fs.readFileSync(__dirname + '/fixtures/test.key'),
  cert: fs.readFileSync(__dirname + '/fixtures/test.crt')
};

var server = https.createServer(httpsOpts, app);
server.listen(3000);

console.log('Listening on port 3000.');
