'use strict';

const path = require('path');

function pieceLoader(source) {
  const pieceManifest = JSON.parse(source);
  const { version } = require(path.join(this.context, 'package.json'));
  const output = `import imageSrc from '${pieceManifest.image}';
  export default {
    imageSrc,
    loadActivate: () => import('${
      pieceManifest.makePiece
    }').then((m) => m.default),
    isRecordable: ${pieceManifest.isRecordable},
    title: '${pieceManifest.title}',
    id: '${pieceManifest.id}',
    tags: [${pieceManifest.tags.map((tag) => `"${tag}"`)}],
    releaseDate: new Date('${pieceManifest.releaseDate}'),
    version: '${version}',
    sampleNames: [${pieceManifest.sampleNames.map((instrument) =>
      Array.isArray(instrument)
        ? `[${instrument.map((name) => `"${name}"`)}]`
        : `"${instrument}"`
    )}],
    bandcampUrl: ${
      typeof pieceManifest.bandcampUrl === 'string'
        ? `"${pieceManifest.bandcampUrl}"`
        : null
    }
  }`;
  return output;
}

module.exports = pieceLoader;
