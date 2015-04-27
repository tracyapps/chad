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

/*!
 * parallax.js v1.3.1 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2015 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                 || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');
    this.$slider = $('<img />').prependTo(this.$mirror);

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop < scrollBottom) {
        this.visibility = 'visible';
      } else {
        this.visibility = 'hidden';
      }
      this.mirrorTop = this.boxOffsetTop  - scrollTop;
      this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
      this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      $win.on('resize.px.parallax load.px.parallax', function() {
          Parallax.winHeight = $win.height();
          Parallax.winWidth  = $win.width();
          Parallax.docHeight = $doc.height();
          Parallax.docWidth  = $doc.width();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
          var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
          Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  $win.scrollTop()));
          Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
          Parallax.overScroll = Math.max($win.scrollTop() - scrollTopMax, Math.min($win.scrollTop(), 0));
          Parallax.requestRender();
        });

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      if (typeof option == 'string') {
        Parallax[option]();
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('savvior', ["enquire"], function (a0) {
      return (root['new GridDispatch()'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("enquire.js"));
  } else {
    root['savvior'] = factory(enquire);
  }
}(this, function (enquire) {

/**
 * CustomEvent polyfill
 */
if (typeof window.CustomEvent !== 'function') {
  (function() {
    function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    window.CustomEvent = CustomEvent;

    CustomEvent.prototype = window.CustomEvent.prototype;
  }());
}
/**
 * requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 *
 * @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * @see http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 * @license MIT
 */
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());
/*jshint unused:false */

function addToDataset(element, key, value, forceCompat) {
  // Use dataset property or a fallback if unsupported.
  if (forceCompat || !element.dataset) {
    element.setAttribute('data-' + key, value);
  }
  else {
    element.dataset[key] = value;
  }

  return;
}

/**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 * @param scope
 */
function each(collection, fn, scope) {
  var i = 0,
    cont;

  for (i; i < collection.length; i++) {
    cont = fn.call(scope, collection[i], i);
    if (cont === false) {
      break; //allow early exit
    }
  }
}

/**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
function isFunction(target) {
  return typeof target === 'function';
}

/**
 * Helper function to determine if an object or array is empty.
 *
 * @param  {[type]}  obj The object or array to check.
 * @return {Boolean}     TRUE if empty, FALSE if not.
 */
function isEmpty(obj, p) {
  for (p in obj) {
    return !1;
  }
  return !0;
}
/**
 * Implements the grid element and its internal manipulation features
 *
 * @param {Object} Grid
 * @param {String} Grid.columns  Stores the current number of columns
 * @param {Object} Grid.element  Stores the DOM object of the grid element
 * @param {Boolean} Grid.status  Pointer to maintain the Grid status
 * @constructor
 */
var Grid = function(element) {
  this.columns = null;
  this.element = element;
  this.filtered = document.createDocumentFragment();
  this.status = false;
};

/**
 * Set up the grid element and add columns
 *
 * @param  {Object}   options   Object containing configuration options.
 *                              Currently `columns` and `filter` are supported.
 * @param  {Function} callback  Optional. Callback function to call when done
 */
Grid.prototype.setup = function(options, callback) {
  // Run this only once on a grid.
  if (this.status) {
    return false;
  }

  // Retrieve the list of items from the grid itself.
  var range = document.createRange();
  var items = document.createElement('div');

  range.selectNodeContents(this.element);
  items.appendChild(range.extractContents());

  window.requestAnimationFrame(function() {
    addToDataset(items, 'columns', 0);

    this.addColumns(items, options);
    this.status = true;

    isFunction(callback) && callback.call(this);
  }.bind(this));
};

/**
 * Create columns with the configured classes and add a list of items to them.
 */
Grid.prototype.addColumns = function(items, options) {
  var columnClasses = ['column', 'size-1of'+ options.columns];
  var columnsFragment = document.createDocumentFragment();
  var columnsItems = [];
  var i = options.columns;
  var childSelector;
  var column, rowsFragment;

  // Filter out items when a filter is given.
  this.filterItems(items, options.filter);

  while (i-- !== 0) {
    childSelector = '[data-columns] > *:nth-child(' + options.columns + 'n-' + i + ')';
    columnsItems.push(items.querySelectorAll(childSelector));
  }

  each(columnsItems, function(rows) {
    column = document.createElement('div');
    rowsFragment = document.createDocumentFragment();

    column.className = columnClasses.join(' ');

    each(rows, function(row) {
      rowsFragment.appendChild(row);
    });
    column.appendChild(rowsFragment);
    columnsFragment.appendChild(column);
  });

  this.element.appendChild(columnsFragment);
  addToDataset(this.element, 'columns', options.columns);
  this.columns = options.columns;
};

/**
 * Filter items in a grid
 *
 * @param  {[type]} items  [description]
 * @param  {[type]} filter [description]
 * @return {[type]}        [description]
 */
Grid.prototype.filterItems = function(items, filter) {
  if (!filter) {
    return items;
  }

  var index, filtered, nodeList;

  nodeList = Array.prototype.slice.call(items.children);
  filtered = items.querySelectorAll('[data-columns] > ' + filter);
  each(filtered, function(item) {
    index = (nodeList.indexOf(item));
    this.filtered.appendChild(item);
    addToDataset(item, 'position', index);
  }, this);

  return items;
};

/**
 * Remove all the columns from a grid and prepare it for populating again.
 *
 * @param  Object grid The grid element object
 * @return Object      A list of items sorted by the ordering of columns
 */
Grid.prototype.removeColumns = function() {
  var range = document.createRange();
  var container = document.createElement('div');
  var sortedRows = [];
  var columns;

  range.selectNodeContents(this.element);

  columns = Array.prototype.filter.call(range.extractContents().childNodes, function filterElements(node) {
    return node instanceof window.HTMLElement;
  });

  sortedRows.length = columns[0].childNodes.length * columns.length;

  each(columns, function iterateColumns(column, columnIndex) {
    each(column.children, function iterateRows(row, rowIndex) {
      sortedRows[rowIndex * columns.length + columnIndex] = row;
    });
  });

  addToDataset(container, 'columns', 0);

  sortedRows.filter(function(child) {
    return !!child;
  })
  .forEach(function(child) {
    container.appendChild(child);
  });

  return container;
};

/**
 * Remove all the columns from the grid, and add them again if the number of
 * columns have changed.
 *
 * @param  {[type]}   newColumns The number of columns to transform the Grid
 *   element to.
 * @param  {Function} callback   Optional. Callback function to call when done
 * @return {[type]}              [description]
 */
Grid.prototype.redraw = function(newOptions, callback) {
  var evt = new CustomEvent('savvior:redraw', {
    detail: {
      element: this.element,
      from: this.columns,
      to: newOptions.columns,
      filter: newOptions.filter || null
    }
  });
  var items;

  window.requestAnimationFrame(function() {
    if (this.columns !== newOptions.columns) {
      items = this.restoreFiltered(this.removeColumns());
      this.addColumns(items, newOptions);
    }

    window.dispatchEvent(evt);
    isFunction(callback) && callback(this);
  }.bind(this));
};

/**
 * Restore filtered items in a grid
 *
 * @param  {[type]} container [description]
 * @return {[type]}           [description]
 */
Grid.prototype.restoreFiltered = function(container) {
  if (this.filtered.childNodes.length === 0) {
    return container;
  }

  var allItems = container;
  var pos;

  each(this.filtered.querySelectorAll('[data-position]'), function(item) {
    pos = Number(item.getAttribute('data-position'));
    item.removeAttribute('data-position');
    // Insert the element back to its original position. ReferenceNode is now
    // set to null if the element should become the last one.
    allItems.insertBefore(item, (allItems.children[pos] || null));
  });

  return container;
};

/**
 * Restore the Grid element to its original state
 *
 * @param  {Function} callback  Optional. Callback function to call when done
 */
Grid.prototype.restore = function(callback, scope) {
  if (!this.status) {
    isFunction(callback) && callback(false);
    return false;
  }

  var fragment = document.createDocumentFragment();
  var children = [];
  var container;
  var evt = new CustomEvent('savvior:restore', {
    detail: {
      element: this.element,
      from: this.columns
    }
  });

  window.requestAnimationFrame(function() {
    container = this.restoreFiltered(this.removeColumns());

    each(container.childNodes, function(item) {
      children.push(item);
    });

    children.forEach(function(child) {
      fragment.appendChild(child);
    });

    this.element.appendChild(fragment);
    this.element.removeAttribute('data-columns');

    window.dispatchEvent(evt);
    isFunction(callback) && callback.call(scope, scope || this);
  }.bind(this));
};
/* global Grid: true */
/**
 * Implements the handling of a grid element.
 *
 * This performs operations via registered enquire handlers
 *
 * @param {Object} GridHandler
 * @param {String} GridHandler.selector Stores the selector of the Grid
 *   instance element
 * @param {Object} GridHandler.options  Defines the number of columns a grid
 *   should have for each media query registered
 * @param {Array} GridHandler.queryHandlers  Stores all registered enquire
 *   handlers so they are unregisterable
 * @param {Object} GridHandler.grid  The Grid object reference
 * @param {Boolean} GridHandler.ready  Pointer to maintain the Grid status
 * @constructor
 */
var GridHandler = function(selector, options) {
  this.selector = selector;
  this.options = options;
  this.queryHandlers = [];
  this.grids = [];
  this.ready = false;
};

/**
 * Register the Grid object instances and their enquire handlers.
 */
GridHandler.prototype.register = function() {
  each(document.querySelectorAll(this.selector), function(el) {
    this.grids.push(new Grid(el, this.options));
  }, this);

  for (var mq in this.options) {
    this.queryHandlers.push(this.constructHandler(mq, this.options[mq]));
  }

  each(this.queryHandlers, function(h) {
    enquire.register(h.mq, h.handler);
  });

  this.ready = true;

  return this;
};

/**
 * Helper function to construct enquire handler objects
 *
 * @param  {String} mq The media query to register
 * @return {Object}    The handler object containing this.handler to
 *   register with enquire
 */
GridHandler.prototype.constructHandler = function(mq) {
  return {
    mq: mq,
    handler: {
      deferSetup: true,

      setup: function() {
        this.gridSetup(mq);
      }.bind(this),

      match: function() {
        this.gridMatch(mq);
      }.bind(this),

      destroy: function() {
        return;
      }
    }
  };
};

/**
 * Enquire setup callback
 *
 * @param  {[type]} mq The current query
 */
GridHandler.prototype.gridSetup = function(mq) {
  var evt;

  each(this.grids, function(grid) {
    grid.setup(this.options[mq], function() {
      evt = new CustomEvent('savvior:setup', {
        detail: {
          element: grid.element,
          columns: grid.columns,
          filter: this.filter
        }
      });
      window.dispatchEvent(evt);
    });
  }, this);
};

/**
 * Enquire match callback
 *
 * @param  {[type]} mq The current query
 */
GridHandler.prototype.gridMatch = function(mq) {
  var evt;

  each(this.grids, function(grid) {
    evt = new CustomEvent('savvior:match', {
      detail: {
        element: grid.element,
        from: grid.columns,
        to: this.options[mq].columns,
        query: mq
      }
    });

    grid.redraw(this.options[mq], function() {
      window.dispatchEvent(evt);
    });
  }, this);
};

/**
 * Restore the grid to its original state.
 *
 * This unregisters any previously registered enquire handlers and clears up
 * the object instance
 */
GridHandler.prototype.unregister = function(callback, scope) {
  each(this.queryHandlers, function(h) {
    enquire.unregister(h.mq);
  });

  each(this.grids, function(grid) {
    grid.restore(function() {
      // Cleanup
      this.queryHandlers = [];
      this.ready = false;

      isFunction(callback) && callback.call(this, scope || this);
    }, this);
  }, this);

  this.grids = [];
};
/* global GridHandler: true */
/**
 * Implements the top level registration of grid handlers and manages their
 * states.
 *
 * @param {Object} GridDispatch.grids  Collection of grid handlers
 * @constructor
 */
var GridDispatch = function() {
  if (!enquire) {
    throw new Error('enquire.js not present, please load it before calling any methods');
  }

  this.grids = {};
};

/**
 * Registers a single grid handler
 *
 * @param  {String} selector The selector of the grid element
 * @param  {Object} options  Defines the number of columns a grid should have
 *   for each media query registered.
 * @return {Object}          The dispatch object instance
 */
GridDispatch.prototype.init = function(selector, options) {
  if (!selector) {
    throw new TypeError('Missing selector');
  }

  if (typeof selector !== 'string') {
    throw new TypeError('Selector must be a string');
  }

  if (typeof options !== 'object') {
    throw new TypeError('Options must be an object');
  }

  // Prevent setting up the same grid selector more than once.
  if (this.grids[selector]) {
    return this;
  }

  // Do not act if element cannot be found.
  if (document.querySelectorAll(selector).length < 1) {
    return this;
  }

  // Construct GridHandlers and register them.
  this.grids[selector] = new GridHandler(selector, options);
  this.grids[selector].register(options);

  // Dispatch event.
  window.dispatchEvent(new CustomEvent('savvior:init'));

  return this;
};

/**
 * Restores one or all of the grids into their original state
 *
 * @param  {Array} selector     The selectors of the grids to destroy as given
 *   during the init call.
 * @param  {Function} callback  Optional. Callback function to call when done
 */
GridDispatch.prototype.destroy = function(selectors, callback) {
  var evt = new CustomEvent('savvior:destroy');
  var grids = (selectors === undefined || isEmpty(selectors)) ? Object.keys(this.grids) : selectors;
  var total = grids.length;
  var counter = 0;
  var done = function(args) {
    delete this.grids[grids[counter]];
    if (++counter === total) {
      window.dispatchEvent(evt);
      isFunction(callback) && callback.call(args, this);
    }
  }.bind(this);

  each(grids, function(selector) {
    (this.grids[selector]) && this.grids[selector].unregister(done);
  }, this);
};

/**
 * Tells if one or all the grids are initialised
 *
 * @param  {String} selector Optional. The selector of the grid used in init()
 * @return {Boolean}         If selector is given, returns a boolean value, or
 *   undefined if selector does not exist. If called without an argument, an
 *   array of ready grids is returned.
 */
GridDispatch.prototype.ready = function(selector) {
  if (selector === undefined) {
    var grids = [];
    for (var key in this.grids) {
      (this.grids[key].ready) && grids.push(key);
    }
    return (grids.length > 0) ? grids : false;
  }

  return (this.grids[selector]) ? this.grids[selector].ready : false;
};

return new GridDispatch();

}));

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

//savvor grid
(function() {
	'use strict';
	savvior.init('#blog-grid', {
		'screen and (max-width: 600px)': { columns: 1 },
		'screen and (min-width: 600px) and (max-width: 900px)': { columns: 2 },
		'screen and (min-width: 900px)' : { columns: 3 }
	});
}());

// Simple elevator usage
var elevator = new Elevator({
	element: document.querySelector('.elevator'),
	mainAudio: the_base_theme_directory.theme_directory + '/includes/sounds/elevator-music.mp3',
	endAudio: the_base_theme_directory.theme_directory + '/includes/sounds/ding.mp3'
});
