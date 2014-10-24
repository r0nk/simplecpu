var gulp = require('gulp')
  , browserify = require('browserify')
  , watchify = require('watchify')
	, source = require('vinyl-source-stream');

gulp.task('build', function() {
	var bundler = browserify({
  		// for watchify
  		cache: {}, packageCache: {}, fullPaths: true,
  		// leave debug out until we are uglifying too
  		// debug: true
  	})
	.add('./assets/NAND.js');

	if (global.watchingChanges) {
		bundler = watchify(bundler);
		bundler.on('update', bundle);
	}

	return bundle();	

	function bundle() {
		console.log('['+(new Date()).toTimeString().split(' ')[0]+'] bundling...');
		bundler.bundle()
		.on('error', function(err) { console.log(err); })
		.pipe(source('NAND.js'))
		.pipe(gulp.dest('scripts'));
	}
});

gulp.task('watch', [ 'watch:set', 'build' ]);

gulp.task('watch:set', function() {
	global.watchingChanges = true;
});