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

// Simple elevator usage.
var elementButton = document.querySelector('.elevator');
var Elevator;
new Elevator({
	element: elementButton,
	mainAudio: the_base_theme_directory.theme_directory + '/includes/sounds/elevator-music.mp3', // Music from http://www.bensound.com/
	endAudio: the_base_theme_directory.theme_directory + '/includes/sounds/ding.mp3' // Music from http://www.bensound.com/
});