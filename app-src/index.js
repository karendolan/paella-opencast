var initPlayerRouter = require('dce-player-router');
var pathExists = require('object-path-exists');

var seekMethodPath = ['player', 'videoContainer', 'seekToTime'];

var router = initPlayerRouter({
  seeking: {
    seekParamName: 't',
    seekResponder: seekWhenPaellaIsReady
  }
});

function seekWhenPaellaIsReady(startTime, endTime) {
  seek();
  // TODO: Implement endTime support.

  function seek() {
    if (pathExists(paella, seekMethodPath)) {
      $(document).off('paella:loadComplete', seek);
      paella.player.videoContainer.seekToTime(startTime);
    }
    else {
      $(document).on('paella:loadComplete', seek);
    }
  }
}

function clearDoneUrlCookie() {
  document.cookie = 'done_url=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ' +
    'domain=.harvard.edu; path=/';
}

function disableAutoHiding() {
  $(document).on('paella:controlBarLoaded', getRidOfOnPlayEvent);

  function getRidOfOnPlayEvent() {
    $(document).off('paella:controlBarLoaded', getRidOfOnPlayEvent);
    paella.player.controls.restartHideTimer = noOp;
  }
}

function noOp() {
}

((function go() {
  disableAutoHiding();
  clearDoneUrlCookie();
  router.route();
})());
