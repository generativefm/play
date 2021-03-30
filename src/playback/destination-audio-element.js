import mediaStreamDestination from './media-stream-destination';

const destinationAudioElement = document.createElement('audio');

if ('srcObject' in destinationAudioElement) {
  destinationAudioElement.srcObject = mediaStreamDestination.stream;
} else {
  destinationAudioElement.src = URL.createObjectURL(
    mediaStreamDestination.stream
  );
}

export default destinationAudioElement;
