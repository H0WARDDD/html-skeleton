var gulp = require('gulp');
var hb = require('gulp-hb');
var rename = require('gulp-rename');

gulp.task('build-pages', function() {
	var hbStream = hb()
		// Partials
		.partials('src/templates/components/**/*.hbs')
		.partials('src/templates/layouts/**/*.hbs')
		// Helpers
		.helpers(require('handlebars-layouts'));

	return gulp.src('src/pages/*.hbs')
		.pipe(hbStream)
		.pipe(rename({
			extname: ".shtml"
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('build-includes', function() {
	var hbStream = hb()
		// Partials
		.partials('src/templates/components/**/*.hbs')
		.partials('src/templates/layouts/**/*.hbs')
		// Helpers
		.helpers(require('handlebars-layouts'));

	return gulp.src('src/includes/**/*.hbs')
		.pipe(hbStream)
		.pipe(rename({
			extname: ".shtml"
		}))
		.pipe(gulp.dest('dist/includes'));
});

gulp.task('build', ['build-pages', 'build-includes']);
