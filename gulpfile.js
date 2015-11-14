var gulp = require('gulp'),
    browserSync = require('browser-sync'),
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
        content: [base.source + 'content/**/*.*'],
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
        source: base.source + 'scss/',
        destination: base.destination + 'css/'
    },
    typescript: {
        source: [base.source + 'typescript/**/*.ts', '!' + base.source + 'typescript/typing/**/*.ts'],
        destination: base.destination + 'javascript/'
    }
};

gulp.task('browser-sync', function() {
    browserSync.create();
    browserSync.init({
        server: {
            baseDir: base.destination,
            middleware: [
                modRewrite(['^[^\\.]*$ /index.html [L]'])
            ]
        }
    });
});

gulp.task('compass', function() {
    var options = {
        config_file: './compass.rb',
        css: paths.scss.destination,
        sass: paths.scss.source
    };

    gulp.src(paths.scss.source)
        .pipe(plumber())
        .pipe(compass(options))
        .pipe(gulp.dest(paths.scss.destination));
});

gulp.task('copy', function() {
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
});

gulp.task('jade', function() {
    gulp.src(paths.jade.source)
        .pipe(jade({}))
        .pipe(gulp.dest(paths.jade.destination))
});

gulp.task('typescript', function() {
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
});

gulp.task('watch', function(cb) {
    watch(paths.scss, function() {
        gulp.task('compass');
    });
    watch(paths.typescript, function() {
        gulp.task('typescript');
    });
    watch(paths.jade, function() {
        gulp.task('jade');
    });
});

gulp.task('default', ['jade', 'typescript', 'compass', 'copy']);
