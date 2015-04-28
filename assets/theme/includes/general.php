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

/**
 * first things first, lets get a global device check going
 */

require_once get_template_directory() . '/includes/Mobile_Detect.php';
$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'desktop');


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
	add_image_size( 'page-featured-image', 2000, 1700, true );
	add_image_size( 'blog-featured-image-sm', 600, 350, true );
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
 * change read more link text
 */

add_filter( 'the_content_more_link', 'chad_modify_read_more_link' );
function chad_modify_read_more_link() {
	return '<a class="readmore button" href="' . get_permalink() . '">Read more</a>';
}

/**
 * custom excerpt length. usage example: echo excerpt(25);
 **/

function excerpt( $limit ) {
	$excerpt = explode( ' ', get_the_excerpt(), $limit );
	if ( count( $excerpt ) >= $limit ) {
		array_pop( $excerpt );
		$excerpt = implode( " ", $excerpt ) . '... <a class="read-more" href="' . get_permalink() . '">Read more &raquo;</a>';
	} else {
		$excerpt = implode( " ", $excerpt );
	}
	$excerpt = preg_replace( '`[[^]]*]`', '', $excerpt );
	return $excerpt;
}

function hybridexcerpt( $limit ) {
	$hybridexcerpt = explode( ' ', get_the_content(), $limit );
	if ( count( $hybridexcerpt ) >= $limit ) {
		array_pop( $hybridexcerpt );
		$hybridexcerpt = implode( " ", $hybridexcerpt ) . '... <a class="read-more" href="' . get_permalink() . '">Read more &raquo;</a>';
	} else {
		$hybridexcerpt = implode( " ",$hybridexcerpt );
	}
	$hybridexcerpt = preg_replace( '/[+]/', '', $hybridexcerpt );
	$hybridexcerpt = apply_filters( 'the_content', $hybridexcerpt );
	$hybridexcerpt = strip_tags( $hybridexcerpt, '<p><b><a><br /><li><ol><ul>' );
	return $hybridexcerpt;
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
	global $deviceType;
	$section_id = $section_key[ 'the_section_page' ];
	$section_data = get_post( $section_id );
	$section_layout = $section_key[ 'the_section_layout' ];
	$section_media = $section_key[ 'the_section_media' ];
	$section_for_blog_posts = get_option( 'page_for_posts' );
	$page_icon = get_post_meta( $section_id, 'page_icon', true );
	?>
	<section id='<?php esc_html_e( $section_data->post_name, 'chad' ); ?>' class='<?php echo esc_html( $section_key[ 'the_section_bg_color' ] ) . ' ' . esc_html( $section_layout ); ?> section' <?php if ( $deviceType == 'desktop' ) { echo ' data-type="background" data-speed="10" '; } ?>>
		<div class="wrap">
			<div class="section-main">
				<h2 class="page-title"><?php if ( $page_icon != '' ) { ?><div class="icon-<?php esc_html_e( $page_icon, 'chad' ); ?> icon icon-md icon-left"></div><?php } esc_html_e( $section_key[ 'the_section_title' ], 'chad' ); ?></h2>
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
		<?php if( $section_id == $section_for_blog_posts ) { chad_loop_blog_posts( '6' ); } ?>
	</section>
<?php
}

/**
 * function (include) to cycle through post excerpts on home page (if is blog page)
 * (this is being included / called in the function above)
 * @param $num_of_posts
 * @return mixed
 */

function chad_loop_blog_posts( $num_of_posts ) { ?>
	<div class="homepage-blog-post-container wrap" id="blog-grid">
		<?php
		$blog_query_args = array(
			'posts_per_page'	=> $num_of_posts,
			'post_type'			=> 'post',
		);
		$blog_query = new WP_Query( $blog_query_args );

		//loop-de-loop
		while ( $blog_query -> have_posts() ) :
			$blog_query -> the_post(); ?>
			<div class="post-container light-orange box box1">
				<h6 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h6>
				<?php if( has_post_thumbnail( get_the_ID() ) ) { ?>
					<div class="post-featured-image-thumbnail">
						<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'blog-featured-image-sm' ); ?></a>
					</div>
				<?php }; ?>
				<p><?php echo wp_kses_post( hybridexcerpt( 15 ), 'chad' ); ?></p>
			</div>
		<?php
		endwhile;
		wp_reset_postdata();
		?>
	</div>
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

/**
 * displays featured image on page
 */

add_action( 'tha_content_before', 'chad_featured_image_page_header' );
function chad_featured_image_page_header() {
	if( ! is_front_page() && is_singular() ) {
		if( has_post_thumbnail( get_the_ID(), 'full' ) ) {
			//had a featured image
			$imageid = get_post_thumbnail_id( get_the_ID() );
			$imgurl = wp_get_attachment_image_src( $imageid, 'page-featured-image', false );

			echo '<div id="page-featured-image" class="parallax-window" data-parallax="scroll" data-position-y="100px" data-speed="0.2" data-image-src="' . esc_url( $imgurl[0], 'chad' ) . '"> </div>';
		} else {
			//does not have a featured image
			echo '<div id="page-featured-image" class="no-image orange"> </div>';
		}
	}//end if NOT front page
}

/**
 * adding svg decorations to the homepage, on a desktop (we'll worry about mobile later, if at all)
 */

add_action( 'tha_content_after', 'chad_add_svg_decoration_to_home' );
function chad_add_svg_decoration_to_home() {
	global $deviceType;
	if( is_front_page() &&  $deviceType == 'desktop') { ?>


		<script>
			var templateDir = "<?php bloginfo('template_directory') ?>";
			jQuery(document).ready(function($) {
				var $about = jQuery('#about-chad'),
					aboutPosition = $about.position(),
					$aboutdecoration = $('<div id="svg-deco-about-section-arrow" class="decoration"></div>').insertAfter($about);
					$aboutdecoration = $('#svg-deco-about-section-arrow' ).load( templateDir + '/includes/svg-decorations/dotted-arrow_flip-over-long.svg.php' );

				$aboutdecoration.css({
					position : 'absolute',
					top : aboutPosition.top + 100,
					left: '30%'
				});
				var $speaking = jQuery('#speaking'),
					speakingPosition = $speaking.position(),
					$speakingdecoration = $('<div id="svg-deco-speaking-section-arrow" class="decoration"></div>').insertAfter($speaking);
				$speakingdecoration = $('#svg-deco-speaking-section-arrow' ).load( templateDir + '/includes/svg-decorations/dotted-arrow_curved-medium.svg.php' );

				$speakingdecoration.css({
					position : 'absolute',
					top : speakingPosition.top + 310,
					right: '10%'
				});
				var $blog = jQuery('#blog'),
					blogPosition = $blog.position(),
					$blogdecoration = $('<div id="svg-deco-blog-section-arrow" class="decoration"></div>').insertAfter($blog);
				$blogdecoration = $('#svg-deco-blog-section-arrow' ).load( templateDir + '/includes/svg-decorations/dotted-arrow_small-circle.svg.php' );

				$blogdecoration.css({
					position : 'absolute',
					top : blogPosition.top + 110,
					right: '20%'
				});
				var $contact = jQuery('#contact'),
					contactPosition = $contact.position(),
					$contactdecoration = $('<div id="svg-deco-footer-section-arrow" class="decoration"></div>').insertAfter($contact);
				$speakingdecoration = $('#svg-deco-footer-section-arrow' ).load( templateDir + '/includes/svg-decorations/dotted-line_long-horizontal.svg.php' );

				$contactdecoration.css({
					position : 'absolute',
					top : contactPosition.top + 810,
					left: '5%'
				});
			});
		</script>
	<?php } //end if front page AND a desktop computer
}

/**
 * adding a shortcode to add an SVG icon
 */

function chad_svg_icon_shortcode( $atts )
{
	extract( shortcode_atts( array(
		'icon' => 'abacus',
		'size' => '100px',
		'align' => 'right',
	), $atts, 'chad' ) );

	return sprintf( '<div class="icon icon-%1$s" style="width: %2$s; height: %2$s; float: %3$s; margin:6px;"></div>',
		esc_html( $icon ),
		esc_html( $size ),
		esc_html( $align )
	);
}

add_shortcode( 'icon', 'chad_svg_icon_shortcode' );


/**
 * add icon cheat sheet into page/post content
 */

add_filter( 'mce_external_plugins', 'icon_cheatsheet_add_button' );
function icon_cheatsheet_add_button( $plugins )
{
	$plugins[ 'icon_cheatsheet' ] = get_template_directory_uri() . '/includes/icon-cheatsheet.js';
	return $plugins;
}

add_filter( 'mce_buttons', 'icon_cheatsheet_register_button' );
function icon_cheatsheet_register_button( $buttons )
{
	array_push( $buttons, 'icon_cheatsheet' );
	return $buttons;
}

add_action( 'wp_ajax_icon_cheatsheet_insert_dialog', 'icon_cheatsheet_insert_dialog' );

function icon_cheatsheet_insert_dialog()
{

	die( include get_template_directory() . '/includes/view-icon-cheatsheet.php' );

}

