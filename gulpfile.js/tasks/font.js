// !!!
//открываем node_modules/gulp-fonter/dist/index.js, находим строку:
//newFont.path = source.dirname + '\\' + source.stem + '.' + type;

// обработка css

const font = () => {
  return $.gulp
    .src($.path.font.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "FONT",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.newer($.path.font.dest))
    .pipe($.gp.fonter($.app.fonter))
    .pipe($.gulp.dest($.path.font.dest))
    .pipe($.gp.ttf2woff2())
    .pipe($.gulp.dest($.path.font.dest))
    .pipe($.browserSync.stream());
};

module.exports = font;
