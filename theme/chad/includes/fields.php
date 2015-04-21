<?php
/**
 * CPT and custom meta fields.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
$dir = dirname( __FILE__ ) . '/';

// --------------------------------- CPT

// Supporting code
require_once $dir . 'Taxonomy_Core.php';
require_once $dir . 'CPT_Core.php';

/**
 * register work CPT
 */

class Work_CPT extends CPT_Core {
	public function __construct() {
		// Register the cpt
		parent::__construct(
			array( __( 'Work', 'chad' ), __( 'Example work', 'chad' ), 'work' ),
			array(
				'supports' => array( 'title', 'editor', 'thumbnail' ),
				'menu_icon' => 'dashicons-media-interactive',
			)
		);
	}
}
new Work_CPT();


// --------------------------------- field manager


// Supporting code
require_once( $dir . 'class-fm-data-structures.php' );


/**
 * meta fields just for home page
 */

if ( class_exists( 'Fieldmanager_Field' ) ) :
	function chad_homepage_meta_fields() {
		// Only display these fields for the homepage
		$page_id = false;
		if ( ! empty( $_GET['post'] ) ) {
			$page_id = intval( $_GET['post'] );
		} elseif ( ! empty( $_POST['post_ID'] ) ) {
			$page_id = intval( $_POST['post_ID'] );
		}
		if ( $page_id ) {
			$front_page = intval( get_option( 'page_on_front' ) );
			if ( $front_page == $page_id ) {

				$datasource_page = new Fieldmanager_Datasource_Post( array(
					'query_args' => array( 'post_type' => 'page' ),
					'use_ajax' => false
				) );

				$fm = new Fieldmanager_Group( array(
						'name'			=> 'homepage_onepage_content',
						'limit'			=> 0,
						'add_more_label' => 'Add another page',
						'sortable'		=> true,
						'label'			=> 'Section',
						'label_macro'	=> array( 'Section: %s', 'the_section_title' ),
						'collapsible'	=> true,
						'children'		=> array(
							'the_section_title'	=> new Fieldmanager_Textfield( 'Section title' ),
							'the_section_page'	=> new Fieldmanager_Autocomplete( 'Section should link to this page (start typing to search existing pages)', array( 'datasource' => $datasource_page ) ),
							'the_section_bg_color' => new Fieldmanager_Radios( 'current_section_bg_color', array(
										'default_value'	=> 'white',
										'options'		=> array(
											'white', 'orange', 'dark-grey', 'green', 'light-blue', 'grey-blue', 'purple', 'off-white'
										),
									)
								),
							'the_section_content' 	=> new Fieldmanager_TextArea( 'Section excerpt content' ),
							'the_section_button_label' => new Fieldmanager_Textfield( 'What should the CTA button say?' ),
							'the_section_media' => new Fieldmanager_Media( 'Add an image for this section' ),
							'the_section_layout' => new Fieldmanager_Radios( false, array(
									'default_value' => '2col-main-aside',
									'options' 		=> array(
										'2col-main-aside' 	=> '2 Columns: content / aside (media)',
										'2col-aside-main' 	=> '2 Columns: aside (media) / content',
										'1col' 				=> '1 Column: just content (no media)',
									)
								)

								),
						),
					)
				);

				$fm->add_meta_box( 'Homepage Sections', 'page' );

			}
			else {


				$fm = new Fieldmanager_Textfield( false, array(
						'name'			=> 'page_tagline',
						'attributes'    => array( 'style' => 'width:100%' )
					)
				);

				$fm->add_meta_box( 'Page Tagline', 'page' );

			}
		}
	}
	add_action( 'fm_post_page', 'chad_homepage_meta_fields' );

endif;