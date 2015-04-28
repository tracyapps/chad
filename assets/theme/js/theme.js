/* global skipLinkFocus */
/**
 * JavaScript for ChadLawson
 *
 * Includes all JS which is required within all sections of the theme.
 */
window.chad = window.chad || {};
(function( window, $, undefined ) {
	'use strict';

	var $document = $( document ),
		$body = $( 'body' ),
		chad = window.chad;

	$.extend( chad, {

		//* Global script initialization
		globalInit: function() {
			var $videos = $( '#site-inner' );
			$body.addClass( 'ontouchstart' in window || 'onmsgesturechange' in window ? 'touch' : 'no-touch' );
			$document.gamajoAccessibleMenu();
			$document.chadMobileMenu();
			$videos.fitVids();
		}

	} );

	// Document ready.
	jQuery( function() {
		skipLinkFocus.init();
		chad.globalInit();
	} );

	$(function() {
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();

			if (scroll >= 100) {
				$('header').addClass('smaller');
			} else {
				$('header').removeClass('smaller');
			}
		});
	});
})( this, jQuery );

//savvor grid
(function() {
	'use strict';
	savvior.init('#blog-grid', {
		'screen and (max-width: 600px)': { columns: 1 },
		'screen and (min-width: 600px) and (max-width: 900px)': { columns: 2 },
		'screen and (min-width: 900px)': { columns: 3 }
	});
}());

// Simple elevator usage
var elevator = new Elevator({
	element: document.querySelector('.elevator'),
	mainAudio: the_base_theme_directory.theme_directory + '/includes/sounds/elevator-music.mp3',
	endAudio: the_base_theme_directory.theme_directory + '/includes/sounds/ding.mp3'
});
