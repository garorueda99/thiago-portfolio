import babel from 'rollup-plugin-babel';

export default {
  entry: 'scripts/src/index.js',
  format: 'umd',
  plugins: [ babel() ],
  dest: 'scripts/lib/index.js',
}
