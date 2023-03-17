const sass = require('sass');

module.exports = {
	process(src, filename) {
		if (filename.match(/\.scss$/) != null) {
			const result = sass.renderSync({ file: filename });
			return result.css.toString();
		}

		return '';
	},
};

