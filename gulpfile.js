const { src, dest, watch } = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();


function lessCompli(){
	return src("./less/*.less")
	.pipe(less())
	.pipe(dest("dest/css"));
}

function minCss(){
	return src("./css/*.css")
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest("dest/css"));  
} 

function html(){
	return src("./dest/*.html")
		.pipe(dest("./dest"))
		.pipe(browserSync.stream());
}

function Reload(){
	browserSync.init({
		server: {
			baseDir: "./dest"
		},
		browser: 'chrome',
		notify: false
	});

	watch("./dest/**/*.html").on('change', browserSync.reload);
	watch("./less/**/*.less", lessCompli);
}

exports.less = lessCompli;
exports.min = minCss;
exports.watch = Reload;