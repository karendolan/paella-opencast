var test = require('tape');
// var ParentAppriser = require('../app-src/parent-appriser');

test('Parent receives notifications if it exists', function parentTest(t) {
  var iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:8000/tests/fixtures/inner-frame.html';
  document.body.appendChild(iframe);
});
