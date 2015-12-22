'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const compass = require('gulp-compass');
const cssmin = require('gulp-cssmin');
const critical = require('critical');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const jade = require('gulp-jade');
const modRewrite = require('connect-modrewrite');
const path = require('path');
const plumber = require('gulp-plumber');
const scsslint = require('gulp-scss-lint');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');

const base = {
    bower: path.join(__dirname, 'bower_components/'),
    source: path.join(__dirname, 'src/'),
    destination: path.join(__dirname, 'dist/')
};
const paths = {
        copy: {
            content: [
                path.join(base.source, 'content/**/*.*') + '!' + path.join(base.source, 'content/**/Thumbs.db'))
        ],
        javascript: [
            path.join(base.source, 'javascript/vendor/**/*.js')
        ],
        bower: {
            css: [
                path.join(base.bower, 'css-spinners/css/spinners.css'),
                path.join(base.bower, 'Ionicons/css/ionicons.css')
            ],
            font: [
                path.join(base.bower, 'Ionicons/fonts/**/*.*')
            ],
            javascript: [
                path.join(base.bower, 'angular/angular.js'),
                path.join(base.bower, 'angular-google-analytics/dist/angular-google-analytics.js'),
                path.join(base.bower, 'angular-route/angular-route.js'),
                path.join(base.bower, 'angular-sanitize/angular-sanitize.js'),
                path.join(base.bower, 'angularjs-viewhead/angularjs-viewhead.js'),
                path.join(base.bower, 'autosize/dist/autosize.js'),
                path.join(base.bower, 'i18next/i18next.js'),
                path.join(base.bower, 'jquery/dist/jquery.js'),
                path.join(base.bower, 'modernizr/modernizr.js'),
                path.join(base.bower, 'ng-i18next/dist/ng-i18next.js'),
                path.join(base.bower, 'requirejs/require.js'),
                path.join(base.bower, 'three.js/three.js')
            ]
        }
    },
    image: {
        source: path.join(base.destination, 'content/image/');
        destination: path.join(base.destination, 'content/image/')
    },
    jade: {
        source: path.join(base.source, '**/!(_)*.jade'),
        destination: base.destination
    },
    scss: {
        pattern: path.join(base.source, 'scss/**/*.scss'),
        source: path.join(base.source, 'scss/'),
        destination: path.join(base.destination, 'css/')
    },
    typescript: {
        source: [base.source + 'typescript/**/*.ts', '!' + base.source + 'typescript/typing/**/*.ts'],
        destination: path.join(base.destination, 'javascript/')
    }
};

/**
 * @summary Execute the time-saving synchronised browser.
 */
function exec_browser_sync() {
    browserSync.init({
        server: {
            baseDir: base.destination,
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]'])
            ]
        }
    });

    gulp.watch('dist/**/*.*').on('change', browserSync.reload);
}

/**
 * @summary Minify CSS.
 * @param {Function} cb The callback.
 */
function exec_cssmin(cb) {
    gutil.log('Minify CSS...');

    const source = path.join(paths.scss.destination, '**/*.css');
    gulp.src(source)
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest(paths.scss.destination));

    if (cb && typeof cb === 'function') cb();
}

/**
 * @summary Execute Compass tool.
 */
function exec_compass() {
    gutil.log('Start the Compass task...');

    const options = {
        config_file: './compass.rb',
        css: paths.scss.destination,
        sass: paths.scss.source
    };

    return gulp.src(paths.scss.source)
        .pipe(plumber())
        .pipe(compass(options))
        .pipe(gulp.dest(paths.scss.destination));
}

/**
 * @summary Copy the files.
 */
function exec_copy() {
    gutil.log('Copy files...');

    gulp.src(paths.copy.bower.font)
        .pipe(gulp.dest(base.destination + 'css/fonts/'));
    gulp.src(paths.copy.content)
        .pipe(gulp.dest(base.destination + 'content/'));
    gulp.src(paths.copy.javascript)
        .pipe(gulp.dest(base.destination + 'javascript/vendor/'));
    gulp.src(paths.copy.bower.javascript)
        .pipe(gulp.dest(base.destination + 'javascript/vendor/'));
    gulp.src(paths.copy.bower.css)
        .pipe(gulp.dest(base.destination + 'css/vendor/'));
}

/**
 * @summary Determines the CSS critical.
 */
function exec_critical() {
    gutil.log('Start the Critical task...');

    const options = {
        base: base.destination,
        src: 'index.html',
        css: [path.join(base.destination, 'css/base.css')],
        dest: path.join(base.destination, 'index.html'),
        minify: true,
        dimensions: [{
            width: 320,
            height: 480
        }, {
            width: 768,
            height: 1024
        }, {
            width: 1280,
            height: 960
        }, {
            width: 1920,
            height: 1080
        }],
    };
    critical.generateInline(options);
}

/**
 * @summary Minify PNG, JPEG, GIF and SVG images.
 */
function exec_imagemin() {
    gutil.log('Minify PNG, JPEG, GIF and SVG images...');

    const options = {
        progressive: true,
        use: [pngquant()]
    };

    gulp.src(paths.image.source)
        .pipe(plumber())
        .pipe(imagemin(options))
        .pipe(gulp.dest(paths.image.destination));
}

/**
 * @summary Compile Jade templates.
 * @param {Function} cb The callback.
 */
function exec_jade(cb) {
    gutil.log('Compile Jade templates...');

    gulp.src(paths.jade.source)
        .pipe(plumber())
        .pipe(jade())
        .pipe(gulp.dest(paths.jade.destination));

    if (cb && typeof cb === 'function') cb();
}

/**
 * @summary Checks the code quality.
 * @param {Function} cb The callback.
 */
function exec_tslint(cb) {
    gutil.log('Checks the code quality...');

    const source = [path.normalize(paths.source + '**/*.ts'), path.normalize('!' + paths.source + 'typing/**/*.ts')];
    gulp.src(source)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));

    if (cb && typeof cb === 'function') cb();
}

/**
 * @summary Compiles TypeScript files to JavaScript files.
 */
function exec_typescript() {
    gutil.log('Compiles TypeScript files to JavaScript files...');

    var options = {
        declaration: false,
        failOnTypeErrors: false,
        module: 'amd',
        removeComments: false,
        sourceMap: false,
        target: 'es5'
    };

    return gulp.src(paths.typescript.source)
        .pipe(plumber())
        .pipe(ts(options))
        .pipe(gulp.dest(paths.typescript.destination));
}

/**
 * @summary Minify files with UglifyJS.
 */
function exec_uglify() {
    gutil.log('Minify files with UglifyJS...');

    const source = path.join(paths.typescript.destination, '**/*.js');
    return gulp.src(source)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(paths.typescript.destination));
}

/**
 * @summary Executes the watcher.
 */
function exec_watch() {
    watch(paths.jade.source, exec_jade);
    watch(paths.scss.pattern, exec_compass);
    watch(paths.typescript.source, exec_typescript);
    watch(paths.copy.content, exec_copy);
}

/**
 * @summary Validate SCSS files.
 */
function exec_scss_lint() {
    gutil.log('Validate SCSS files...');

    return gulp.src(paths.scss.pattern)
        .pipe(scsslint());
}

// Individual tasks
gulp.task('browser-sync', exec_browser_sync);
gulp.task('cssmin', exec_cssmin);
gulp.task('compass', exec_compass);
gulp.task('copy', exec_copy);
gulp.task('critical', exec_critical);
gulp.task('imagemin', exec_imagemin);
gulp.task('jade', exec_jade);
gulp.task('scss-lint', exec_scss_lint);
gulp.task('typescript', exec_typescript);
gulp.task('uglify', exec_uglify);
gulp.task('watch', exec_watch);

// Tasks
gulp.task('default', ['copy', 'typescript', 'jade', 'compass']);
gulp.task('production', ['critical', 'uglify', 'cssmin', 'imagemin']);
