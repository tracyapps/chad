<?php
/**
 * Script and Style Loaders and Related Functions.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */

add_action ( 'admin_init', 'chad_add_editor_styles' );
/**
 * Replace the default theme stylesheet with a RTL version when a RTL
 * language is being used.
 *
 * @since  1.2.0
 * @access public
 * @return void
 */
function chad_add_editor_styles ()
{
	// Set up editor styles
	$editor_styles = array (
		'//fonts.googleapis.com/css?family=Raleway:400,600|Lato:400,400italic,700',
		'css/editor-style.css',
	);

	// Add the editor styles.
	add_editor_style ( $editor_styles );
}

add_action ( 'wp_enqueue_scripts', 'chad_rtl_add_data' );
/**
 * Replace the default theme stylesheet with a RTL version when a RTL
 * language is being used.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function chad_rtl_add_data ()
{
	wp_style_add_data ( 'style', 'rtl', 'replace' );
	wp_style_add_data ( 'style', 'suffix', hybrid_get_min_suffix () );
}

add_action ( 'wp_enqueue_scripts', 'chad_enqueue_styles', 4 );
/**
 * Register our core parent theme styles.
 *
 * Normally we would enqueue all styles here, but because we've defined our base
 * styles in the theme setup function as Hybrid Core Styles, we only need to
 * register them. Hybrid Core will ensure they're loaded in the correct order.
 * Any non-global styles can still be enqueued manually in the usual way within
 * this function.
 *
 * @since  1.0.0
 * @access public
 * @see    http://themehybrid.com/docs/hybrid-core-styles
 * @return void
 */
function chad_enqueue_styles ()
{
	wp_register_style (
		'google-fonts',
		'//fonts.googleapis.com/css?family=Raleway:400,600|Lato:400,400italic,700',
		array (),
		null
	);
	wp_enqueue_style( 'icons_fallback', get_template_directory_uri() . '/images/icons.fallback.css', false, null );
	wp_enqueue_style( 'icons_png', get_template_directory_uri() . '/images/icons.data.png.css', false, null );
	wp_enqueue_style( 'icons_svg', get_template_directory_uri() . '/images/icons.data.svg.css', false, null );
}

add_action ( 'wp_enqueue_scripts', 'chad_enqueue_scripts' );
/**
 * Enqueue theme scripts.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function chad_enqueue_scripts ()
{
	$js_dir = trailingslashit ( get_template_directory_uri () ) . 'js/';
	$img_dir = trailingslashit ( get_template_directory_uri () ) . 'images/';
	$inc_dir = trailingslashit ( get_template_directory_uri () ) . 'includes/';
	$suffix = hybrid_get_min_suffix ();

	wp_enqueue_script (
		'enquire',
		'//cdnjs.cloudflare.com/ajax/libs/enquire.js/2.1.2/enquire.min.js',
		array ( 'jquery' ),
		null,
		true
	);
	wp_enqueue_script (
		'chad',
		$js_dir . "theme.js",
		array ( 'jquery' ),
		null,
		true
	);
	wp_enqueue_script (
		'grunticon',
		$img_dir . "grunticon.loader.js",
		array(),
		null,
		false
	);
	wp_enqueue_script (
		'grunticon-call',
		$inc_dir . "grunticon-head.js",
		array(),
		null,
		false
	);
	$site_parameters = array(
		'site_url' => get_site_url(),
		'theme_directory' => get_template_directory_uri()
	);
	wp_localize_script(
		'chad',
		'the_base_theme_directory',
		$site_parameters
	);
}
