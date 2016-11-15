module.exports = function(grunt) {
    //grunt wrapper function
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            clean: ['./build/*', './dist/*']
        },

        copy: {
            font: {
                expand: true,
                cwd: './app/shared/font',
                src: ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
                dest: './dist/'
            },
            node_modules: {
                expand: true,
                cwd: './node_modules/',
                flatten: true,
                src: ['bootstrap/dist/css/bootstrap.min.css'],
                dest: './dist/'
            },
            views: {
                expand: true,
                cwd: './app/',
                src: ['**/*.html', '**/*.css', '**/*.png', '**/*.ejs'],
                flatten: true,
                dest: './dist/'
            },
            js: {
                expand: true,
                cwd: './app/',
                src: ['server.js'],
                flatten: true,
                dest: './dist/'

            }
        },

        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {
                            presets: ['es2015', 'react']
                        }]
                    ]
                },
                src: ['app/app-client.js'],
                dest: 'dist/app.js',
            }
        },

        watch: {
            browserify: {
                files: ['app/**/*.jsx'],
                tasks: ['browserify']
            },
            views:{
                files: ['app/**/*.css', 'app/**/*.html'],
                tasks: ['copy:views']
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'dist/**'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './dist'
                }
            }
        }
    });


    //load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');

    //register grunt default task
    grunt.registerTask('heroku', ['clean', 'copy', 'browserify']);
    grunt.registerTask('test', ['clean', 'copy']);
    grunt.registerTask('default', ['clean', 'copy', 'browserify']);
    grunt.registerTask('dev', ['clean', 'copy', 'browserify', 'browserSync', 'watch']);
}
