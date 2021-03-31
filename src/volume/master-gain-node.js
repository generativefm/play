import { Gain } from 'tone';
import isIos from '../platforms/is-ios';
import mediaStreamDestination from '../playback/media-stream-destination';

const masterGainNode = new Gain(0);

if (isIos) {
  masterGainNode.connect(mediaStreamDestination);
} else {
  masterGainNode.toDestination();
}

export default masterGainNode;
