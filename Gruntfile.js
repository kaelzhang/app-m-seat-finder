module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),

        tpl2mod: {
            html: {
                options: {
                    prefix:"module.exports= ",
                    suffix:";"
                },
                files: [{
                    expand: true,
                    cwd: "lib/template",
                    src: [ "*.html" ],
                    dest: "lib/view",
                    ext: '.html.js'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-tpl2mod');

    grunt.registerTask('default', ['tpl2mod']);
};