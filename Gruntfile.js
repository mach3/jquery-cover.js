
module.exports = function(grunt){

	require("load-grunt-tasks")(grunt);

	var banner = grunt.template.process(
		grunt.file.read("src/banner.js"),
		{data: grunt.file.readJSON("package.json")}
	);

	grunt.initConfig({
		uglify: {
			options: {
				banner: banner
			},
			build: {
				files: {
					"dist/jquery-cover.min.js": ["src/jquery-cover.js"]
				}
			}
		},
		concat: {
			options: {
				banner: banner
			},
			build: {
				files: {
					"dist/jquery-cover.js": ["src/jquery-cover.js"]
				}
			}
		}
	});

	grunt.registerTask("default", []);
	grunt.registerTask("build", [
		"concat:build",
		"uglify:build"
	]);

};