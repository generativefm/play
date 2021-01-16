import { Gain } from 'tone';

const masterGainNode = new Gain(0).toDestination();

export default masterGainNode;
