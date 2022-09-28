// обработка css
const css = () => {
  return $.gulp
    .src($.path.css.src, { sourcemaps: $.app.isDev })
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "CSS",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.concat("main.css"))
    .pipe($.gp.cssimport())
    .pipe($.gp.webpCss())
    .pipe($.gp.autoprefixer())
    .pipe($.gp.shorthand())
    .pipe($.gp.groupCssMediaQueries())
    .pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
    .pipe($.gp.rename({ suffix: ".min" }))
    .pipe($.gp.size({ title: "До сжатия CSS" }))
    .pipe($.gp.csso())
    .pipe($.gp.size({ title: "После сжатия CSS" }))
    .pipe($.gulp.dest($.path.css.dest, { sourcemaps: $.app.isDev }))
    .pipe($.browserSync.stream());
};

module.exports = css;
