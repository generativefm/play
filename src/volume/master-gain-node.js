import { Gain } from 'tone';
import mediaStreamDestination from '../playback/media-stream-destination';

const masterGainNode = new Gain(0).connect(mediaStreamDestination);

export default masterGainNode;
