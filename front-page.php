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
									<?php hybrid_get_content_template(); ?>
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

	<div class="back-to-top">
		<div class="elevator">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" height="100px" width="100px">
                        <path d="M70,47.5H30c-1.4,0-2.5,1.1-2.5,2.5v40c0,1.4,1.1,2.5,2.5,2.5h40c1.4,0,2.5-1.1,2.5-2.5V50C72.5,48.6,71.4,47.5,70,47.5z   M47.5,87.5h-5v-25h5V87.5z M57.5,87.5h-5v-25h5V87.5z M67.5,87.5h-5V60c0-1.4-1.1-2.5-2.5-2.5H40c-1.4,0-2.5,1.1-2.5,2.5v27.5h-5  v-35h35V87.5z"/>
				<path d="M50,42.5c1.4,0,2.5-1.1,2.5-2.5V16l5.7,5.7c0.5,0.5,1.1,0.7,1.8,0.7s1.3-0.2,1.8-0.7c1-1,1-2.6,0-3.5l-10-10  c-1-1-2.6-1-3.5,0l-10,10c-1,1-1,2.6,0,3.5c1,1,2.6,1,3.5,0l5.7-5.7v24C47.5,41.4,48.6,42.5,50,42.5z"/>
                    </svg>
			Back to Top
		</div>
	</div>
<?php
get_footer();
