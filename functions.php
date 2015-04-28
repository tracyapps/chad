<?php
/**
 * Theme Setup Functions and Definitions.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */

// Include Hybrid Core.
require_once( trailingslashit( get_template_directory() ) . 'hybrid-core/hybrid.php' );
new Hybrid();

add_action( 'after_setup_theme', 'chad_setup', 10 );
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * @since   1.0.0
 * @return  void
 */
function chad_setup()
{
	// http://themehybrid.com/docs/theme-layouts
	add_theme_support(
		'theme-layouts',
		array(
			'1c' => __( '1 Column Wide', 'chad' ),
			'1c-narrow' => __( '1 Column Narrow', 'chad' ),
			'2c-l' => __( '2 Columns: Content / Sidebar', 'chad' ),
			'2c-r' => __( '2 Columns: Sidebar / Content', 'chad' )
		),
		array( 'default' => is_rtl() ? '1c' : '1c' )
	);

	// http://themehybrid.com/docs/hybrid_set_content_width
	hybrid_set_content_width( 1140 );

	// http://codex.wordpress.org/Automatic_Feed_Links
	add_theme_support( 'automatic-feed-links' );

	// http://themehybrid.com/docs/hybrid-core-styles
	add_theme_support( 'hybrid-core-styles', array( 'style', 'google-fonts', ) );

	// https://github.com/FlagshipWP/flagship-library/wiki/Flagship-Site-Logo
	add_theme_support( 'site-logo' );

	// https://developer.wordpress.org/themes/functionality/navigation-menus/
	register_nav_menus( array(
		'primary' => _x( 'Primary Menu', 'nav menu location', 'chad' ),
		'footer' => _x( 'Footer Menu', 'nav menu location', 'chad' ),
	) );

	// https://developer.wordpress.org/themes/functionality/post-formats/
	add_theme_support( 'post-formats', array(
		'aside',
		'gallery',
		'link',
		'image',
		'quote',
		'status',
		'video',
		'audio',
		'chat',
	) );

	// https://github.com/justintadlock/breadcrumb-trail
	add_theme_support( 'breadcrumb-trail' );

	// https://github.com/justintadlock/get-the-image
	add_theme_support( 'get-the-image' );

	// http://themehybrid.com/docs/template-hierarchy
	add_theme_support( 'hybrid-core-template-hierarchy' );

	// https://github.com/FlagshipWP/flagship-library/wiki/Flagship-Author-Box
	add_theme_support( 'flagship-author-box' );

	// https://github.com/FlagshipWP/flagship-library/wiki/Flagship-Footer-Widgets
	add_theme_support( 'flagship-footer-widgets', 3 );
}

add_action( 'after_setup_theme', 'chad_includes', 10 );
/**
 * Load all required theme files.
 *
 * @since   1.0.0
 * @return  void
 */
function chad_includes()
{
	// Set the includes directories.
	$includes_dir = trailingslashit( get_template_directory() ) . 'includes/';

	// Load the main file in the Flagship library directory.
	require_once $includes_dir . 'vendor/flagship-library/flagship-library.php';

	// Load all PHP files in the vendor directory.
	require_once $includes_dir . 'vendor/tha-theme-hooks.php';

	// Load all PHP files in the includes directory.
	require_once $includes_dir . 'compatibility.php';
	require_once $includes_dir . 'fields.php';
	require_once $includes_dir . 'general.php';
	require_once $includes_dir . 'scripts.php';
	require_once $includes_dir . 'widgetize.php';
}

// Add a hook for child themes to execute code.
do_action( 'flagship_after_setup_parent' );
