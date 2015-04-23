// https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
	css: {
		files: [
			{
				expand: true,
				flatten: true,
				cwd: '<%= paths.tmp %>',
				src: [
					'style*.css',
					'style*.map'
				],
				dest: '',
				filter: 'isFile'
			},
			{
				expand: true,
				flatten: true,
				cwd: '<%= paths.tmp %>',
				src: [
					'editor-style*.css',
					'editor-style*.map'
				],
				dest: 'css/',
				filter: 'isFile'
			}
		]
	},
	fonts: {
		files: [
			{
				expand: true,
				flatten: true,
				src: [
					'<%= paths.authorAssets %>fonts/**/*'
				],
				dest: 'fonts/'
			}
		]
	},
	php: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>includes',
				src: ['**/*'],
				dest: 'includes'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>',
				src: ['*.php'],
				dest: '<%= paths.theme%>'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>comment',
				src: ['**/*'],
				dest: 'comment'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>content',
				src: ['**/*'],
				dest: 'content'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>menu',
				src: ['**/*'],
				dest: 'menu'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>sidebar',
				src: ['**/*'],
				dest: 'sidebar'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>video',
				src: ['**/*'],
				dest: 'video'
			},
			{
				expand: true,
				cwd: '<%= paths.composer %>justintadlock/hybrid-core',
				src: ['**/*'],
				dest: '<%= paths.hybridCore %>'
			},
			{
				expand: true,
				cwd: '<%= paths.composer %>flagshipwp/flagship-library',
				src: ['**/*'],
				dest: 'includes/vendor/flagship-library'
			},
			{
				expand: true,
				cwd: '<%= paths.composer %>zamoose/themehookalliance',
				src: ['tha-theme-hooks.php'],
				dest: 'includes/vendor/'
			}
		]
	},
	images: {
		files: [
			{
				expand: true,
				flatten: true,
				cwd: '<%= paths.tmp %>images',
				src: ['*', '!screenshot.png'],
				dest: 'images',
				filter: 'isFile'
			},
			{
				expand: true,
				flatten: true,
				cwd: '<%= paths.tmp %>images',
				src: ['screenshot.png'],
				dest: '',
				filter: 'isFile'
			}
		]
	},
	languages: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.assets %><%= paths.languages %>',
				src: ['*.po'],
				dest: '<%= paths.theme%><%= paths.languages %>',
				filter: 'isFile'
			}
		]
	},
	bowercss: {
		files: [
			{
				expand: true,
				cwd: 'bower_components/wp-normalize.scss/',
				src: ['_wp-normalize.scss'],
				dest: '<%= paths.bower%>scss/'
			}
		]
	},
	bowerjs: {
		files: [
			{
				expand: true,
				flatten: true,
				cwd: 'bower_components/',
				src: [
					'skip-link-focus/skip-link-focus.js',
					'fitvids/jquery.fitvids.js',
					'accessible-menu/dist/jquery.accessible-menu.js',
					'sidr/jquery.sidr.min.js'
				],
				dest: '<%= paths.bower%>js/concat'
			}
		]
	},
	bowerfonts: {
		files: [
			{
				expand: true,
				flatten: true,
				cwd: 'bower_components/themicons/src/',
				src: ['**/*'],
				dest: '<%= paths.bower%>icons/webfont',
				rename: function( dest, src ) {
					'use strict';
					return dest + '/' + src.replace( 'themicons_', '' );
				}
			}
		]
	},
	disttheme: {
		files: [
			{
				expand: true,
				cwd: '<%= paths.theme%>',
				src: [
					'**',
					'.*',
					'**/*',
					'!.git/**',
					'!.sass-cache/**',
					'!assets/**',
					'!config/**',
					'!dist/**',
					'!logs/**',
					'!node_modules/**',
					'!tmp/**',
					'!*.sublime*',
					'!.DS_Store',
					'!.gitattributes',
					'!.gitignore',
					'!bower.json',
					'!composer.json',
					'!composer.lock',
					'!gruntfile.js',
					'!package.json',
					'!theme/**'
				],
				dest: '<%= paths.theme%>theme/<%= pkg.name %>'
			},
			{
				expand: true,
				cwd: '<%= paths.authorAssets %>',
				src: '.gitmodules',
				dest: '<%= paths.theme%>'
			}
		]
	},
	svgmin: {
		options: {
			plugins: [
				{
					removeViewBox: true
				}, {
					removeUselessStrokeAndFill: true
				}, {
					removeEmptyAttrs: true
				}
			]
		},
		files: [{
			expand: true,
			cwd: '<%= paths.assets %>theme/svg-uncompressed/',
			src: ['*.svg'],
			dest: '<%= paths.theme%>images/svg/'
		}]

	},
	grunticon: {
		files: [
		{
			expand: true,
			cwd: '<%= paths.theme%>images/svg/',
			src: ['*.svg', '*.png'],
			dest: '<%= paths.theme%>images/'
		}

		],
		options: {

			// CSS filenames
			datasvgcss: "icons.data.svg.css",
			datapngcss: "icons.data.png.css",
			urlpngcss: "icons.fallback.css",

			// preview HTML filename
			previewhtml: "preview.html",

			// grunticon loader code snippet filename
			loadersnippet: "grunticon.loader.js",

			// Include loader code for SVG markup embedding
			enhanceSVG: true,

			// Make markup embedding work across domains (if CSS hosted externally)
			corsEmbed: false,

			// folder name (within dest) for png output
			pngfolder: "png",

			// prefix for CSS classnames
			cssprefix: ".icon-",

			defaultWidth: "300px",
			defaultHeight: "200px",

			// define vars that can be used in filenames if desirable, like foo.colors-primary-secondary.svg
			colors: {
				primary: "red",
				secondary: "#666"
			},

			dynamicColorOnly: true,

			// css file path prefix - this defaults to "/" and will be placed before the "dest" path when stylesheets are loaded.
			// This allows root-relative referencing of the CSS. If you don't want a prefix path, set to to ""
			cssbasepath: "/",
			template: "example/default-css.hbs",
			previewTemplate: "example/preview-custom.hbs",
			compressPNG: true

		}
	}
};
