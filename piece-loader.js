'use strict';

const pieceLoader = (source) => {
  const pieceManifest = JSON.parse(source);
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
  }`;
  return output;
};

module.exports = pieceLoader;
