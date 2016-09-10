/**
 * This file/module contains all configurations for the build process.
 */

module.exports = {
	/**
	 * This is a collection of file patterns that refer to our app code.
	 * These file paths are used in the configuration of the build tasks.
	 */
	appFiles: {
		js: ['static/js/**/*.module.js', 'static/js/**/*.controller.js', 'static/js/**/*.js'],
		pug: 'templates/**/*.pug',
		stylus: 'static/styles/**/*.styl',
		compiledCss: ['static/external/roboto/*.css', 'compile/css/**/*.css']
	},
    livereloadPort: 35729
};
