global.$ = {
  //пакеты
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")(),
  browserSync: require("browser-sync").create(),
  //Конфигурация
  path: require("./config/path.js"),
  app: require("./config/app.js"),
};

//Задачи
const requireDir = require("require-dir");
const task = requireDir("./tasks", { recurse: true });

// Вотчер
const watcher = () => {
  $.gulp.watch($.path.html.watch, task.html);
  $.gulp.watch($.path.scss.watch, task.scss);
  $.gulp.watch($.path.js.watch, task.js);
  $.gulp.watch($.path.img.watch, task.img);
  $.gulp.watch($.path.font.watch, task.font);
};
const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.html, task.scss, task.js, task.img, task.font)
);
const dev = $.gulp.series(build, $.gulp.parallel(watcher, task.server));
//Задачи
exports.html = task.html;
exports.html = task.html;
exports.scss = task.scss;
exports.js = task.js;
exports.font = task.font;
exports.img = task.img;
exports.css = task.css;
exports.server = task.server;

//Сборка
exports.default = $.app.isProd ? build : dev;
