import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import inlineCss from "gulp-inline-css";
import fileInclude from "gulp-file-include";

const paths = {
  src: "src/**/*.html",
  dest: "dist/",
};

export const buildHtml = () => {
  return gulp
    .src([paths.src])
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
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
        conservativeCollapse: true,
        minifyCSS: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest(paths.dest));
};

export const watchFiles = () => {
  gulp.watch(paths.src, buildHtml);
};

export default gulp.series(buildHtml, watchFiles);
