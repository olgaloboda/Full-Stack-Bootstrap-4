'use strict'

module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/styles.css': 'css/styles.scss'
				}
			}
		},
		watch: {
			files: 'css/*.scss',
			tasks: ['sass']
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './'
					}
				}
			}
		},
		copy: {
            html: {
                files: [
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]                
            },
            fonts: {
                files: [
                {
                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean: {
            build: {
                src: [ 'dist/']
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  
                    cwd: './',                   
                    src: ['img/*.{png,jpg,gif}'],   
                    dest: 'dist/'                 
                }]
            }
        },

        useminPrepare: {
        	foo: {
        		dest: 'dist',
        		src: ['contactus.html', 'aboutus.html', 'index.html']
        	},
        	options: {
        		flow: {
        			steps: {
        				css: ['cssmin'],
        				js: ['uglify']
        			},
        			post: {
        				css: [{
        					name: 'cssmin',
        					createConfig: function(context, block) {
        						var generated = context.options.generated;
        						generated.option = {
        							keepSpecialComments: 0,
        							rebase: false
        						}
        					}
        				}]
        			}
        		}
        	}
        },

        concat: {
        	options: {
        		separator: ';'
        	},
        	dist: {}
        },

        uglify: {
        	dist: {}
        },

        cssmin: {
        	dist: {}
        },

        filerev: {
        	options: {
        		encoding: 'utf8',
        		algorithm: 'md5',
        		length: 20
        	},
        	release: {
        		files: [{
        			src: ['dist/css/*.css', 'dist/js/*.js']
        		}]
        	}
        },

        usemin: {
        	html: ['dist/contactus.html', 'dist/aboutsus', 'dist/index.html'],
        	options: {
        		assetsDir: ['dist', 'dist/css', 'dist/js']
        	}
        }

	});

	grunt.registerTask('css',['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
	]);
}