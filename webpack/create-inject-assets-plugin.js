'use strict';

const {
  Compilation,
  sources: { RawSource },
} = require('webpack');

function createInjectAssetsPlugin(fileName) {
  const apply = (compiler) => {
    compiler.hooks.thisCompilation.tap('InjectAssetsPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'ServiceWorkerPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
        },
        () => {
          const updateSource = (oldSource) => {
            return new RawSource(
              oldSource
                .source()
                .toString()
                .replace(
                  '__WEBPACK_ASSETS__',
                  `[${Object.keys(compilation.assets)
                    .map((asset) => `'${asset}'`)
                    .join(',')}]`
                )
            );
          };
          return compilation.updateAsset(fileName, updateSource);
        }
      );
    });
  };

  return Object.create({ apply });
}

module.exports = createInjectAssetsPlugin;
