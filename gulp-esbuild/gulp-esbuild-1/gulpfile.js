const { src, dest } = require('gulp');
const gulpEsbuild = require('gulp-esbuild');

function build() {
  return src('src/index.js')
    .pipe(
      gulpEsbuild({
        outfile: 'bundle.js',
        bundle: true,
        format: 'iife',
        target: ['es2015']
      })
    )
    .pipe(dest('dist'));
}

// Define the default task
function defaultTask(cb) {
  build();
  cb();
}

exports.build = build;
exports.default = defaultTask;
