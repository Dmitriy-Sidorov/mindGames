module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            style: {
                files: [
                    {
                        'styles/style.css': 'styles/style.scss'
                    }
                ]
            }
        },
        postcss: {
            prefix: {
                options: {
                    processors: [
                        require('autoprefixer')({
                            browsers: ['last 5 version', 'ie 9', 'ie 8']
                        })
                    ]
                },
                files: [
                    {
                        src: 'styles/style.css'
                    }
                ]
            },
            min: {
                options: {
                    processors: [
                        require('cssnano')
                    ]
                },
                files: [
                    {
                        src: 'dist/css/style.css',
                        dest: 'dist/css/style.min.css'
                    }
                ]

            }
        },
        cmq: {
            options: {
                log: false
            },
            your_target: {
                files: [
                    {
                        'dist/css/style.css': ['styles/style.css']
                    }
                ]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            basic_and_extras: {
                files: {
                    'dist/js/built.js': ['js/script.js']
                }
            }
        },
        uglify: {
            build: {
                src: 'dist/js/built.js',
                dest: 'dist/js/built.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'dist/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/build'
                }]
            }
        },
        watch: {
            html: {
                files: ['dist/*.html'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            css: {
                files: ['styles/*.scss'],
                tasks: ['style'],
                options: {
                    livereload: true,
                    spawn: false
                }
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: 'dist',
                    keepalive: true,
                    livereload: false,
                    open: true,
                    hostname: 'localhost'
                }
            }
        }
    });
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
    grunt.registerTask('default', [
        'style', 'scripts'
    ]);
    grunt.registerTask('style', [
        'sass:style',
        'postcss:prefix',
        'cmq',
        'postcss:min'
    ]);
    grunt.registerTask('scripts', ['concat', 'uglify']);
    grunt.registerTask('server', function () {
        return grunt.task.run(['connect:server'])
    });
};