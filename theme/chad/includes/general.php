<?php
/**
 * General Theme-Specific Functions.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */

add_action ( 'init', 'chad_register_image_sizes', 5 );
/**
 * Register custom image sizes for the theme.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function chad_register_image_sizes ()
{
	// Set the 'post-thumbnail' size.
	set_post_thumbnail_size ( 175, 130, true );

	// Add the 'chad-full' image size.
	add_image_size ( 'chad-full', 1025, 500, true );
}

add_filter ( 'excerpt_length', 'chad_excerpt_length' );
/**
 * Add a custom excerpt length.
 *
 * @since  1.0.0
 * @access public
 * @param  integer $length
 * @return integer
 */
function chad_excerpt_length ( $length )
{
	return 60;
}

/**
 * get meta fields
 *
 * @param array $meta_key
 * @return array
 */
function chad_get_meta( $meta_key ) {
	return get_post_meta( get_the_ID(), $meta_key, true );
}

/**
 * function to loop through homepage section content.
 * @param $section_key
 * @return mixed
 */

function chad_loop_home_section( $section_key ) {
	require_once get_template_directory() . '/includes/Mobile_Detect.php';
	$detect = new Mobile_Detect;
	$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'desktop');

	$section_id = $section_key[ 'the_section_page' ];
	$section_data = get_post( $section_id );
	$section_layout = $section_key[ 'the_section_layout' ];
	$section_media = $section_key[ 'the_section_media' ];
	?>
	<section id='<?php esc_html_e( $section_data->post_name, 'chad' ); ?>' class='<?php echo esc_html( $section_key[ 'the_section_bg_color' ] ) . ' ' . esc_html( $section_layout ); ?> section' <?php if ( $deviceType == 'desktop' ) { echo ' data-type="background" data-speed="10" '; } ?>>
		<div class="wrap">
			<div class="section-main">
				<h2 class="page-title"><?php esc_html_e( $section_key[ 'the_section_title' ], 'chad' ); ?></h2>
				<p><?php echo apply_filters('the_content', $section_key[ 'the_section_content' ] ); ?></p>
				<?php
				if ( $section_key[ 'the_section_button_label' ] != '' ) {
					echo '<p><a href="' . esc_url( post_permalink( $section_id ) ) . '" class="button button-primary">' . esc_html( $section_key[ 'the_section_button_label' ] ) . '</a></p>';
				} ?>
			</div><!--/.section-main-->
			<?php if ( $section_layout != '1col' && $section_media != '' ) : ?>
				<aside class="section-aside">
					<?php echo '<a href="' . esc_url( post_permalink( $section_id ) ) . '">' . wp_get_attachment_image( $section_media, 'large' ) . '</a>'; ?>
					<?php
					$media_post = get_post( $section_media );
					$media_caption = $media_post->post_excerpt;
					if ( $media_caption != '' ) {
						echo '<div class="caption">' . esc_html( $media_caption ) . '</div>';
					}; ?>
				</aside>
			<?php endif; ?>
		</div>
	</section>
<?php
}

add_action ( 'tha_entry_top', 'chad_do_sticky_banner' );
/**
 * Add markup for a sticky ribbon on sticky posts in archive views.
 *
 * @since   1.0.0
 * @return  void
 */
function chad_do_sticky_banner() {
	if ( is_singular () || !is_sticky () ) {
		return;
	}
	?>
	<div class="corner-ribbon sticky">
		<p class="ribbon-content"><?php _e ( 'Sticky', 'chad' ); ?></p>
	</div>
<?php
}


/**
 * Displaying the SVG logo... and animatin' it.
 */

function chad_svg_logo() {
	echo get_template_part( 'includes/CL-logo-forweb-compressed.svg' );
 }