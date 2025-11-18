import * as path from 'path';
import moduleAlias from 'module-alias';

const rootPath = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@src': path.join(rootPath, 'dist'),
  '@modules': path.join(rootPath, 'dist/app/modules'),
  '@test': path.join(rootPath, 'dist/test'),
});
