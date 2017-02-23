const gulp = require('gulp');
const less = require('gulp-less');
const imageMin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat'); //合并文件

gulp.task('concat', function() {
	gulp.src('src/less/*.css')
		.pipe(concat('main.js'))
		.pipe(gulp.dest('build/js'))
})



gulp.task('less', function() {
	gulp.src('src/less/*.less')
		.pipe(less()) //less编译成css
		.pipe(cssmin()) //css压缩 
		.pipe(concat('main.css')) //合并
		.pipe(gulp.dest('build/css'))
		
});

gulp.task('imagemin', function() {
	gulp.src('src/img/*.{png,gif,jpg}')
		.pipe(imageMin())
		.pipe(gulp.dest('build/img'))
})
gulp.task('uglify', function() {
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
})

gulp.task('htmlmin', function() {
	gulp.src('src/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(gulp.dest('build'))
})

gulp.task('watch', function() {
	gulp.watch('src/less/*.less', ['less']);
	gulp.watch('src/js/*.js', ['uglify']);
	gulp.watch('src/*.html', ['htmlmin']);
});

gulp.task('default', ['watch', 'less', 'imagemin', 'uglify', 'htmlmin','concat']); //监听