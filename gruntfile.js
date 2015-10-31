var modRewrite = require("connect-modrewrite");
module.exports = function(grunt) {
    grunt.initConfig({
        bower: {
            default: {
                dest: "dist/",
                js_dest: "dist/javascript/vendor/",
                css_dest: "dist/css/vendor/",
                fonts_dest: "dist/css/fonts/",
                options: {
                    keepExpandedHierarchy: false,
                    packageSpecific: {
                        "angular-bing-maps": {
                            files: [
                                "dist/*.js"
                            ]
                        },
                        "angular-chart.js": {
                            files: [
                                "dist/*.css",
                                "dist/*.js"
                            ]
                        },
                        "autosize": {
                            files: [
                                "dist/*.js"
                            ]
                        },
                        "css-spinners": {
                            files: [
                                "css/*.css"
                            ]
                        },
                        "Ionicons": {
                            files: [
                                "css/*.css",
                                "fonts/*.*"
                            ]
                        },
                        "jquery": {
                            files: [
                                "dist/*.js"
                            ]
                        },
                        "ng-i18next": {
                            files: [
                                "dist/*.js"
                            ]
                        }
                    }
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: "dist/**/*.*"
            },
            options: {
                server: {
                    baseDir: 'dist/',
                    middleware: [
                        modRewrite(['^[^\\.]*$ /index.html [L]'])
                    ]
                }
            }
        },
        compass: {
            default: {
                options: {
                    cacheDir: "dist/.sass-cache/",
                    cssDir: "dist/css/",
                    debugInfo: false,
                    environment: "development",
                    noLineComments: true,
                    sassDir: "src/scss/",
                    sourcemap: false,
                    trace: false
                }
            }
        },
        copy: {
            content: {
                expand: true,
                cwd: "src/content/",
                src: ['**/*', '!**/Thumbs.db'],
                dest: "dist/content/"
            },
            javascript: {
                expand: true,
                cwd: "src/javascript/",
                src: ['**/*', '!**/Thumbs.db'],
                dest: "dist/javascript/"
            }
        },
        jade: {
            compile: {
                files: [{
                    cwd: "src/",
                    dest: "dist/",
                    expand: true,
                    ext: ".html",
                    src: "**/*.jade"
                }]
            }
        },
        ts: {
            build: {
                src: ["src/typescript/**/*.ts", "!src/typescript/typing/**/*.ts"],
                outDir: "dist/javascript/",
                options: {
                    declaration: false,
                    failOnTypeErrors: false,
                    module: "amd",
                    removeComments: false,
                    sourceMap: false,
                    target: "es5"
                }
            }
        },
        watch: {
            content: {
                files: ["src/content/**/*.*", "!src/content/**/*.jade"],
                tasks: ["copy:content"]
            },
            javascript: {
                files: "src/javascript/**/*.*",
                tasks: ["copy:javascript"]
            },
            jade: {
                files: "src/**/*.jade",
                tasks: ["jade"]
            },
            scss: {
                files: "src/**/*.scss",
                tasks: ["compass"]
            },
            typescript: {
                files: "src/**/*.ts",
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-bower");
    grunt.loadNpmTasks("grunt-browser-sync");
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jade");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", ["compass", "jade", "ts", "copy:javascript", "copy:content", "bower"]);
    grunt.registerTask("server", ["browserSync"]);
};
