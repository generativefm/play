import * as Tone from 'tone';
import { byId } from '@generative-music/pieces-alex-bainter';
import masterGainNode from '../volume/master-gain-node';
import selectCurrentPieceId from '../queue/select-current-piece-id';

const CUSTOM_MESSAGE_NAMESPACE = 'urn:x-cast:fm.generative';
const CAST_APPLICATION_ID = 'D0D95040';
const CAST_SENDER_SDK_SRC =
  'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

const makeHandleIceCandidate = (castSession) => ({ candidate }) => {
  if (candidate !== null) {
    castSession.sendMessage(
      CUSTOM_MESSAGE_NAMESPACE,
      JSON.stringify({ type: 'ice_candidate', candidate })
    );
  }
};

const makeHandleNegotiationNeeded = (castSession, peerConnection) => () => {
  peerConnection.createOffer().then((offer) => {
    peerConnection
      .setLocalDescription(offer)
      .then(() =>
        castSession.sendMessage(CUSTOM_MESSAGE_NAMESPACE, JSON.stringify(offer))
      );
  });
};

const updateReceiverMetadata = (castSession, currentPieceId) => {
  const { title, imageSrc, releaseDate } = byId[currentPieceId];
  castSession.sendMessage(
    CUSTOM_MESSAGE_NAMESPACE,
    JSON.stringify({
      title,
      artist: 'Alex Bainter',
      albumName: 'Generative.fm Play',
      releaseDate: releaseDate.toISOString(),
      imageUrl: `${window.location.origin}${imageSrc}`,
      type: 'metadata',
    })
  );
};

const handleCastStateConnected = (castContext, store) => {
  Tone.Destination.mute = true;
  const peerConnection = new RTCPeerConnection(null);
  const castSession = castContext.getCurrentSession();
  castSession.addMessageListener(CUSTOM_MESSAGE_NAMESPACE, (ns, message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'answer': {
        peerConnection.setRemoteDescription(data);
        break;
      }
      case 'ice_candidate': {
        peerConnection.addIceCandidate(data.candidate);
        break;
      }
      default: {
        // nothing
      }
    }
  });

  peerConnection.onicecandidate = makeHandleIceCandidate(castSession);
  peerConnection.onnegotiationneeded = makeHandleNegotiationNeeded(
    castSession,
    peerConnection
  );

  const streamDestination = Tone.getContext().createMediaStreamDestination();
  masterGainNode.connect(streamDestination);

  streamDestination.stream.getAudioTracks().forEach((track) => {
    peerConnection.addTrack(track, streamDestination.stream);
  });

  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.NOT_CONNECTED) {
      Tone.Destination.mute = false;
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      attachConnectedListener(castContext, store);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );

  const currentPieceId = selectCurrentPieceId(store.getState());
  if (currentPieceId !== null) {
    updateReceiverMetadata(castSession, currentPieceId);
  }
};

const attachConnectedListener = (castContext, store) => {
  const { cast } = window;
  const handleCastStateChanged = ({ castState }) => {
    if (castState === cast.framework.CastState.CONNECTED) {
      castContext.removeEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        handleCastStateChanged
      );
      handleCastStateConnected(castContext, store);
    }
  };

  castContext.addEventListener(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    handleCastStateChanged
  );
};

const castMiddleware = (store) => (next) => {
  let isCasting = () => false;
  window.__onGCastApiAvailable = (isAvailable) => {
    if (!isAvailable || !window.chrome.cast) {
      return;
    }
    const castContext = window.cast.framework.CastContext.getInstance();
    castContext.setOptions({
      receiverApplicationId: CAST_APPLICATION_ID,
      autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });
    attachConnectedListener(castContext, store);
    isCasting = () =>
      castContext.getCastState() === window.cast.framework.CastState.CONNECTED;
  };

  const scriptTag = document.createElement('script');
  scriptTag.src = CAST_SENDER_SDK_SRC;
  document.body.append(scriptTag);

  return (action) => {
    if (!isCasting()) {
      return next(action);
    }
    const previousPieceId = selectCurrentPieceId(store.getState());
    const result = next(action);
    const nextPieceId = selectCurrentPieceId(store.getState());
    if (previousPieceId !== nextPieceId && nextPieceId !== null) {
      const castSession = window.cast.framework.CastContext.getInstance().getCurrentSession();
      updateReceiverMetadata(castSession, nextPieceId);
    }
    return result;
  };
};

export default castMiddleware;
