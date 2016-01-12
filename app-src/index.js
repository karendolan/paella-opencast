var initPlayerRouter = require('dce-player-router');
var pathExists = require('object-path-exists');

var seekMethodPath = ['player', 'videoContainer', 'seekToTime'];

var router = initPlayerRouter({
  seeking: {
    seekParamName: 't',
    seekResponder: seekWhenPaellaIsReady
  }
});

router.route();

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
