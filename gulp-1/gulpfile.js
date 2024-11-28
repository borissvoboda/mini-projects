const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");

const paths = {
  src: "src/*.html", // Source HTML files
  root: "./", // Output directory for index.html
  base: "src", // Basepath for includes
  allSrc: "src/**/*" // Watch all files in /src
};

// Task to process HTML includes and create index.html in root
gulp.task("html", () => {
  return gulp
    .src(paths.src)
    .pipe(
      fileInclude({
        prefix: "@@", // Syntax for includes
        basepath: paths.base // Base directory for includes
      })
    )
    .pipe(
      rename((path) => {
        if (path.basename === "index") {
          path.dirname = ""; // Place index.html in the root
        }
      })
    )
    .pipe(gulp.dest(paths.root)) // Output index.html to the root
    .pipe(browserSync.stream()); // Reload browser
});

// Task to serve files and watch for changes
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: paths.root // Serve from the root
    }
  });

  gulp.watch(paths.allSrc, gulp.series("html")); // Watch for changes in /src and rebuild index.html
  gulp.watch("src/**/*.*").on("change", browserSync.reload); // Reload browser on other changes
});

// Default task: Build HTML and start server
gulp.task("default", gulp.series("html", "serve"));
