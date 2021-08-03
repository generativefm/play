import createSampleProvider from '@generative-music/web-provider';
import createSampleLibrary from '@generative-music/web-library';
import { retryable } from '@generative.fm/web-ui';

const lazyMp3Index = retryable(() =>
  import('@generative-music/samples-alex-bainter/src/mp3')
);
const lazyOggIndex = retryable(() =>
  import('@generative-music/samples-alex-bainter/src/ogg')
);

const provider = createSampleProvider();

const getSampleIndex = () => {
  const audio = document.createElement('audio');
  const canPlayOgg = audio.canPlayType('audio/ogg') !== '';
  if (canPlayOgg) {
    return lazyOggIndex();
  }
  return lazyMp3Index();
};

let sampleLibraryPromise;
const getSampleLibrary = () => {
  if (!sampleLibraryPromise) {
    sampleLibraryPromise = getSampleIndex().then((sampleModule) => {
      const getSampleIndex = sampleModule.default;
      return createSampleLibrary({ sampleIndex: getSampleIndex(), provider });
    });
  }
  return sampleLibraryPromise;
};

export default getSampleLibrary;
