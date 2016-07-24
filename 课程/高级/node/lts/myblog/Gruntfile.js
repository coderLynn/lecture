module.exports = function (grunt) {
    /*项目配置*/
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        less:{
            compress:{
                file:{
                        'public/stylesheets/default.css':'app/css/*.less'
                }
            },
            yuicompress:{
                files:{
                    'public/stylesheets/<%=pkg.name%>.min.css':'public/stylesheets/default.css'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/js/*.js'],
                dest: 'public/javascripts/<%=pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist:{
                files:{
                    'public/javascripts/<%=pkg.name%>.min.js':['<%=concat.dist.dest%>']
                }
            }
        },
        qunit:{
            files:['views/*.jade']
        },
        jshint:{
            files:['Gruntfile','app/js/*.js'],
            options:{
                globals:{
                    jQuery:true,
                    console:true,
                    module:true,
                    document:true
                }
            }
        },
        watch:{
            files:['<%=jshint.files%>'],
            tasks:['jshint','qunit']
        }
    });

    /*加载模块*/
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    /*注册事件*/
    grunt.registerTask('test',['jshint','qunit']);

    grunt.registerTask('default',['jshint','qunit','concat','uglify']);
}