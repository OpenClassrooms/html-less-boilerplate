module.exports = function(grunt) {

var HTTP_PORT = 8082,
    RELOAD_PORT = 1337,
    lessFiles = ['bower_components/normalize.css/normalize.css', './less/main.less'];

// Load Grunt tasks declared in the package.json file
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// Configure Grunt
grunt.initConfig({

    // Grunt express - our webserver
    // https://github.com/blai/grunt-express
    express: {
        all: {
            options: {
                bases: ['./build'],
                port: HTTP_PORT,
                hostname: "0.0.0.0",
                livereload: RELOAD_PORT
            }
        }
    },

    replace: {
        build: {
            src: ['build/*.html'],
            overwrite: true,
            replacements: [{
                from: '$BUILD_VERSiON$',
                to: Date.now()
            }]
        }
    },

    copy: {
        build: {
            files: [
                { cwd: './src', expand: true, src: ['**/*'], dest: './build/' }
            ]
        }
    },

    less: {
        dev: {
            files: {
                './build/css/main.css': lessFiles
            }
        },

        build: {
            options: {
                compress: true
            },
            files: {
                './src/css/main.css': lessFiles
            }
        }
    },

    // grunt-watch will monitor the projects files
    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
        all: {
                files: ['./src/**/*', './less/**/*'],
                tasks: ['devBuild'],
                options: {
                    livereload: RELOAD_PORT
            }
        }
    },

    // grunt-open will open your browser at the project's URL
    // https://www.npmjs.org/package/grunt-open
    open: {
        all: {
            path: 'http://localhost:' + HTTP_PORT + '/index.html'
        }
    }
});

grunt.registerTask('devBuild', ['copy', 'less:dev', 'replace']);
grunt.registerTask('build', ['copy', 'less:build', 'replace']);

// Creates the `server` task
grunt.registerTask('server', [
        'devBuild',
        'express',
        'open',
        'watch'
    ]);
};