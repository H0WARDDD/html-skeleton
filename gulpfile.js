var gulp = require('gulp');
var rename = require('gulp-rename');
var sequence = require('gulp-sequence');
var sourcemaps = require('gulp-sourcemaps');
//Template
var hb = require('gulp-hb');
//CSS
var csscomb = require('gulp-csscomb');
var sass = require('gulp-sass');
var bulkSass = require('gulp-sass-bulk-import');
var autoprefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');
var cssnano = require('gulp-cssnano');
//Template build
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
//CSS build
gulp.task('csscomb', function() {
	return gulp.src(['src/sass/**/*.scss', '!src/sass/mixins/**/*.scss', '!src/sass/normalize/**/*.scss'])
		.pipe(csscomb())
		.pipe(gulp.dest('src/sass/'));
});

gulp.task('sass', function() {
	return gulp.src('src/sass/styles.scss')
		.pipe(bulkSass())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: [
				'last 2 versions',
				'Explorer >= 9',
				'Android >= 4'
			]
		}))
		.pipe(combineMq({
			beautify: false
		}))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('cssminify', function() {
	return gulp.src(['*.css', '!*.min.css'], {
			cwd: 'dist/css'
		})
		.pipe(cssnano({
			zindex: true //Unsafe optimisation, please check here for details http://cssnano.co/optimisations/
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('build-html', ['build-pages', 'build-includes']);
gulp.task('build-css', sequence('csscomb', 'sass', 'cssminify'));
