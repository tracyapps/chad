<?php
/**
 * Register and Display Widget Areas.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */

add_action ( 'widgets_init', 'chad_register_sidebars', 5 );
/**
 * Registers sidebars.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function chad_register_sidebars ()
{
	hybrid_register_sidebar (
		array (
			'id' => 'primary',
			'name' => _x ( 'Primary Sidebar', 'sidebar', 'chad' ),
			'description' => __ ( 'The main sidebar. It is displayed on either the left or right side of the page based on the chosen layout.', 'chad' ),
		)
	);
}
