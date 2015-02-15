/*global module*/
module.exports = function (grunt) {
    'use strict';

    /* Grunt configuration. */
    grunt.initConfig({
        browserSync: {
            bsFiles: {
                src: 'dist/*.*'
            },
            options: {
                server: {
                    baseDir: 'dist/'
                }
            }
        },
        clean: {
            locales: ['src/locales/'],
            reset: ['debug']
        },
        compass: {
            dev: {
                options: {
                    cacheDir: 'dist/.sass-cache/',
                    cssDir: 'dist/css/',
                    debugInfo: true,
                    environment: 'development',
                    noLineComments: false,
                    sassDir: 'src/scss/',
                    sourcemap: true,
                    trace: true
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/typescript/',
                        expand: true,
                        src: 'locales/**/*',
                        dest: 'dist/scripts/',
                        filter: 'isFile'
                    },
                    {
                        cwd: 'bower_components/',
                        expand: true,
                        src: [
                            'angular/**/*.js', 
                            'angular-animate/**/*.js',
                            'angular-route/**/*.js',
                            'angular-route-styles/route-styles.js',
                            'angular-ui-router/release/**/*.js',
                            'bootstrap/dist/**/*.js',
                            'i18next/**/*.js',
                            'jquery/dist/**/*.js',
                            'jquery-autosize/*.js',
                            'jquery.fadebyscroll/dist/*.js',
                            'jquery-viewport-checker/src/*.js',
                            'jquery-ui/*.js',
                            'ng-i18next/dist/*.js',
                            'requirejs/*.js',
                            'velocity/*.js'
                        ],
                        dest: 'dist/scripts/vendor/'
                    },
                    {
                        cwd: 'bower_components/',
                        expand: true,
                        src: [
                            'animate.css/*.css',
                            'bootstrap/dist/**/*.css'
                        ],
                        dest: 'dist/css/vendor/',
                        filter: 'isFile'
                    }
                ]
            },
            content: {
                files: [
                    {
                        cwd: 'src/',
                        expand: true,
                        src: 'content/**/*',
                        dest: 'dist/',
                        filter: 'isFile'
                    }
                ]
            },
            locales: {
                files: [
                    {
                        cwd: 'src/typescript/',
                        expand: true,
                        src: 'locales/**/*',
                        dest: 'dist/scripts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jade: {
            dev: {
                options: {
                    data: {
                        data: {
                            debug: true
                        },
                        pretty: true
                    }
                },
                files: [{
                    cwd: 'src/',
                    dest: 'dist/',
                    expand: true,
                    ext: '.html',
                    src: '**/*.jade'
                }]
            }
        },
        ts: {
            dev: {
                src: ['src/typescript/**/*.ts'],
                outDir: 'dist/scripts/',
                options: {
                    declaration: false,
                    target: 'es5',
                    removeComments: false,
                    sourceMap: false
                }
            }
        },
        watch: {
            locales: {
                files: 'src/typescript/locales/*.json',
                tasks: ['clean:locales', 'copy:locales']
            },
            scripts: {
                files: 'src/typescript/**/*.ts',
                tasks: ['ts:dev']
            },
            contents: {
                files: 'src/content/**/*.*',
                tasks: ['copy:content']
            },
            styles: {
                files: 'src/scss/**/*.scss',
                tasks: ['compass:dev']
            },
            views: {
                files: ['src/**/*.jade'],
                tasks: ['jade:dev']
            }
        }
    });

    /* Dependencies. */
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    /* Tasks. */
    grunt.registerTask('default', ['jade:dev', 'compass:dev', 'ts:dev', 'copy:content', 'copy:dev']);
};