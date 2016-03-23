var test = require('tape');

// var ParentAppriser = require('../app-src/parent-appriser');

test('Parent receives notifications if it exists', function parentTest(t) { 
  var iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:3000/engage/player/watch.html?id=74b6c02f-afbb-42bc-8145-344153a1792e';
  document.body.appendChild(iframe);

  var readyEventReceived = false;
  var timeupdatesReceived = 0;
  var numberOfTimeupdatesToCheckFor = 10;

  // console.log(Object.keys(iframe));
  window.addEventListener('message', receiveMessage, false);

  function receiveMessage(event) {
    if (!readyEventReceived && event.data.name === 'ready') {
      t.deepEqual(
        event.data,
        {
          sender: 'dce-player',
          name: 'ready'
        },
        'Ready event is sent.'
      );

      readyEventReceived = true;
      var playMessage = {
        sender: 'gov2001',
        name: 'play'
      };
      iframe.contentWindow.postMessage(playMessage, '*');
    }
    else {
      t.equal(event.data.name, 'timeupdate', 'timeupdate event is sent.');
      t.equal(event.data.sender, 'dce-player', 'Event sender is correct.');
      t.equal(typeof event.data.value, 'number', 'Event value is a number.');
      timeupdatesReceived += 1;

      if (timeupdatesReceived >= numberOfTimeupdatesToCheckFor) {
        t.end();
      }
    }
  }
});
