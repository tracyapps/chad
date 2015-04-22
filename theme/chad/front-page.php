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

					<section id="home" class="<?php if ( $deviceType == 'desktop' ) { echo 'full-height video '; } ?>section">
						<div id="video-frame">
							<div <?php hybrid_attr( 'site-inner' ); ?>>
								<?php hybrid_get_content_template(); ?>
							</div><!-- #site-inner -->
						</div><!--/#video-frame-->
					</section>

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
