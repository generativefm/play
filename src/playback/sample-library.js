import getSampleIndex from '@generative-music/samples-alex-bainter';
import createSampleProvider from '@generative-music/web-provider';
import createSampleLibrary from '@generative-music/web-library';

const sampleIndex = getSampleIndex({
  format: 'mp3',
});
const provider = createSampleProvider();
const sampleLibrary = createSampleLibrary({ sampleIndex, provider });

export default sampleLibrary;
