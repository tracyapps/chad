<?php
/**
 * The Header for our theme.
 *
 * @package     ChadLawson
 * @subpackage  HybridCore
 * @copyright   Copyright (c) 2015, Flagship Software, LLC
 * @license     GPL-2.0+
 * @since       1.0.0
 */
?>
<!DOCTYPE html>
<?php tha_html_before(); ?>
<html <?php language_attributes( 'html' ); ?>>

<head>
	<?php tha_head_top(); ?>
	<?php wp_head(); ?>
	<?php tha_head_bottom(); ?>
</head>

<body <?php hybrid_attr( 'body' ); ?>>

<?php tha_body_top(); ?>

<div <?php hybrid_attr( 'site-container' ); ?>>

	<div class="skip-link">
		<a href="#content" class="button screen-reader-text">
			<?php _e( 'Skip to content (Press enter)', 'chad' ); ?>
		</a>
	</div>
	<!-- .skip-link -->

	<?php tha_header_before(); ?>

	<header <?php hybrid_attr( 'header' ); ?>>

		<div <?php hybrid_attr( 'wrap', 'header' ); ?>>

			<?php tha_header_top(); ?>

			<div <?php hybrid_attr( 'branding' ); ?>>
				<?php chad_svg_logo(); ?>
				<?php hybrid_site_title(); ?>
				<?php hybrid_site_description(); ?>
			</div>
			<!-- #branding -->
			<?php tha_header_bottom(); ?>
		</div>
		<?php hybrid_get_menu( 'primary' ); ?>
	</header>
	<!-- #header -->

	<?php tha_header_after(); ?>


