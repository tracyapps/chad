<?php
/**
 * The primary template for all single pages.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
?>
<?php get_header(); ?>

	<div <?php hybrid_attr( 'site-inner' ); ?>>
		<?php tha_content_before(); ?> <!-- <--the featured image -->
		<div class="wrap page-wrap transparent-light">
			<main <?php hybrid_attr( 'content' ); ?>>
				<?php tha_content_top(); ?>
				<?php hybrid_get_menu( 'breadcrumbs' ); ?>

				<?php if( have_posts() ) : ?>
					<?php while( have_posts() ) : the_post(); ?>
						<?php tha_entry_before(); ?>
						<?php hybrid_get_content_template(); ?>
						<?php tha_entry_after(); ?>
						<?php comments_template( '', true ); ?>
					<?php endwhile; ?>

				<?php else : ?>
					<?php get_template_part( 'content/error' ); ?>
				<?php endif; ?>

				<?php tha_content_bottom(); ?>
			</main><!-- #content -->

			<?php tha_content_after(); ?>
			<?php hybrid_get_sidebar( 'primary' ); ?>
		</div><!--/.wrap-->
	</div><!-- #site-inner -->

<?php
get_footer();
