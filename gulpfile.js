var gulp = require('gulp')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , uglify = require('gulp-uglify')
	, source = require('vinyl-source-stream')
	, buffer = require('vinyl-buffer');

gulp.task('build', function() {
	var options = global.watchingChanges ? {cache: {}, packageCache: {}, fullPaths: true} : {};

	var bundler = browserify(options)
	.require('./assets/NAND.js', {expose: 'NAND'})
	.require('./assets/adder.js', {expose: 'adder'})
	.require('./assets/memory.js', {expose: 'memory'})
	.require('./assets/more-gates.js', {expose: 'more-gates'})
	.require('./assets/binary.js', {expose: 'binary'})
	.require('./assets/cpu.js', {expose: 'cpu'});

	if (global.watchingChanges) {
		bundler = watchify(bundler);
		bundler.on('update', bundle);
	}

	return bundle();	

	function bundle() {
		console.log('['+(new Date()).toTimeString().split(' ')[0]+'] bundling...');
		bundler.bundle()
		.on('error', function(err) { console.log(err); })
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('scripts'));
	}
});

gulp.task('build:dev', [ 'watch:set', 'build' ]);

gulp.task('watch:set', function() {
	global.watchingChanges = true;
});