/*jshint expr:true*/
/*global module:false, process:false*/
module.exports = function (grunt) {

	require('matchdep').filterDev(['grunt-*']).forEach( grunt.loadNpmTasks );

	var cfg = grunt.file.readJSON('./Grunt-cfg.json');
	cfg.pkg = grunt.file.readJSON('./package.json');

	grunt.initConfig(cfg);

	// WORKFLOW
	grunt.registerTask('watch-src', ['jshint', 'complexity', 'requirejs:amd', 'requirejs:wrapped', 'regex-replace', 'clean:build', 'uglify']);

	// BUILD
	grunt.registerTask('validate', ['jshint', 'complexity', 'filenames']);
	grunt.registerTask('fullcss', ['less:build', 'less:compile', 'less:compilemin', 'file_append', 'wiredep', 'less:compile_dist', 'less:compile_dist_min']);
	grunt.registerTask('fullbuild', ['clean:prebuild', 'requirejs:amd', 'requirejs:wrapped', 'regex-replace', 'fullcss', 'imagemin', 'copy:images', 'clean:build', 'uglify', 'compress']);

	// TESTING
	grunt.registerTask('quicktest', ['express', 'blanket_qunit:simple']);
	grunt.registerTask('fulltest', ['express', 'blanket_qunit:full']);
	grunt.registerTask('server', ['express', 'express-keepalive']);
	grunt.registerTask('teamcity', ['default']);

	// DEFAULT WILL RUN IF GRUNT IS CALLED WITHOUT A TASK PARAMETER
	grunt.registerTask('default', ['validate', 'fullbuild', 'fulltest']);
};
