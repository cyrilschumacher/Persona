/*global module*/
module.exports = function (grunt) {
    'use strict';

    /* Grunt configuration. */
    grunt.initConfig({
        clean: {
            locales: ['src/locales/'],
            reset: ['debug']
        },
        compass: {
            dev: {
                options: {
                    cacheDir: 'debug/.sass-cache/',
                    cssDir: 'debug/stylesheets/',
                    debugInfo: true,
                    environment: 'development',
                    noLineComments: false,
                    sassDir: 'src/scss/',
                    sourcemap: true,
                    trace: true
                }
            }
        },
        connect: {
            dev: {
                options: {
                    base: 'debug/',
                    debug: true,
                    hostname: 'localhost',
                    index: 'index.html',
                    keepalive: true,
                    port: 9001
                }
            }
        },
        copy: {
            dev: {
                files: [
                    {
                        cwd: 'src/',
                        expand: true,
                        src: 'contents/**/*',
                        dest: 'debug/',
                        filter: 'isFile'
                    },
                    {
                        cwd: 'src/typescript/',
                        expand: true,
                        src: 'locales/**/*',
                        dest: 'debug/scripts/',
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
                            'i18next/**/*.js',
                            'jquery/dist/**/*.js',
                            'jquery-autosize/*.js',
                            'jquery-ui/*.js',
                            'ng-i18next/dist/*.js',
                            'requirejs/*.js'
                        ],
                        dest: 'debug/scripts/vendors/'
                    }
                ]
            },
            locales: {
                files: [
                    {
                        cwd: 'src/typescript/',
                        expand: true,
                        src: 'locales/**/*',
                        dest: 'debug/scripts/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        jade: {
            dev: {
                options: {
                    data: {
                        debug: true,
                        pretty: true
                    }
                },
                files: [{
                    cwd: 'src/templates/',
                    dest: 'debug/',
                    expand: true,
                    ext: '.html',
                    src: '**/*.jade'
                }]
            }
        },
        ts: {
            dev: {
                src: ['src/typescript/**/*.ts'],
                outDir: 'debug/scripts/',
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
            styles: {
                files: 'src/scss/**/*.scss',
                tasks: ['compass:dev']
            },
            views: {
                files: ['src/templates/**/*.jade'],
                tasks: ['jade:dev']
            }
        }
    });

    /* Dependencies. */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ts');

    /* Tasks. */
    grunt.registerTask('dev', ['jade:dev', 'compass:dev', 'ts:dev', 'copy:dev']);
};