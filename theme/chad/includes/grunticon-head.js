
// call grunticon
var cb = function() {
	grunticon.svgLoadedCallback();
	if( grunticon.method ) {
		window.document.documentElement.className += ' grunticon-' + grunticon.method;
	}
};
grunticon(['wp-content/themes/chad/images/icons.data.svg.css', 'wp-content/themes/chad/images/icons.data.png.css', 'wp-content/themes/chad/images/icons.fallback.css'], grunticon.svgLoadedCallback );
