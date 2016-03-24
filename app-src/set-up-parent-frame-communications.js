var createParentFrameListener = require('./create-parent-frame-listener');
var createParentFrameAppriser = require('./create-parent-frame-appriser');

function setUpParentFrameCommunications(document) {
  function setUpParentFrameListener() {
    $(document).off('paella:loadComplete', setUpParentFrameListener);
    createParentFrameListener({
      playResponder: playVideos
    });
  }

  function setUpParentFrameAppriser() {
    $(document).off('paella:loadComplete', setUpParentFrameAppriser);
    createParentFrameAppriser({
      videoElement: document.querySelector('#' + paella.player.videoContainer.video1Id)
    });
  }

  $(document).on('paella:loadComplete', setUpParentFrameListener);
  $(document).on('paella:loadComplete', setUpParentFrameAppriser);
}

function playVideos() {
  paella.player.videoContainer.play();
}

module.exports = setUpParentFrameCommunications;
