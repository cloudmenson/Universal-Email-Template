import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import inlineCss from "gulp-inline-css";
import fileInclude from "gulp-file-include";

const paths = {
  src: "src/**/*.html",
  dest: "dist/",
};

// Збирання з @include
export const buildHtml = () => {
  return gulp
    .src([paths.src])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file", // шукає файли відносно місця виклику
      })
    )
    .pipe(
      inlineCss({
        applyStyleTags: true,
        removeStyleTags: false,
        preserveMediaQueries: true,
        removeLinkTags: false,
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: false,
      })
    )
    .pipe(gulp.dest(paths.dest));
};

// Вотчер для швидкої роботи
export const watchFiles = () => {
  gulp.watch(paths.src, buildHtml);
};

export default gulp.series(buildHtml, watchFiles);
