import getSampleIndex from '@generative-music/samples-alex-bainter';
import createSampleProvider from '@generative-music/web-provider';
import createSampleLibrary from '@generative-music/web-library';

const sampleIndex = getSampleIndex({
  host: 'http://localhost:6969',
  format: 'mp3',
});
const provider = createSampleProvider();
const sampleLibrary = createSampleLibrary({ sampleIndex, provider });

export default sampleLibrary;
