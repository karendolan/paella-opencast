var initPlayerRouter = require('@harvard-dce/player-router');
var pathExists = require('object-path-exists');

var seekMethodPath = ['player', 'videoContainer', 'seekToTime'];

var router = initPlayerRouter({
  seeking: {
    seekParamName: 'start',
    seekResponder: seekWhenPaellaIsReady
  }
});

router.route();

function seekWhenPaellaIsReady(time) {
  seek();

  function seek() {
    if (pathExists(paella, seekMethodPath)) {
      $(document).off('paella:loadComplete', seek);
      paella.player.videoContainer.seekToTime(time);
    }
    else {
      $(document).on('paella:loadComplete', seek);
    }
  }
}
