<?php
/**
 * The static front page template.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
require_once 'includes/Mobile_Detect.php';
$detect = new Mobile_Detect;
$deviceType = ($detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'phone') : 'desktop');
$scriptVersion = $detect->getScriptVersion();
?>
<?php get_header(); ?>

	<div <?php hybrid_attr( 'site-inner' ); ?>>
		<?php tha_content_before(); ?>
		<main <?php hybrid_attr( 'content' ); ?>>
			<?php tha_content_top(); ?>

			<?php if( have_posts() ) : ?>
				<?php while( have_posts() ) : the_post(); ?>

					<?php tha_entry_before(); ?>
					<?php $videodir = dirname (__FILE__) . '/video';
					//check to see if there is a "video" directory. and if so, this will be the template displayed here...
					if ( file_exists( $videodir ) ) { ?>
						<section id="home" class="<?php if ( $deviceType == 'desktop' ) { echo 'full-width video '; } else { echo 'video-placeholder'; } ?>">
							<div id="video-frame">
								<?php if ( $deviceType == 'desktop' ) { ?>
									<video autoplay loop muted poster="<?php echo get_template_directory_uri(); ?>/images/video-placeholder.jpg" id="video-bg">
										<source src="<?php echo get_template_directory_uri(); ?>/video/homepage-video-lg.webm" type="video/webm">
										<source src="<?php echo get_template_directory_uri(); ?>/video/homepage-video-lg.mp4" type="video/mp4">
									</video>
								<?php } //end video embed for only desktop ?>
								<div id="video-overlay" class="inverse-bg">
									<div <?php hybrid_attr( 'site-inner' ); ?>>
										<?php hybrid_get_content_template(); ?>
									</div><!-- #site-inner -->
								</div><!--/#video-overlay-->
							</div><!--/#video-frame-->
						</section>
					<?php } //if no video directory, then do this stuff...
					else { ?>
						<section id="home" class="section">
							<div class="wrap">
								<div <?php hybrid_attr( 'site-inner' ); ?>>
									<?php hybrid_get_content_template(); ?>
								</div><!-- #site-inner -->
							</div>
						</section>
					<?php } //end the check to see if there is video... or naw ?>
					<?php tha_entry_after(); ?>

					<?php
					$homepage_sections_array = chad_get_meta( 'homepage_onepage_content' );
					foreach ( $homepage_sections_array as $homepage_section ) :
						echo chad_loop_home_section( $homepage_section );
					endforeach;
					?>

				<?php endwhile; ?>

			<?php else : ?>
				<?php get_template_part( 'content/error' ); ?>
			<?php endif; ?>
			<?php tha_content_bottom(); ?>
		</main>
		<!-- #content -->

		<?php tha_content_after(); ?>
		<?php hybrid_get_sidebar( 'primary' ); ?>
	</div><!-- #site-inner -->

<?php
get_footer();
