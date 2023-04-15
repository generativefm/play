import { Gain } from 'tone';

const masterGainNode = new Gain(0);

masterGainNode.toDestination();

export default masterGainNode;
