var test = require('tape');

// var ParentAppriser = require('../app-src/parent-appriser');

test('Parent receives notifications if it exists', function parentTest(t) { 
  var iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:3000/engage/player/watch.html?id=74b6c02f-afbb-42bc-8145-344153a1792e';
  document.body.appendChild(iframe);
});
