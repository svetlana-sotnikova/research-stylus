// Подключаем плагины
var gulp = require('gulp'),
  nib = require('nib'),
  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require("gulp-notify"),
  plumber = require('gulp-plumber'),
  cssmin = require('gulp-cssmin');
// Объявляем наш таск для сборки стилей
gulp.task('stylus', function() {
  // Говорим Gulp откуда взять наши Stylus файлы
  return gulp.src(['./style/stylus/*.styl'])
    // Заменяем текущий поток на кастомный, чтобы избежать умирания вотчера при ошибках в коде
    // В настройках плагина указываем, что нужно вызвать метод onError() у плагина notify
    // (Это выведет сообщение об ошибке во всплывающем окне)
    .pipe(plumber({
      errorHandler: notify.onError()
    }))
    // Подключаем плагин Stylus
    // В нем указываем, что нам необходим Nib, а так же указываем, что нам не нужно минифицировать код
    // Мы отключили минификацию для того, чтобы ошибки синтаксиса показывались с точностью до строки.
    // Ведь если мы будем минифицировать стили средствами плагина Stylus,
    // то ошибка всегда будет показываться в первой строчке, а это не очень удобно.
    .pipe(stylus({
      use: nib(),
      compress: false,
    }))
    // Добавляем префиксы для броузеров
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
    }))
    // Минифицируем стили
    .pipe(cssmin())
    // Указываем куда нужно положить стили, которые получились в итоге
    .pipe(gulp.dest('./style/css'))
    // Показываем уведомление о том, что стили успешно собраны
    .pipe(notify('Stylus SUCCESS'));
});
// Задаем таск вотчера, чтобы стили собирались автоматически, при сохранении stylus файлов
gulp.task('watch', function() {
  gulp.watch(['./style/stylus/*.styl', './style/stylus/inc/*.styl'], ['stylus']);
});