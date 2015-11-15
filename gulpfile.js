var gulp = require('gulp'),
    gutil = require('gulp-util');

var browserSync = require('browser-sync').create(),
    compass = require('gulp-compass'),
    jade = require('gulp-jade'),
    modRewrite = require("connect-modrewrite"),
    path = require('path'),
    plumber = require('gulp-plumber'),
    ts = require('gulp-typescript'),
    watch = require('gulp-watch');

var base = {
    bower: path.join(__dirname, 'bower_components/'),
    source: path.join(__dirname, 'src/'),
    destination: path.join(__dirname, 'dist/')
};
var paths = {
    copy: {
        content: [base.source + 'content/**/*.*', '!' + base.source + 'content/**/Thumbs.db'],
        javascript: [base.source + 'javascript/vendor/**/*.js'],
        bower: {
            css: [
                base.bower + 'css-spinners/css/spinners.css',
                base.bower + 'Ionicons/css/ionicons.css'
            ],
            font: [
                base.bower + 'Ionicons/fonts/**/*.*'
            ],
            javascript: [
                base.bower + 'angular/angular.js',
                base.bower + 'angular-bing-maps/dist/angular-bing-maps.js',
                base.bower + 'angular-chart.js/dist/angular-chart.js',
                base.bower + 'angular-route/angular-route.js',
                base.bower + 'angular-sanitize/angular-sanitize.js',
                base.bower + 'angularjs-viewhead/angularjs-viewhead.js',
                base.bower + 'autosize/dist/autosize.js',
                base.bower + 'Chart.js/Chart.js',
                base.bower + 'i18next/i18next.js',
                base.bower + 'jquery/dist/jquery.js',
                base.bower + 'ng-i18next/dist/ng-i18next.js',
                base.bower + 'requirejs/require.js',
                base.bower + 'three.js/three.js'
            ]
        }
    },
    jade: {
        source: base.source + '**/*.jade',
        destination: base.destination
    },
    scss: {
        pattern: base.source + 'scss/**/*.scss',
        source: base.source + 'scss/',
        destination: base.destination + 'css/'
    },
    typescript: {
        source: [base.source + 'typescript/**/*.ts', '!' + base.source + 'typescript/typing/**/*.ts'],
        destination: base.destination + 'javascript/'
    }
};

function exec_browser_sync() {
    browserSync.init({
        server: {
            baseDir: base.destination,
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]'])
            ]
        }
    });

    gulp.watch("dist/**/*.*").on("change", browserSync.reload);
}

function exec_compass() {
    gutil.log('Start the Compass task...');

    var options = {
        config_file: './compass.rb',
        css: paths.scss.destination,
        sass: paths.scss.source
    };

    return gulp.src(paths.scss.source)
        .pipe(plumber())
        .pipe(compass(options))
        .pipe(gulp.dest(paths.scss.destination));
}

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

function exec_jade() {
    gutil.log('Start the Jade task...');

    return gulp.src(paths.jade.source)
        .pipe(plumber())
        .pipe(jade({}))
        .pipe(gulp.dest(paths.jade.destination));
}

function exec_typescript() {
    gutil.log('Start the TypeScript task...');

    var options = {
        declaration: false,
        failOnTypeErrors: false,
        module: "amd",
        removeComments: false,
        sourceMap: false,
        target: "es5"
    };

    return gulp.src(paths.typescript.source)
        .pipe(plumber())
        .pipe(ts(options))
        .pipe(gulp.dest(paths.typescript.destination));
}

gulp.task('browser-sync', exec_browser_sync);

gulp.task('compass', exec_compass);

gulp.task('copy', exec_copy);

gulp.task('jade', exec_jade);

gulp.task('typescript', exec_typescript);

gulp.task('watch', function() {
    watch(paths.jade.source, exec_jade);
    watch(paths.scss.pattern, exec_compass);
    watch(paths.typescript.source, exec_typescript);
    watch(paths.copy.content, exec_copy);
});

gulp.task('default', ['jade', 'typescript', 'compass', 'copy']);
