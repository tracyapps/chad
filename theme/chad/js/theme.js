/*! Gamajo Accessible Menu - v1.0.0 - 2014-09-08
* https://github.com/GaryJones/accessible-menu
* Copyright (c) 2014 Gary Jones; Licensed MIT */
;(function( $, window, document, undefined ) {
  'use strict';

  var pluginName = 'gamajoAccessibleMenu',
    hoverTimeout = [];

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.opts = $.extend( {}, $.fn[pluginName].options, options );
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend( Plugin.prototype, {
    init: function() {
      $( this.element )
        .on( 'mouseenter.' + pluginName, this.opts.menuItemSelector, this.opts, this.menuItemEnter )
        .on( 'mouseleave.' + pluginName, this.opts.menuItemSelector, this.opts, this.menuItemLeave )
        .find( 'a' )
        .on( 'focus.'  + pluginName + ', blur.' + pluginName, this.opts, this.menuItemToggleClass );
    },

    /**
     * Add class to menu item on hover so it can be delayed on mouseout.
     *
     * @since 1.0.0
     */
    menuItemEnter: function( event ) {
      // Clear all existing hover delays
      $.each( hoverTimeout, function( index ) {
        $( '#' + index ).removeClass( event.data.hoverClass );
        clearTimeout( hoverTimeout[index] );
      });
      // Reset list of hover delays
      hoverTimeout = [];

      $( this ).addClass( event.data.hoverClass );
    },

    /**
     * After a short delay, remove a class when mouse leaves menu item.
     *
     * @since 1.0.0
     */
    menuItemLeave: function( event ) {
      var $self = $( this );
      // Delay removal of class
      hoverTimeout[this.id] = setTimeout( function() {
        $self.removeClass( event.data.hoverClass );
      }, event.data.hoverDelay );
    },

    /**
     * Toggle menu item class when a link fires a focus or blur event.
     *
     * @since 1.0.0
     */
    menuItemToggleClass: function( event ) {
      $( this ).parents( event.data.menuItemSelector ).toggleClass( event.data.hoverClass );
    }
  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[ pluginName ] = function( options ) {
    this.each( function() {
      if ( ! $.data( this, 'plugin_' + pluginName ) ) {
        $.data( this, 'plugin_' + pluginName, new Plugin( this, options ) );
      }
    });

    // chain jQuery functions
    return this;
  };

  $.fn[ pluginName ].options = {
    // The CSS class to add to indicate item is hovered or focused
      hoverClass: 'menu-item-hover',

      // The delay to keep submenus showing after mouse leaves
      hoverDelay: 250,

      // Selector for general menu items. If you remove the default menu item
      // classes, then you may want to call this plugin with this value
      // set to something like 'nav li' or '.menu li'.
      menuItemSelector: '.menu-item'
  };
})( jQuery, window, document );

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = $(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/**
 * Skip Link Focus v0.1.0
 * https://github.com/cedaro/skip-link-focus
 *
 * @copyright Modifications Copyright (c) 2015 Cedaro, LLC
 * @license BSD-3-Clause
 */

/**
 * Make "skip to content" links work correctly in IE9, Chrome, and Opera to
 * improve accessibility.
 *
 * @link http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
 */
(function( root, factory ) {
	'use strict';

	if ( 'function' === typeof define && define.amd ) {
		define( [], factory );
	} else if ( 'object' === typeof exports ) {
		module.exports = factory();
	} else {
		root.skipLinkFocus = factory();
	}
}( this, function() {
	'use strict';

	function init() {
		if ( window && /webkit|opera|msie/i.test( window.navigator.userAgent ) && window.addEventListener ) {
			var i,
				skipLinks = window.document.querySelectorAll( '.skip-link' );

			window.addEventListener( 'hashchange', function() {
				skipToElement( location.hash.substring( 1 ) );
			}, false );

			// Fix for when the address bar already contains a hash.
			for ( i = 0; i < skipLinks.length; ++i ) {
				skipLinks[ i ].addEventListener( 'click', skipLinkClickHandler );
			}
		}
	}

	function skipLinkClickHandler( e ) {
		skipToElement( e.target.hash.substring( 1 ) );
	}

	function skipToElement( id ) {
		var element;

		if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
			return;
		}

		element = window.document.getElementById( id );

		if ( element ) {
			if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) {
				element.tabIndex = -1;
			}

			element.focus();
		}
	}

	return {
		init: init,
		skipToElement: skipToElement
	};
}));

var Elevator=function(){"use strict";function n(n,e){for(var t in e)t in n||(n[t]=e[t]);return n}function e(n,e,t,u){return n/=u/2,1>n?t/2*n*n+e:(n--,-t/2*(n*(n-2)-1)+e)}function t(n){p||(p=n);var u=n-p,o=e(u,v,-v,A);window.scrollTo(0,o),A>u?s=requestAnimationFrame(t):i()}function u(){w||(w=!0,v=document.documentElement.scrollTop||m.scrollTop,f||(A=1.5*v),requestAnimationFrame(t),c&&c.play())}function o(){p=null,v=null,w=!1}function i(){o(),c&&(c.pause(),c.currentTime=0),d&&d.play()}function r(){w&&(cancelAnimationFrame(s),o(),c&&(c.pause(),c.currentTime=0),window.scrollTo(0,0))}function l(n){n.addEventListener("click",u,!1)}function a(n){m=document.body,n.element&&l(n.element),n.duration&&(f=!0,A=n.duration),n.mainAudio&&(c=new Audio(n.mainAudio),c.setAttribute("preload","true"),c.setAttribute("loop","true")),n.endAudio&&(d=new Audio(n.endAudio),d.setAttribute("preload","true")),window.addEventListener("blur",r,!1)}var c,d,m=null,s=null,A=null,f=!1,p=null,v=null,w=!1;return n(a,{elevate:u})}();
/**
 * ChadLawson Mobile Menu
 *
 * Merge existing menus into an a11y-compliant off-canvas mobile menu.
 *
 * @version   0.1.0
 * @copyright 2015 Flagship Software, LLC;
 * @license   MIT
 */
(function( $, undefined ) {
	'use strict';

	var $$,
		cache = {};

	$$ = function( selector ) {
		var temp = cache[selector];
		if( temp !== undefined ) {
			return temp;
		}
		return cache[selector] = $( selector );
	};

	$$.clear = function( selector ) {
		cache[selector] = undefined;
	};

	$$.fresh = function( selector ) {
		cache[selector] = undefined;
		return $$( selector );
	};

	$.fn.chadMobileMenu = function() {
		var $menuButton = $$( '<button type="button" id="menu-toggle" class="menu-button" aria-expanded="false"></button>' ),
			$mobileMenu = $$( '#menu-primary' ),
			menuClass = 'menu-primary';

		// Return early if we don't have any menus to work with.
		if( 0 === $$( '#menu-primary' ).length && 0 === $$( '#menu-secondary' ).length ) {
			return;
		}

		// Use the secondary menu as the mobile menu if we don't have a primary.
		if( 0 === $$( '#menu-primary' ).length ) {
			$mobileMenu = $$( '#menu-secondary' );
			menuClass = 'menu-secondary';
		}

		/**
		 * Helper function to check whether or not the mobile menu is currently
		 * open and visible.
		 *
		 * @since  0.1.0
		 * @return {Boolean} Returns true if the menu is open.
		 */
		function menuIsOpen() {
			if( $$( 'body' ).hasClass( 'menu-open' ) ) {
				return true;
			}
			return false;
		}

		/**
		 * Helper function to check whether or not our existing menus have been
		 * merged into a single menu for mobile display.
		 *
		 * @since  0.1.0
		 * @return {Boolean} Returns true if the menus have been merged.
		 */
		function menusMerged() {
			if( 0 === $$.fresh( '#menu-primary #secondary' ).length ) {
				return false;
			}
			return true;
		}

		/**
		 * Prepare our mobile menu by merging our existing menus together if we
		 * have more than one.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function mergeMenus() {
			if( 0 === $$( '#menu-primary' ).length || 0 === $$( '#menu-secondary' ).length ) {
				return;
			}
			if( ! menusMerged() && ! menuIsOpen() ) {
				$$( '#menu-secondary .nav-menu' ).appendTo( '#menu-primary .nav-menu' );
			}
		}

		/**
		 * If we have two menus which have been merged, this will split them
		 * back into two separate menus using the same format as before they
		 * were merged.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function splitMenus() {
			if( 0 === $$( '#menu-secondary' ).length || 0 === $$( '#menu-primary #secondary' ).length ) {
				return;
			}
			$$( '#menu-primary #secondary' ).appendTo( '#menu-secondary .wrap' );
		}

		/**
		 * This will toggle all classes related to a menu being in an open or
		 * closed state except for the body class as it is used as a guide for
		 * whether or not the mobile menu has been opened.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function toggleClasses() {
			$mobileMenu.toggleClass( menuClass + ' menu-mobile visible' );
			$menuButton.toggleClass( 'activated' );
		}

		/**
		 * This will toggle all attributes related to a menu being in an open or
		 * closed state. Most of these changes are made for a11y reasons.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function toggleAttributes() {
			$menuButton.attr( 'aria-expanded', function( index, attr ) {
				return attr === 'false' ? 'true' : 'false';
			} );
			if( $mobileMenu.attr( 'tabindex' ) ) {
				$mobileMenu.removeAttr( 'tabindex' );
			} else {
				$mobileMenu.attr( 'tabindex', '0' );
			}
		}

		/**
		 * This forces the focus state of either the mobile menu or the menu
		 * button when a user is tabbing through the mobile menu. When a user
		 * opens the mobile menu, it is given the focus so keyboard navigation
		 * will work as expected while the user tabs through the menu items.
		 *
		 * When a user tabs out of either the beginning or end of the menu,
		 * focus is be restored to the mobile menu button so the menu can be
		 * closed by pressing enter.
		 *
		 * @since  0.1.0
		 * @todo   Maybe split this into multiple functions
		 * @return {booleen} false when focus has been changed.
		 */
		function focusMobileMenu() {
			var nav = $mobileMenu[0],
				navID = $mobileMenu.attr( 'id' ),
				$items = $$( '#' + navID + ' a' ),
				$firstItem = $items.first(),
				$lastItem = $items.last();

			$mobileMenu.focus();

			$mobileMenu.on( 'keydown', function( e ) {
				// Return early if we're not using the tab key.
				if( 9 !== e.keyCode ) {
					return;
				}
				// Tabbing forwards and tabbing out of the last link.
				if( $lastItem[0] === e.target && ! e.shiftKey ) {
					$menuButton.focus();
					return false;
				}
				// Tabbing backwards and tabbing out of the first link or the menu.
				if( ( $firstItem[0] === e.target || nav === e.target ) && e.shiftKey ) {
					$menuButton.focus();
					return false;
				}
			} );

			$menuButton.on( 'keydown', function( e ) {
				// Return early if we're not using the tab key.
				if( 9 !== e.keyCode ) {
					return;
				}
				if( menuIsOpen() && $menuButton[0] === e.target && ! e.shiftKey ) {
					$firstItem.focus();
					return false;
				}
			} );
		}

		/**
		 * This fires all methods required to open the mobile menu.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function openMenu() {
			if( menuIsOpen() ) {
				return;
			}
			if( ! menusMerged() ) {
				mergeMenus();
			}
			toggleClasses();
			toggleAttributes();
			focusMobileMenu();
		}

		/**
		 * This fires all methods required to close the mobile menu.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function closeMenu() {
			if( ! menuIsOpen() ) {
				return;
			}
			if( menusMerged() && window.innerWidth < 1023 ) {
				splitMenus();
			}
			toggleClasses();
			toggleAttributes();
		}

		/**
		 * This will either split or merge our existing menus based on screen
		 * width. It will also force the menu to close if the screen is larger
		 * than the specified width for a mobile menu to be displayed.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function reflowMenus() {
			if( window.innerWidth >= 1023 ) {
				if( menusMerged() ) {
					splitMenus();
				}
				closeMenu();
				$$( 'body' ).removeClass( 'menu-open' );
			}

			if( window.innerWidth < 1023 && ! menusMerged() ) {
				mergeMenus();
			}
		}

		/**
		 * This fires all methods required to either open or close the mobile
		 * menu. It is meant to be attached to a click or touch event.
		 *
		 * @since  0.1.0
		 * @param {object} event The current event being fired.
		 * @return void
		 */
		function toggleMenu( event ) {
			event.preventDefault();
			openMenu();
			closeMenu();
			$$( 'body' ).toggleClass( 'menu-open' );
		}

		/**
		 * This is the final method which actually loads all of our mobile
		 * menu functionality. It merges our menus on load if the user is on a
		 * screen small enough for a mobile menu, injects our menu button, and
		 * handles the opening and closing of the menu as-needed.
		 *
		 * @since  0.1.0
		 * @return void
		 */
		function loadMobileMenu() {
			$$( '#branding' ).after( $menuButton );
			$menuButton.on( 'click', toggleMenu );
			$$( window ).resize( reflowMenus );
			$$( window ).trigger( 'resize' );
		}

		loadMobileMenu();
	};
}( jQuery ));

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